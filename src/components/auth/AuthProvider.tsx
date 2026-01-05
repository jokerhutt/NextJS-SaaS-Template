"use client";

import { createContext, useContext, useState } from "react";
import type { User } from "@/types/User";

type AuthContextValue = {
  user: User | null;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

const fakeUser: User = {
  id: "demo-id",
  email: "demo@example.com",
  name: "Demo User",
  firebaseUid: "demo-firebase-uid",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const login = () => {
    setUser(fakeUser);
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}