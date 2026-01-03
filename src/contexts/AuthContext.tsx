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

  // Sign up function
  const signUp = async (email: string, password: string, userData: SignUpData): Promise<void> => {
    try {
      setLoading(true);

      // Create auth user
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: userData.full_name,
            user_type: userData.user_type
          }
        }
      });

      if (error) throw error;
      if (!data.user) throw new Error('User creation failed');

      // Create profile
      await createProfile(data.user.id, email, userData);

      // Fetch the created profile
      const userProfile = await fetchProfile(data.user.id);
      setProfile(userProfile);

    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Sign in function
  const signIn = async (email: string, password: string): Promise<void> => {
    try {
      setLoading(true);

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      if (!data.user) throw new Error('Login failed');

      // Fetch user profile
      const userProfile = await fetchProfile(data.user.id);

      if (!userProfile) {
        throw new Error('Profile not found. Please contact support.');
      }

      if (userProfile.status === 'suspended') {
        await supabase.auth.signOut();
        throw new Error('Your account has been suspended. Please contact support.');
      }

      setProfile(userProfile);

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
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);

      if (session?.user) {
        fetchProfile(session.user.id).then(setProfile);
      }
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth event:', event);
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          const userProfile = await fetchProfile(session.user.id);
          setProfile(userProfile);
        } else {
          setProfile(null);
        }

        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const value = {
    user,
    profile,
    session,
    loading,
    signUp,
    signIn,
    signOut,
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
