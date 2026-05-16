import { useState, useRef, useEffect } from "react";
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
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";

export const countryFlags: Record<string, string> = {
  AL: "/images/flags/al.png",
  GR: "/images/flags/gr.png",
};
type NavLink = {
  to: string;
  label: string;
  icon?: React.ElementType;
};

const primaryLinks: NavLink[] = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/contacts", label: "Contacts" },
  { to: "/opportunities", label: "Opportunities" },
];

const secondaryLinks: NavLink[] = [
  { to: "/countries", label: "Countries" },
  { to: "/divisions", label: "Divisions" },
  { to: "/cities", label: "Cities" },
  { to: "/zones", label: "Zones" },
  { to: "/streets", label: "Streets" },
];

const allLinks: NavLink[] = [...primaryLinks, ...secondaryLinks];

export default function Navbar() {
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [moreOpen, setMoreOpen] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!moreRef.current?.contains(e.target as Node)) setMoreOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const navLinkClass = (isActive: boolean) =>
    `flex items-center gap-1.5 text-sm ${
      isActive
        ? "text-slate-900 font-semibold border-b-2 border-slate-900 pb-1"
        : "text-slate-600 hover:text-slate-900"
    }`;

  return (
    <>
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-screen mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* LEFT */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Hamburger — below md */}
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

            <div
              className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center hover:cursor-pointer"
              onClick={() => {
                if (location.pathname === "/dashboard") return;
                navigate("/dashboard");
              }}
            >
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <span className="text-base font-semibold text-slate-900">
              C21 Everest Property
            </span>
          </div>

          {/* MD NAV — primary links + More dropdown */}
          <nav className="hidden md:flex lg:hidden items-center gap-6">
            {primaryLinks.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => navLinkClass(isActive)}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                {label}
              </NavLink>
            ))}

            {/* More dropdown */}
            <div ref={moreRef} className="relative">
              <button
                onClick={() => setMoreOpen((p) => !p)}
                className={`flex items-center gap-1 text-sm ${
                  secondaryLinks.some((l) => location.pathname === l.to)
                    ? "text-slate-900 font-semibold border-b-2 border-slate-900 pb-1"
                    : "text-slate-600 hover:text-slate-900"
                }`}
              >
                More
                <ChevronDown
                  className={`w-3 h-3 transition-transform ${moreOpen ? "rotate-180" : ""}`}
                />
              </button>

              {moreOpen &&
                createPortal(
                  <div
                    className="fixed w-44 bg-white border border-slate-200 rounded-xl shadow-lg py-1 z-[99999]"
                    style={{
                      top:
                        moreRef.current?.getBoundingClientRect().bottom ??
                        0 + 8,
                      left: moreRef.current?.getBoundingClientRect().left ?? 0,
                    }}
                  >
                    {secondaryLinks.map(({ to, label }) => (
                      <button
                        key={to}
                        onMouseDown={(e) => {
                          e.stopPropagation();
                          setMoreOpen(false);
                          navigate(to);
                        }}
                        className={`w-full text-left block px-4 py-2.5 text-sm ${
                          location.pathname === to
                            ? "text-slate-900 font-semibold bg-slate-50"
                            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>,
                  document.body,
                )}
            </div>
          </nav>

          {/* LG+ NAV — all links */}
          <nav className="hidden lg:flex items-center gap-6">
            {allLinks.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) => navLinkClass(isActive)}
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

        {/* MOBILE DROPDOWN — below md */}
        {mobileOpen &&
          createPortal(
            <div className="fixed top-16 left-0 right-0 md:hidden border-t border-slate-100 bg-white px-4 py-3 flex flex-col gap-1 z-[999]">
              {allLinks.map(({ to, label, icon: Icon }) => (
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
            </div>,
            document.body,
          )}
      </header>

      {/* BACKDROPS */}
      {menuOpen && (
        <div className="fixed inset-0" onClick={() => setMenuOpen(false)} />
      )}
      {mobileOpen && (
        <div
          className="fixed inset-0 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}
    </>
  );
}
