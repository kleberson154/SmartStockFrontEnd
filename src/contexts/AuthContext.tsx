import { createContext, useContext, useMemo, useState } from 'react';
import { jwtDecode } from 'jwt-decode';

import type { JwtPayload, UserRole } from '../types/jwt';
import { getToken, removeToken, saveToken } from '../utils/token';

interface AuthUser {
  email: string;
  role: UserRole;
}

interface AuthContextType {
  token: string | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function getUserFromToken(token: string | null): AuthUser | null {
  if (!token) {
    return null;
  }

  try {
    const decoded = jwtDecode<JwtPayload>(token);

    return {
      email: decoded.sub,
      role: decoded.role,
    };
  } catch {
    return null;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => getToken());

  const user = useMemo(() => getUserFromToken(token), [token]);

  function login(newToken: string) {
    saveToken(newToken);
    setToken(newToken);
  }

  function logout() {
    removeToken();
    setToken(null);
  }

  const value = useMemo(
    () => ({
      token,
      user,
      isAuthenticated: !!token && !!user,
      isAdmin: user?.role === 'ADMIN',
      login,
      logout,
    }),
    [token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
