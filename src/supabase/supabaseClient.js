import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://aiphtlwilmmposlmopnb.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFpcGh0bHdpbG1tcG9zbG1vcG5iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4OTY5NDksImV4cCI6MjA5NjQ3Mjk0OX0.GxDslQ09PxTVS2b6XXkR2aA1E-UFwVlQ-_tfnEqRRcw'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
