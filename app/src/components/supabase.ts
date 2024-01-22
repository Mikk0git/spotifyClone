import { createClient } from "@supabase/supabase-js";
import { Database } from "../types_db";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_PUBLIC_API;
const supabase = createClient<Database>(supabaseUrl, supabaseKey);

export default supabase;
