import { createContext, useContext, useState, ReactNode } from "react";
import { eLocalStorage } from "../assets/enums";
import { useNavigate } from "react-router-dom";
import { TUserResponse } from "../types/auth";

interface AuthContextType {
  user: TUserResponse | null;
  profile: any;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<TUserResponse | null>(null);
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, _setLoading] = useState(false);

  async function signIn(
    email: string,
    password: string,
  ): Promise<{ error: Error | null }> {
    if (!email || !password) {
      return { error: new Error("Email and password are required.") };
    }
    //  const res = await AuthenticationService.login({ email, password });

    setUser({ id: "mock-user-id", email });
    setProfile({
      id: "mock-user-id",
      email,
      full_name: "Mock Agent",
      role: "agent",
    });

    return { error: null };
  }

  async function signOut(): Promise<void> {
    setUser(null);
    setProfile(null);
    localStorage.removeItem(eLocalStorage.AccessToken);
    localStorage.removeItem(eLocalStorage.RefreshToken);
    navigate("/");
  }

  async function refreshProfile(): Promise<void> {}

  return (
    <AuthContext.Provider
      value={{ user, profile, loading, signIn, signOut, refreshProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
