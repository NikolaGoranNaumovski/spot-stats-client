import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useGet, useMutation } from "@nnaumovski/react-api-client";
import { getSpotifyAuthUrl } from "../utils/common";

interface User {
  sub: string;
  email: string;
  spotifyId: string;
  expiresIn: string;
  iat: number;
}

interface AuthContextType {
  user: User | null;
  handleLogin?: () => Promise<void>;
  handleLogout?: () => Promise<void>;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const { data, loading } = useGet<{ user: User }>("/auth/spotify/me");
  const { trigger } = useMutation<void, void>("post");

  const handleLogin = async () => {
    const spotifyLoginUrl = getSpotifyAuthUrl();
    
    window.location.href = spotifyLoginUrl;
  }

  const handleLogout = async () => {
    await trigger("/auth/spotify/logout");
    setUser(null);
    navigate("/login");
  }

  useEffect(() => {
    if (loading) return;
    
    if (data?.user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(data.user);
    } else {
      setUser(null);
      if (location.pathname.startsWith("/stats")) {
        navigate("/login");
      }
    }
  }, [data?.user, loading, location.pathname, navigate]);
  
  return (
    <AuthContext.Provider value={{ user, setUser, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
