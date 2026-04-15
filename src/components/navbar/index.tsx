import { useState } from "react";
import { Building2, LogOut, ChevronDown, User, Shield } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export const countryFlags: Record<string, string> = {
  albania: "🇦🇱",
  greece: "🇬🇷",
};

export default function Navbar() {
  const { profile, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* LEFT - BRAND */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center">
            <Building2 className="w-4 h-4 text-white" />
          </div>
          <div className="hidden sm:block">
            <span className="text-base font-semibold text-slate-900 tracking-tight">
              EstateFlow
            </span>
          </div>
        </div>

        {/* RIGHT - USER */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex items-center gap-2.5 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 transition-all"
            >
              <div className="w-7 h-7 bg-slate-200 rounded-lg flex items-center justify-center">
                {profile?.role === "admin" ? (
                  <Shield className="w-3.5 h-3.5 text-slate-600" />
                ) : (
                  <User className="w-3.5 h-3.5 text-slate-600" />
                )}
              </div>

              <div className="hidden sm:block text-left">
                <p className="text-xs font-medium text-slate-900 leading-none mb-0.5">
                  {profile?.full_name || "User"}
                </p>
                <div className="flex items-center gap-1">
                  <span className="text-xs text-slate-400 capitalize">
                    {profile?.role}
                  </span>
                  {profile?.country && (
                    <>
                      <span className="text-slate-300">·</span>
                      <span className="text-xs text-slate-400">
                        {countryFlags[profile.country]}{" "}
                        {profile.country.charAt(0).toUpperCase() +
                          profile.country.slice(1)}
                      </span>
                    </>
                  )}
                </div>
              </div>

              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl border border-slate-200 shadow-lg shadow-slate-200/50 py-2 z-50">
                <div className="px-4 py-2.5 border-b border-slate-100 mb-1">
                  <p className="text-xs font-semibold text-slate-900">
                    {profile?.full_name}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5 capitalize">
                    {profile?.role}
                    {profile?.country && ` · ${profile.country}`}
                  </p>
                </div>

                <button
                  onClick={() => {
                    setMenuOpen(false);
                    signOut();
                  }}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {menuOpen && (
        <div
          className="fixed inset-0 z-30"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </header>
  );
}
