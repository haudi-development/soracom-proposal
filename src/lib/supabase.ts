import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'

// Only create a real client if we have valid environment variables
const isValidUrl = supabaseUrl !== 'your_supabase_url_here' && supabaseUrl !== 'https://placeholder.supabase.co'
const isValidKey = supabaseAnonKey !== 'your_supabase_anon_key_here' && supabaseAnonKey !== 'placeholder-key'

export const supabase = isValidUrl && isValidKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

export type Mock = {
  id: number
  client_name: string
  url: string
  auth_id?: string
  auth_password?: string
  description?: string
  display_order: number
  created_at: string
}