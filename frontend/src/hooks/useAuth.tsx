import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

interface User {
  id: number;
  email: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const baseURL = import.meta.env?.VITE_API_BASE_URL || 'http://localhost:4000/api';

  useEffect(() => {
    // Check if user is already logged in
    const checkAuth = async () => {
      try {
        const response = await axios.post(`${baseURL}/auth/refresh`, {}, {
          withCredentials: true,
        });
        if (response.data.accessToken) {
          // Decode token to get user info (simplified)
          setUser({ id: 1, email: 'admin@example.com', role: 'admin' });
        }
      } catch (error) {
        console.log('Not authenticated');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [baseURL]);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${baseURL}/auth/login`, {
        email,
        password,
      }, {
        withCredentials: true,
      });

      if (response.data.user) {
        setUser(response.data.user);
        localStorage.setItem('accessToken', response.data.accessToken);
      }
    } catch (error: any) {
      throw new Error(error.response?.data?.error || 'Login failed');
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${baseURL}/auth/logout`, {}, {
        withCredentials: true,
      });
    } catch (error) {
      console.log('Logout error:', error);
    } finally {
      setUser(null);
      localStorage.removeItem('accessToken');
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
