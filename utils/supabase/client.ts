import { createBrowserClient } from "@supabase/ssr";
import { getSupabaseConfig } from "./env";

export const createClient = () => {
  const { supabaseUrl, supabaseKey } = getSupabaseConfig();

  return createBrowserClient(
    supabaseUrl,
    supabaseKey,
  );
};
