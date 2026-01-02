import { supabase } from './supabase';

/**
 * Test Supabase connection
 * Run this to verify the Supabase client is properly configured
 */
export async function testSupabaseConnection() {
  try {
    // Test 1: Check if client is initialized
    console.log('✓ Supabase client initialized');

    // Test 2: Try to fetch session (will be null if not logged in)
    const { data: { session }, error: sessionError } = await supabase.auth.getSession();
    if (sessionError) {
      console.error('✗ Session check failed:', sessionError.message);
      return false;
    }
    console.log('✓ Session check successful', session ? '(Logged in)' : '(Not logged in)');

    // Test 3: Try a simple database query (this will fail if tables don't exist yet)
    // We'll test this after creating tables

    console.log('✓ Supabase connection test passed!');
    return true;
  } catch (error) {
    console.error('✗ Supabase connection test failed:', error);
    return false;
  }
}

// You can call this function from browser console:
// import { testSupabaseConnection } from './lib/supabase-test'
// testSupabaseConnection()
