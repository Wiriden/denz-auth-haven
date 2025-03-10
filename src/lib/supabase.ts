import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ihzaajimmaytorupdyvc.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImloemFhamltbWF5dG9ydXBkeXZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDEzOTQzODIsImV4cCI6MjA1Njk3MDM4Mn0.yLiSEqoYMqtpLn4HHkxkHhmXzPmA3AGyungZKXgKfTI'

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 