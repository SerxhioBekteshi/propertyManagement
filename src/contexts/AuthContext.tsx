/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { eLocalStorage } from "../assets/enums";
import { useNavigate } from "react-router-dom";
import { TUserResponse } from "../types/auth";
import { AuthenticationService } from "../lib/Authentication";

interface AuthContextType {
  user: TUserResponse | null;
  loading: boolean;
  signIn: (
    email: string,
    password: string,
    country: string | "",
  ) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const navigate = useNavigate();

  const [user, setUser] = useState<TUserResponse | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔐 LOGIN
  async function signIn(
    email: string,
    password: string,
    country: string | "",
  ): Promise<{ error: Error | null }> {
    if (!email || !password) {
      return { error: new Error("Email and password are required.") };
    }

    const res = await AuthenticationService.login({ email, password, country });
    if (!res.accessToken) {
      return { error: new Error("Login failed") };
    }

    localStorage.setItem(eLocalStorage.AccessToken, res.accessToken);
    localStorage.setItem(eLocalStorage.RefreshToken, res.refreshToken);

    // 👇 fetch real user after login
    await refreshProfile();

    return { error: null };
  }

  // 👤 GET CURRENT USER
  async function refreshProfile(): Promise<void> {
    try {
      const token = localStorage.getItem(eLocalStorage.AccessToken);
      if (!token) return;

      const profile = await AuthenticationService.getMe();
      setUser(profile);
    } catch (err) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }

  async function signOut(): Promise<void> {
    setUser(null);
    localStorage.removeItem(eLocalStorage.AccessToken);
    localStorage.removeItem(eLocalStorage.RefreshToken);
    navigate("/");
  }

  useEffect(() => {
    const token = localStorage.getItem(eLocalStorage.AccessToken);
    if (token) {
      refreshProfile();
    } else {
      setLoading(false);
    }
  }, []);

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
