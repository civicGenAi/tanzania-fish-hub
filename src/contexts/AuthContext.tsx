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

      if (error) throw error;
      return data as UserProfile;
    } catch (error) {
      console.error('Error fetching profile:', error);
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

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!mounted) return;

      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        fetchProfile(session.user.id).then((profile) => {
          if (mounted) setProfile(profile);
        });
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (!mounted) return;

        console.log('Auth event:', event);

        // Only handle specific events to avoid infinite loops
        if (event === 'SIGNED_OUT') {
          setSession(null);
          setUser(null);
          setProfile(null);
          setLoading(false);
        } else if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          setSession(session);
          setUser(session?.user ?? null);

          if (session?.user) {
            const userProfile = await fetchProfile(session.user.id);
            if (mounted) {
              setProfile(userProfile);
            }
          }
          setLoading(false);
        }
      }
    );

    return () => {
      mounted = false;
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
