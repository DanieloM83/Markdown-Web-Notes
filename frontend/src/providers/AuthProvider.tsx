import React, { createContext, useEffect, useState, ReactNode } from "react";
import { getCurrentUser, UserData } from "../services/auth";
import { Loading } from "../components/ui";

interface AuthContextType {
  user: UserData | undefined;
  setUser: (user: UserData | undefined) => void;
}

export const AuthContext = createContext<AuthContextType>({ user: undefined, setUser: () => {} });

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserData | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUser = async () => {
      let response = await getCurrentUser();
      if (response.success) setUser(response.data);
      else console.log(`Failed to fetch user: ${response.message}`);
      setIsLoading(false);
      // setUser({ username: "testUser", id: "abc" });
    };

    fetchUser();
  }, []);

  if (isLoading) {
    return <Loading loadingText="Fetching user data..." />;
  }

  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};
