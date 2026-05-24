// =============================================
// supabaseClient.js - подключение TravelPlan к Supabase
// =============================================

const SUPABASE_URL = 'https://oqlvumcykfynzcrwehqx.supabase.co';
const SUPABASE_KEY = 'sb_publishable_GyVB2TmLIRxBYwqe3wZ7kw_vYugQR8M';

const supabaseClient = window.supabase?.createClient(
  SUPABASE_URL,
  SUPABASE_KEY,
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
      storage: window.localStorage,
      storageKey: 'travelplan_supabase_auth'
    }
  }
);

window.supabaseClient = supabaseClient;
