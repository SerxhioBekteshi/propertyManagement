import { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  email: string;
}

interface Profile {
  id: string;
  email: string;
  full_name?: string;
  role?: string;
}

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(false);

  async function signIn(
    email: string,
    password: string,
  ): Promise<{ error: Error | null }> {
    if (!email || !password) {
      return { error: new Error("Email and password are required.") };
    }

    setUser({ id: "mock-user-id", email });
    setProfile({
      id: "mock-user-id",
      email,
      full_name: "Mock Agent",
      role: "agent",
    });

    // Navigation handled by the caller (LoginPage uses useNavigate directly)
    return { error: null };
  }

  async function signOut(): Promise<void> {
    setUser(null);
    setProfile(null);
    // Navigation handled by the caller
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
