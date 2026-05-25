// =============================================
// supabaseClient.js - подключение TravelPlan к Supabase
// =============================================

// Зачем этот файл:
// Создание клиента Supabase. Здесь только подключение, без бизнес-логики.
// Комментарии специально оставлены простыми: чтобы через неделю было понятно,
// что здесь происходит, а не почему JS снова решил устроить квест.

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
