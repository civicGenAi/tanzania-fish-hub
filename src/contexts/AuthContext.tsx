import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';

// Define user types
export type UserType = 'customer' | 'seller' | 'distributor' | 'admin';
export type UserStatus = 'active' | 'inactive' | 'suspended';

// Profile interface
export interface UserProfile {
  id: string;
  email: string;
  full_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  user_type: UserType;
  status: UserStatus;
  created_at: string;
  updated_at: string;
}

// Auth context interface
interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, userData: SignUpData) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  createUserProfile: (userData: SignUpData) => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

// Sign up data interface
interface SignUpData {
  full_name: string;
  phone?: string;
  user_type: UserType;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile from database
  const fetchProfile = async (userId: string): Promise<UserProfile | null> => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        // If it's a "not found" error, that's expected for new users
        if (error.code === 'PGRST116') {
          console.log('Profile not found for user:', userId);
          return null;
        }
        // For other errors (permissions, network, etc.), throw to be handled by caller
        console.error('Error fetching profile:', error);
        throw error;
      }
      return data as UserProfile;
    } catch (error: any) {
      // Only return null for "not found" errors
      if (error?.code === 'PGRST116') {
        return null;
      }
      // For all other errors, log and return null to avoid breaking auth flow
      // but log it prominently so we can debug
      console.error('CRITICAL: Profile fetch failed:', error);
      // Try one more time after a short delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      try {
        const { data, error: retryError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();

        if (!retryError && data) {
          console.log('Profile fetched successfully on retry');
          return data as UserProfile;
        }
      } catch (retryErr) {
        console.error('Profile fetch retry also failed:', retryErr);
      }
      // If we get here, something is seriously wrong, but don't break auth
      // Return null and let the app handle it
      return null;
    }
  };

  // Create profile for new user
  const createProfile = async (userId: string, email: string, userData: SignUpData): Promise<void> => {
    try {
      // Create main profile
      const { error: profileError } = await supabase
        .from('profiles')
        .insert({
          id: userId,
          email: email,
          full_name: userData.full_name,
          phone: userData.phone || null,
          user_type: userData.user_type,
          status: 'active'
        });

      if (profileError) throw profileError;

      // Create role-specific profile
      switch (userData.user_type) {
        case 'customer':
          await supabase.from('customer_profiles').insert({
            user_id: userId,
            tier: 'bronze',
            loyalty_points: 0
          });
          break;

        case 'seller':
          await supabase.from('seller_profiles').insert({
            user_id: userId,
            business_name: userData.full_name, // Can be updated later
            verification_status: 'pending'
          });
          break;

        case 'distributor':
          await supabase.from('distributor_profiles').insert({
            user_id: userId,
            verification_status: 'pending',
            status: 'offline'
          });
          break;

        case 'admin':
          // Admin profiles created manually
          break;
      }
    } catch (error) {
      console.error('Error creating profile:', error);
      throw error;
    }
  };

  // Sign up function - Only creates auth user, profile created on first login
  const signUp = async (email: string, password: string, userData: SignUpData): Promise<void> => {
    try {
      setLoading(true);

      // Create auth user with metadata - DO NOT create profile yet
      // Profile will be created after email confirmation on first login
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.full_name,
            phone: userData.phone || null,
            user_type: userData.user_type
          }
        }
      });

      if (error) throw error;
      if (!data.user) throw new Error('User creation failed');

      // DO NOT create profile here - wait for email confirmation
      // User must confirm email before logging in

    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign in function - Does NOT create profile automatically
  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      if (!data.user) throw new Error('Login failed');

      // Fetch user profile (if it exists)
      const userProfile = await fetchProfile(data.user.id);

      // If profile exists, check if suspended
      if (userProfile) {
        if (userProfile.status === 'suspended') {
          await supabase.auth.signOut();
          throw new Error('Your account has been suspended. Please contact support.');
        }
        setProfile(userProfile);
      } else {
        // Profile doesn't exist - user will be redirected to setup page
        setProfile(null);
      }

    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign out function
  const signOut = async (): Promise<void> => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;

      setUser(null);
      setProfile(null);
      setSession(null);
    } catch (error) {
      console.error('Sign out error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Create user profile function - called from profile setup page
  const createUserProfile = async (userData: SignUpData): Promise<void> => {
    if (!user) throw new Error('No user logged in');

    try {
      setLoading(true);

      // Create profile
      await createProfile(user.id, user.email!, userData);

      // Fetch the created profile
      const userProfile = await fetchProfile(user.id);

      if (!userProfile) {
        throw new Error('Failed to create profile. Please try again.');
      }

      setProfile(userProfile);

    } catch (error) {
      console.error('Create profile error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Update profile function
  const updateProfile = async (updates: Partial<UserProfile>): Promise<void> => {
    if (!user) throw new Error('No user logged in');

    try {
      const { error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('id', user.id);

      if (error) throw error;

      // Refresh profile
      await refreshProfile();
    } catch (error) {
      console.error('Update profile error:', error);
      throw error;
    }
  };

  // Refresh profile function
  const refreshProfile = async (): Promise<void> => {
    if (!user) return;

    const userProfile = await fetchProfile(user.id);
    setProfile(userProfile);
  };

  // Initialize auth state
  useEffect(() => {
    let mounted = true;
    let loadingTimeout: NodeJS.Timeout;

    // Safety timeout - ensure loading never stays true forever (5 seconds max)
    loadingTimeout = setTimeout(() => {
      if (mounted) {
        console.warn('Auth loading timeout - forcing loading to false');
        setLoading(false);
      }
    }, 5000);

    // Get initial session
    const initializeAuth = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();

        if (!mounted) return;

        if (error) {
          console.error('Error getting session:', error);
          setLoading(false);
          clearTimeout(loadingTimeout);
          return;
        }

        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          const profile = await fetchProfile(session.user.id);
          if (mounted) {
            setProfile(profile);
          }
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
      } finally {
        if (mounted) {
          setLoading(false);
          clearTimeout(loadingTimeout);
        }
      }
    };

    initializeAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;

        console.log('Auth event:', event);

        try {
          // Handle all auth events
          if (event === 'SIGNED_OUT') {
            setSession(null);
            setUser(null);
            setProfile(null);
          } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
            setSession(session);
            setUser(session?.user ?? null);

            if (session?.user) {
              const userProfile = await fetchProfile(session.user.id);
              if (mounted) {
                setProfile(userProfile);
              }
            }
          } else if (event === 'USER_UPDATED') {
            setSession(session);
            setUser(session?.user ?? null);

            if (session?.user) {
              const userProfile = await fetchProfile(session.user.id);
              if (mounted) {
                setProfile(userProfile);
              }
            }
          } else {
            // Handle other events (INITIAL_SESSION, PASSWORD_RECOVERY, etc.)
            setSession(session);
            setUser(session?.user ?? null);

            // Fetch profile for any session with a user
            if (session?.user) {
              const userProfile = await fetchProfile(session.user.id);
              if (mounted) {
                setProfile(userProfile);
              }
            }
          }
        } catch (error) {
          console.error('Error handling auth state change:', error);
        }
      }
    );

    return () => {
      mounted = false;
      clearTimeout(loadingTimeout);
      subscription.unsubscribe();
    };
  }, []);

  const value = {
    user,
    profile,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    createUserProfile,
    updateProfile,
    refreshProfile
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Helper hooks for role checking
export const useIsAdmin = () => {
  const { profile } = useAuth();
  return profile?.user_type === 'admin';
};

export const useIsSeller = () => {
  const { profile } = useAuth();
  return profile?.user_type === 'seller';
};

export const useIsDistributor = () => {
  const { profile } = useAuth();
  return profile?.user_type === 'distributor';
};

export const useIsCustomer = () => {
  const { profile } = useAuth();
  return profile?.user_type === 'customer';
};
