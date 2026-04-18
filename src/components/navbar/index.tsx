import { useState } from "react";
import { Building2, LogOut, ChevronDown, User, Shield } from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

export const countryFlags: Record<string, string> = {
  AL: "/images/flags/albanian.jpg",
  GR: "/images/flags/greece.jpg",
};

export default function Navbar() {
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* LEFT */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center">
            <Building2 className="w-4 h-4 text-white" />
          </div>
          <span className="hidden sm:block text-base font-semibold text-slate-900">
            EstateFlow
          </span>
        </div>

        {/* NAV */}
        <nav className="hidden md:flex items-center gap-6">
          <Link
            to="/countries"
            className="text-sm text-slate-600 hover:text-slate-900"
          >
            Countries
          </Link>
          <Link
            to="/divisions"
            className="text-sm text-slate-600 hover:text-slate-900"
          >
            Divisions
          </Link>
          <Link
            to="/cities"
            className="text-sm text-slate-600 hover:text-slate-900"
          >
            Cities
          </Link>
          <Link
            to="/zones"
            className="text-sm text-slate-600 hover:text-slate-900"
          >
            Zones
          </Link>
        </nav>

        {/* USER */}
        <div className="relative flex items-center gap-3">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex items-center gap-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl px-3 py-2"
          >
            <div className="w-7 h-7 bg-slate-200 rounded-lg flex items-center justify-center">
              {user?.role === "admin" ? (
                <Shield className="w-3.5 h-3.5 text-slate-600" />
              ) : (
                <User className="w-3.5 h-3.5 text-slate-600" />
              )}
            </div>

            <div className="hidden sm:block text-left">
              <p className="text-xs font-medium text-slate-900">
                {user?.userName || "User"}
              </p>

              <div className="flex items-center gap-1 text-xs text-slate-400">
                <span className="capitalize">{user?.role}</span>

                {user?.country && countryFlags[user.country] && (
                  <img
                    src={countryFlags[user.country]}
                    alt={user.country}
                    className="w-5 h-4 object-cover rounded-sm"
                  />
                )}
              </div>
            </div>

            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {/* DROPDOWN (FIXED OVERLAY ISSUE) */}
          {menuOpen && (
            <div className="fixed right-4 top-16 w-52 bg-white rounded-2xl border border-slate-200 shadow-lg py-2 z-[99999]">
              {/* USER INFO */}
              <div className="px-4 py-2.5 border-b border-slate-100">
                <p className="text-xs font-semibold text-slate-900 flex items-center gap-2">
                  {user?.firstName} {user?.lastName}
                  {user?.country && countryFlags[user.country] && (
                    <img
                      src={countryFlags[user.country]}
                      alt={user.country}
                      className="w-5 h-4 object-cover rounded-sm"
                    />
                  )}
                </p>

                <p className="text-xs text-slate-400 capitalize">
                  {user?.role}
                </p>
              </div>

              {/* SIGN OUT */}
              <button
                onClick={() => {
                  setMenuOpen(false);
                  signOut();
                }}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>

      {/* BACKDROP */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-[99990]"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </header>
  );
}
