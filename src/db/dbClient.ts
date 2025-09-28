import {createClient} from "@supabase/supabase-js";

export const dbClient = createClient(import.meta.env.VITE_BD_URL, import.meta.env.VITE_BD_PUBLISHABLE_KEY);