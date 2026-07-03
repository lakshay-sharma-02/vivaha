"use server"

import { generateRecommendations, getRecommendedMatches } from "./match-engine";

export async function fetchDiscoverProfiles(page: number = 1) {
  try {
    // 1. Generate new recommendations if needed (In a real large-scale prod this is a background job)
    // We call it here so new users immediately get matches.
    await generateRecommendations();

    // 2. Fetch the recommendations
    const matchesResult = await getRecommendedMatches(page, 20);

    if (!matchesResult.success) {
      return { success: false, error: matchesResult.error, profiles: [] };
    }

    // Map to the format the UI expects
    const mappedProfiles = (matchesResult.data || []).map((rec: any) => ({
      id: rec.profile.id,
      name: `${rec.profile.first_name} ${rec.profile.last_name || ''}`.trim(),
      age: rec.profile.age,
      location: rec.profile.city,
      profession: rec.profile.profession,
      education: "Not Specified",
      bio: "Discover more in full profile",
      compatibility: rec.score,
      verified: rec.profile.verification_status === 'verified',
      image: rec.profile.image,
      tags: [],
      family: "Not Specified",
      income: "Not Specified"
    }));

    return { success: true, profiles: mappedProfiles };

  } catch (err) {
    console.error("Discover Fetch Exception:", err);
    return { success: false, error: "An unexpected error occurred", profiles: [] };
  }
}
