import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';
import { User } from '../types';

// Hardcoded admin user for demonstration (keep for demo)
const ADMIN_USER: User = { 
  username: 'admin', 
  fullName: 'Admin User',
  email: 'admin@generichub.com',
  phone: '0000000000',
  age: 99,
  role: 'admin'
};
const ADMIN_PASSWORD = 'admin123';

interface AuthContextType {
  user: User | null;
  login: (usernameOrEmail: string, password: string, rememberMe: boolean) => boolean;
  register: (userData: Omit<User, 'role'>, password: string) => { success: boolean, message: string };
  logout: () => void;
  getUserByUsernameOrEmail: (identifier: string) => { user: User, password?: string } | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for a logged-in user in storage on initial load
    try {
      const storedUser = localStorage.getItem('user') || sessionStorage.getItem('user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (err) {
      console.error("Error parsing stored user", err);
    }
  }, []);

  const login = useCallback((usernameOrEmail: string, password: string, rememberMe: boolean): boolean => {
    // Admin login
    if ((usernameOrEmail === ADMIN_USER.username || usernameOrEmail === ADMIN_USER.email) && password === ADMIN_PASSWORD) {
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem('user', JSON.stringify(ADMIN_USER));
      setUser(ADMIN_USER);
      return true;
    }

    // Customer login
    const storedUsers: Record<string, { user: User; password: string }> =
      JSON.parse(localStorage.getItem('users') || '{}');
    
    const userAccount = Object.values(storedUsers).find(
      (u) => u.user.username === usernameOrEmail || u.user.email === usernameOrEmail
    );

    if (userAccount && userAccount.password === password) {
      const storage = rememberMe ? localStorage : sessionStorage;
      storage.setItem('user', JSON.stringify(userAccount.user));
      setUser(userAccount.user);
      return true;
    }

    return false;
  }, []);

  const register = useCallback((userData: Omit<User, 'role'>, password: string): { success: boolean, message: string } => {
    if (userData.username === ADMIN_USER.username || userData.email === ADMIN_USER.email) {
      return { success: false, message: 'This username or email is reserved.' };
    }

    const storedUsers: Record<string, { user: User; password: string }> =
      JSON.parse(localStorage.getItem('users') || '{}');

    if (storedUsers[userData.username]) {
      return { success: false, message: 'Username already exists.' };
    }

    const emailExists = Object.values(storedUsers).some((u) => u.user.email === userData.email);
    if (emailExists) {
        return { success: false, message: 'Email address is already in use.' };
    }

    const newUser: User = { ...userData, role: 'customer' };
    storedUsers[userData.username] = { user: newUser, password };
    localStorage.setItem('users', JSON.stringify(storedUsers));
    
    return { success: true, message: 'Account created successfully!' };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem('user');
    sessionStorage.removeItem('user');
    sessionStorage.removeItem('welcome_shown');
    setUser(null);
  }, []);
  
  const getUserByUsernameOrEmail = useCallback((identifier: string) => {
    if (identifier === ADMIN_USER.username || identifier === ADMIN_USER.email) {
      return { user: ADMIN_USER, password: ADMIN_PASSWORD };
    }

    const storedUsers: Record<string, { user: User; password: string }> =
      JSON.parse(localStorage.getItem('users') || '{}');

    const userAccount = Object.values(storedUsers).find(
      (u) => u.user.username === identifier || u.user.email === identifier
    );

    return userAccount || null;
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout, getUserByUsernameOrEmail }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
