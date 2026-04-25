import { useState } from "react";
import {
  Building2,
  LogOut,
  ChevronDown,
  User,
  Shield,
  Menu,
  X,
  LayoutDashboard,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";
import { NavLink } from "react-router-dom";
import { createPortal } from "react-dom";

export const countryFlags: Record<string, string> = {
  AL: "/images/flags/albanian.jpg",
  GR: "/images/flags/greece.jpg",
};

const navLinks = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/countries", label: "Countries" },
  { to: "/divisions", label: "Divisions" },
  { to: "/cities", label: "Cities" },
  { to: "/zones", label: "Zones" },
  { to: "/streets", label: "Streets" },
  { to: "/contacts", label: "Contacts" },
];

export default function Navbar() {
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* LEFT */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Mobile hamburger */}
            <button
              className="md:hidden p-1.5 rounded-lg hover:bg-slate-100"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="w-5 h-5 text-slate-600" />
              ) : (
                <Menu className="w-5 h-5 text-slate-600" />
              )}
            </button>

            <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <span className="hidden sm:block text-base font-semibold text-slate-900">
              EstateFlow
            </span>
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex items-center gap-6">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-1.5 text-sm ${
                    isActive
                      ? "text-slate-900 font-semibold border-b-2 border-slate-900 pb-1"
                      : "text-slate-600 hover:text-slate-900"
                  }`
                }
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                {label}
              </NavLink>
            ))}
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

            {menuOpen &&
              createPortal(
                <div className="fixed right-4 top-16 w-52 bg-white rounded-2xl border border-slate-200 shadow-lg py-2 z-[99999]">
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
                </div>,

                document.body,
              )}
          </div>
        </div>

        {/* MOBILE NAV DROPDOWN */}
        {mobileOpen && (
          <div className="md:hidden border-t border-slate-100 bg-white px-4 py-3 flex flex-col gap-1">
            {navLinks.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setMobileOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-slate-900 text-white"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                  }`
                }
              >
                {Icon && <Icon className="w-4 h-4" />}
                {label}
              </NavLink>
            ))}
          </div>
        )}
      </header>

      {/* BACKDROPS */}
      {menuOpen && (
        <div className="fixed inset-0 " onClick={() => setMenuOpen(false)} />
      )}
      {mobileOpen && (
        <div
          className="fixed inset-0  md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
