import React, { createContext, useContext, useState, ReactNode } from "react";

type User = {
  id: string;
  username: string;
  email: string;
  // Add any other user properties you need
};

type UserContextType = {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
  setRefreshToken: (refreshToken: string | null) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [refreshToken, setRefreshToken] = useState<string | null>(null);

  const logout = () => {
    setUser(null);
    setToken(null);
    setRefreshToken(null);
    // Add any additional logout logic here (e.g., clearing localStorage)
  };

  return (
    <UserContext.Provider value={{ user, token, refreshToken, setUser, setToken, setRefreshToken, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
