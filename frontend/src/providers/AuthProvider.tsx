import React, { createContext, useEffect, useState, ReactNode } from "react";
import { getCurrentUser, UserData } from "../services/auth";

interface AuthContextType {
  user: UserData | undefined;
  setUser: (user: UserData | undefined) => void;
}

export const AuthContext = createContext<AuthContextType>();

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | undefined>(undefined);

  useEffect(() => {
    const fetchUser = async () => {
      let response = await getCurrentUser();
      if (response.success) setUser(response.data);
      else console.log(`Failed to fetch user: ${response.message}`);
    };

    fetchUser();
  }, []);

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};
