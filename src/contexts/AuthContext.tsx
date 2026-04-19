/* eslint-disable @typescript-eslint/no-explicit-any */
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
  const [loading, setLoading] = useState(true); // ✅ start true

  async function signIn(
    email: string,
    password: string,
    country: string | "",
  ): Promise<{ error: Error | null }> {
    if (!email || !password) {
      return { error: new Error("Email and password are required.") };
    }

    setLoading(true);

    const res = await AuthenticationService.login({
      email,
      password,
      country,
    });

    if (!res.accessToken) {
      setLoading(false);
      return { error: new Error("Login failed") };
    }

    localStorage.setItem(eLocalStorage.AccessToken, res.accessToken);
    localStorage.setItem(eLocalStorage.RefreshToken, res.refreshToken);

    await refreshProfile();

    setLoading(false);
    return { error: null };
  }

  async function refreshProfile(): Promise<void> {
    try {
      const token = localStorage.getItem(eLocalStorage.AccessToken);
      if (!token) {
        setUser(null);
        return;
      }

      const profile = await AuthenticationService.getMe();

      // ✅ IMPORTANT FIX: unwrap if API returns {data, result}
      const actualUser = (profile as any)?.data ?? profile;

      setUser(actualUser);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err: any) {
      setUser(null);
      localStorage.removeItem(eLocalStorage.AccessToken);
      localStorage.removeItem(eLocalStorage.RefreshToken);
    }
  }

  async function signOut(): Promise<void> {
    setUser(null);
    localStorage.removeItem(eLocalStorage.AccessToken);
    localStorage.removeItem(eLocalStorage.RefreshToken);
    navigate("/");
  }

  useEffect(() => {
    const init = async () => {
      const token = localStorage.getItem(eLocalStorage.AccessToken);

      if (!token) {
        setLoading(false);
        return;
      }

      await refreshProfile(); // ✅ wait properly
      setLoading(false);
    };

    init();
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
