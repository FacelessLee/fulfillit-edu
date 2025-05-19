
import React, { createContext, useContext, useState, ReactNode } from 'react';

type UserRole = 'student' | 'teacher' | 'admin';

type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (email: string, password: string) => {
    // This is a mock implementation - in a real app, you would validate against a backend
    let mockUser: User | null = null;
    
    if (email.includes('student')) {
      mockUser = {
        id: '1',
        name: 'Student User',
        email,
        role: 'student'
      };
    } else if (email.includes('teacher')) {
      mockUser = {
        id: '2',
        name: 'Teacher User',
        email,
        role: 'teacher'
      };
    } else if (email.includes('admin')) {
      mockUser = {
        id: '3',
        name: 'Admin User',
        email,
        role: 'admin'
      };
    }
    
    setUser(mockUser);
    return Promise.resolve();
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    isAuthenticated: !!user,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
