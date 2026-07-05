"use server";

import { createClient } from "@/utils/supabase/server";

export async function getNavbarData() {
  const supabase = await createClient();
  
  try {
    // 1. Get Marital Status Counts (from the view if it exists, or via RPC/aggregate)
    const { data: viewData, error: viewError } = await supabase
      .from('navbar_stats')
      .select('*')
      .single();
      
    // 2. Get Caste breakdown (Top 5 castes with most profiles)
    // For now we do a simple query. If the table is large, a grouped RPC is better.
    const { data: casteData } = await supabase
      .from('castes')
      .select('id, name, profiles(count)');
      
    // 3. Get State breakdown (Top 5 states)
    const { data: stateData } = await supabase
      .from('states')
      .select('id, name, profiles(count)');

    // Format the data
    // Handle the case where the migration hasn't been applied yet or table is empty
    const maritalStats = viewData || { unmarried_count: 0, divorced_count: 0, total_profiles: 0 };
    
    // Sort and map caste data
    const castes = (casteData || [])
      .map(c => ({
        id: c.id,
        name: c.name,
        count: c.profiles?.[0]?.count || 0
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
      
    // Sort and map state data
    const states = (stateData || [])
      .map(s => ({
        id: s.id,
        name: s.name,
        count: s.profiles?.[0]?.count || 0
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    return {
      success: true,
      data: {
        maritalStats,
        castes,
        states
      }
    };
  } catch (error) {
    console.error("Error fetching navbar data:", error);
    return {
      success: false,
      data: {
        maritalStats: { unmarried_count: 0, divorced_count: 0, total_profiles: 0 },
        castes: [],
        states: []
      }
    };
  }
}
