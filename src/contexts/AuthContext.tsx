import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserRole = 'customer' | 'seller' | 'distributor' | 'admin';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string, role?: UserRole) => Promise<void>;
  logout: () => void;
  switchRole: (role: UserRole) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for each role
const demoUsers: Record<UserRole, User> = {
  customer: {
    id: 'c1',
    name: 'Amina Hassan',
    email: 'amina@example.com',
    phone: '+255 712 345 678',
    role: 'customer',
  },
  seller: {
    id: 's1',
    name: 'Juma Mwangi',
    email: 'juma@mwanzafresh.com',
    phone: '+255 755 123 456',
    role: 'seller',
  },
  distributor: {
    id: 'd1',
    name: 'Peter Kimaro',
    email: 'peter@delivery.com',
    phone: '+255 786 789 012',
    role: 'distributor',
  },
  admin: {
    id: 'a1',
    name: 'Sarah Admin',
    email: 'admin@fishhappy.co.tz',
    phone: '+255 700 000 001',
    role: 'admin',
  },
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string, role: UserRole = 'customer') => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    setUser(demoUsers[role]);
  };

  const logout = () => {
    setUser(null);
  };

  const switchRole = (role: UserRole) => {
    setUser(demoUsers[role]);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        logout,
        switchRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
