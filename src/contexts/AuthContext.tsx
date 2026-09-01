import { createContext, useContext, useMemo, useState } from 'react';

import { getToken, removeToken, saveToken } from '../utils/token';

interface AuthContextType {
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null>(() => getToken());

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
      isAuthenticated: !!token,
      login,
      logout,
    }),
    [token]
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
