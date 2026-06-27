import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI } from '../services/api';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  token: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User>;
  register: (data: { name: string; email: string; password: string; phone?: string }) => Promise<User>;
  logout: () => void;
  isAdmin: boolean;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored token on mount
    const storedUser = localStorage.getItem('hydradrop_user');
    if (storedUser) {
      try {
        const parsed = JSON.parse(storedUser);
        setUser(parsed);
      } catch {
        localStorage.removeItem('hydradrop_user');
        localStorage.removeItem('hydradrop_token');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    const data = await authAPI.login(email, password);
    const userData: User = {
      _id: data._id,
      name: data.name,
      email: data.email,
      role: data.role as 'customer' | 'admin',
      token: data.token,
    };
    setUser(userData);
    localStorage.setItem('hydradrop_user', JSON.stringify(userData));
    localStorage.setItem('hydradrop_token', data.token);
    return userData;
  };

  const register = async (data: { name: string; email: string; password: string; phone?: string }): Promise<User> => {
    const response = await authAPI.register(data);
    const userData: User = {
      _id: response._id,
      name: response.name,
      email: response.email,
      role: response.role as 'customer' | 'admin',
      token: response.token,
    };
    setUser(userData);
    localStorage.setItem('hydradrop_user', JSON.stringify(userData));
    localStorage.setItem('hydradrop_token', response.token);
    return userData;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('hydradrop_user');
    localStorage.removeItem('hydradrop_token');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        isAdmin: user?.role === 'admin',
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
