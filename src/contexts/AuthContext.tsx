import { createContext, useContext, useState, ReactNode } from "react";
import { eLocalStorage, ERoles } from "../assets/enums";
import { useNavigate } from "react-router-dom";
import { TUserResponse } from "../types/auth";

interface AuthContextType {
  user: TUserResponse | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();
  const [user, setUser] = useState<TUserResponse | null>(null);
  const [loading] = useState(false);

  async function signIn(
    email: string,
    password: string,
  ): Promise<{ error: Error | null }> {
    if (!email || !password) {
      return { error: new Error("Email and password are required.") };
    }
    //  const res = await AuthenticationService.login({ email, password });

    setUser({
      id: 1,
      email: "test",
      userName: "",
      firstName: "test",
      lastName: "",
      role: ERoles.Admin,
      country: "AL",
    });
    return { error: null };
  }

  async function signOut(): Promise<void> {
    setUser(null);
    localStorage.removeItem(eLocalStorage.AccessToken);
    localStorage.removeItem(eLocalStorage.RefreshToken);
    navigate("/");
  }

  async function refreshProfile(): Promise<void> {}

  return (
    <AuthContext.Provider
      value={{ user, loading, signIn, signOut, refreshProfile }}
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
