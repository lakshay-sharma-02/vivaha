"use server";

import { createClient } from "@/shared/lib/supabase/server";

export type MatchRecommendation = {
  id: string; // recommendation id
  profile: {
    id: string;
    first_name: string;
    last_name: string;
    age: number;
    profession: string;
    city: string;
    image: string;
    verification_status: string;
  };
  score: number;
  score_breakdown: Record<string, number>;
  is_super_match: boolean;
};

// Configurable weights for the recommendation engine
const WEIGHTS = {
  AGE_COMPATIBILITY: 25,
  LOCATION_MATCH: 15,
  RELIGION_COMMUNITY: 20,
  PROFESSION_INCOME: 15,
  PROFILE_QUALITY: 10,
  RECENT_ACTIVITY: 5,
  VERIFICATION: 10
};

export async function generateRecommendations(targetUserId?: string) {
  try {
    const supabase = await createClient();
    
    // If no target provided, generate for the currently logged in user
    let userId = targetUserId;
    if (!userId) {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error || !user) throw new Error("Not authenticated");
      userId = user.id;
    }

    // 1. Fetch user's preferences & own profile
    const { data: userProfile } = await supabase
      .from('profiles')
      .select('gender, date_of_birth, religion_id, city_id, country_id')
      .eq('id', userId)
      .single();

    const { data: userPrefs } = await supabase
      .from('preferences')
      .select('*')
      .eq('profile_id', userId)
      .single();

    if (!userProfile) return { success: false, error: "Profile not found" };

    // Determine opposite gender for matching (assuming hetero for standard matchmaking, can be extended)
    const targetGender = userProfile.gender === 'male' ? 'female' : 'male';

    // 2. Fetch potential candidates (Active, Opposite Gender, Not blocked, Not already in recommendations, Not already interacted)
    // For production, this should be a robust SQL query. For now we fetch a chunk and filter.
    const { data: candidates } = await supabase
      .from('profiles')
      .select(`
        id, 
        first_name, 
        last_name, 
        gender, 
        date_of_birth, 
        religion_id, 
        profession_id,
        city_id,
        country_id,
        verification_status,
        is_active,
        profile_media(bucket_path, is_primary)
      `)
      .eq('gender', targetGender)
      .eq('is_active', true)
      .limit(200);

    if (!candidates || candidates.length === 0) return { success: true, count: 0 };

    // 3. Fetch existing interactions (sent/received interests, blocks, existing recommendations) to filter out
    const { data: existingIntros } = await supabase
      .from('introductions')
      .select('sender_id, receiver_id')
      .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`);
      
    const interactedIds = new Set(
      existingIntros?.map(i => i.sender_id === userId ? i.receiver_id : i.sender_id) || []
    );

    // Filter candidates
    const validCandidates = candidates.filter(c => !interactedIds.has(c.id) && c.id !== userId);

    // 4. Score each candidate
    const recommendationsToInsert = [];
    
    for (const candidate of validCandidates) {
      const breakdown: Record<string, number> = {};
      let totalScore = 0;

      // -- Age Calculation --
      let candidateAge = 25;
      if (candidate.date_of_birth) {
        const bd = new Date(candidate.date_of_birth);
        candidateAge = new Date().getFullYear() - bd.getFullYear();
      }
      
      let ageScore = 0;
      if (userPrefs?.min_age && userPrefs?.max_age) {
        if (candidateAge >= userPrefs.min_age && candidateAge <= userPrefs.max_age) {
          ageScore = WEIGHTS.AGE_COMPATIBILITY;
        } else {
          // Partial points if close
          const diff = Math.min(
            Math.abs(candidateAge - userPrefs.min_age), 
            Math.abs(candidateAge - userPrefs.max_age)
          );
          if (diff <= 3) ageScore = WEIGHTS.AGE_COMPATIBILITY * 0.5;
        }
      } else {
        // Default age logic if no preferences set
        ageScore = WEIGHTS.AGE_COMPATIBILITY * 0.7; // Generous default
      }
      breakdown.age = ageScore;
      totalScore += ageScore;

      // -- Location Match --
      let locationScore = 0;
      if (userPrefs?.preferred_cities?.includes(candidate.city_id)) {
        locationScore = WEIGHTS.LOCATION_MATCH;
      } else if (candidate.country_id === userProfile.country_id) {
        locationScore = WEIGHTS.LOCATION_MATCH * 0.5;
      }
      breakdown.location = locationScore;
      totalScore += locationScore;

      // -- Religion --
      let religionScore = 0;
      if (userPrefs?.preferred_religions?.includes(candidate.religion_id)) {
        religionScore = WEIGHTS.RELIGION_COMMUNITY;
      } else if (candidate.religion_id === userProfile.religion_id) {
        religionScore = WEIGHTS.RELIGION_COMMUNITY; // Implicit preference for same religion
      }
      breakdown.religion = religionScore;
      totalScore += religionScore;

      // -- Profile Quality & Verification --
      let verificationScore = candidate.verification_status === 'verified' ? WEIGHTS.VERIFICATION : 0;
      breakdown.verification = verificationScore;
      totalScore += verificationScore;

      let qualityScore = candidate.profile_media && candidate.profile_media.length > 0 ? WEIGHTS.PROFILE_QUALITY : 0;
      breakdown.quality = qualityScore;
      totalScore += qualityScore;
      
      // Base profession score (can be expanded)
      breakdown.profession = WEIGHTS.PROFESSION_INCOME * 0.6;
      totalScore += breakdown.profession;

      // Normalize total score out of 100
      // Max possible is sum of all weights (100)
      
      // Only keep good matches (e.g. > 40%)
      if (totalScore >= 40) {
        recommendationsToInsert.push({
          user_id: userId,
          recommended_profile_id: candidate.id,
          score: Math.round(totalScore),
          score_breakdown: breakdown,
          is_super_match: totalScore >= 85
        });
      }
    }

    // 5. Store in DB
    if (recommendationsToInsert.length > 0) {
      // Upsert to handle updates to existing recommendations
      const { error: insertError } = await supabase
        .from('recommendations')
        .upsert(recommendationsToInsert, { onConflict: 'user_id, recommended_profile_id' });
        
      if (insertError) {
        console.error("Error inserting recommendations:", insertError);
        return { success: false, error: "Failed to save recommendations" };
      }
    }

    return { success: true, count: recommendationsToInsert.length };

  } catch (err) {
    console.error("generateRecommendations exception:", err);
    return { success: false, error: "An unexpected error occurred" };
  }
}

export async function getRecommendedMatches(page = 1, limit = 10) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) return { success: false, error: "Not authenticated" };

    const offset = (page - 1) * limit;

    // Fetch recommendations ordered by score
    const { data, error } = await supabase
      .from('recommendations')
      .select(`
        id,
        score,
        score_breakdown,
        is_super_match,
        recommended_profile_id,
        profile:profiles!recommendations_recommended_profile_id_fkey(
          id,
          first_name,
          last_name,
          date_of_birth,
          verification_status,
          city:cities(name),
          profession:professions(name),
          profile_media(bucket_path)
        )
      `)
      .eq('user_id', user.id)
      .order('score', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      console.error("Error fetching recommended matches:", error);
      return { success: false, error: "Failed to fetch matches" };
    }

    const formatted = (data || []).map((rec: any) => {
      const p = rec.profile;
      let age = 25;
      if (p.date_of_birth) {
        age = new Date().getFullYear() - new Date(p.date_of_birth).getFullYear();
      }
      
      const primaryImage = p.profile_media?.[0]?.bucket_path || "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=800&auto=format&fit=crop";

      return {
        id: rec.id,
        score: rec.score,
        is_super_match: rec.is_super_match,
        profile: {
          id: p.id,
          first_name: p.first_name,
          last_name: p.last_name || "",
          age,
          city: p.city?.name || "Unknown City",
          profession: p.profession?.name || "Professional",
          verification_status: p.verification_status,
          image: primaryImage
        }
      };
    });

    return { success: true, data: formatted };
  } catch (err) {
    console.error("getRecommendedMatches exception:", err);
    return { success: false, error: "An unexpected error occurred" };
  }
}
