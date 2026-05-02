import { useState, FormEvent } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const { signIn, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [country, setCountry] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    await signIn(email, password, country);
    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen flex">
      {/* Left panel — hero */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        <img
          src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Luxury property"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/85 via-slate-800/65 to-slate-700/40" />

        <div className="relative z-10 flex flex-col justify-center items-center p-12 text-white w-full gap-8">
          {/* Large centered company logo */}
          <div className="w-72 h-72 rounded-3xl overflow-hidden bg-black/20 backdrop-blur-sm border border-white/20 flex items-center justify-center shadow-2xl">
            <img
              src="/images/c21Everest.jpg"
              alt="C21 Everest Property"
              className="w-full h-full object-contain mix-blend-screen scale-95"
            />
          </div>

          {/* Company name */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold tracking-tight mb-1">
              C21 Everest Property
            </h2>
            <p className="text-white/50 text-sm">Internal Management System</p>
          </div>

          {/* Quote */}
          <blockquote className="text-xl font-light leading-relaxed text-white/80 text-center max-w-sm">
            "The finest properties across Albania and Greece, managed by trusted
            professionals."
          </blockquote>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center bg-slate-50 p-8">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="flex flex-col items-center gap-3 mb-10 lg:hidden">
            <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-900 flex items-center justify-center shadow-lg">
              <img
                src="/images/c21Everest.jpg"
                alt="C21 Everest"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-xl font-semibold text-slate-900">
              C21 Everest Property
            </span>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              Welcome back
            </h1>
            <p className="text-slate-500 text-sm">
              Sign in to access your property dashboard
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="name@company.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all text-sm pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>

              <div className="mt-6">
                <p className="text-xs font-medium text-slate-500 mb-3 text-center uppercase tracking-wider">
                  Select your operation
                </p>
                <div className="grid grid-cols-2 gap-3">
                  {/* ALBANIA */}
                  <button
                    type="button"
                    onClick={() => setCountry("AL")}
                    className={`relative flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 ${
                      country === "AL"
                        ? "border-blue-600 bg-blue-50 ring-2 ring-blue-600/20"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <img
                      src="/images/flags/al.png"
                      alt="Albania"
                      className="w-8 h-6 object-cover rounded shadow-sm shrink-0"
                    />
                    <div className="text-left">
                      <p
                        className={`text-sm font-semibold ${country === "AL" ? "text-blue-700" : "text-slate-700"}`}
                      >
                        Albania
                      </p>
                      <p className="text-xs text-slate-400">Operations</p>
                    </div>
                    {country === "AL" && (
                      <div className="ml-auto w-2 h-2 rounded-full bg-blue-600" />
                    )}
                  </button>

                  {/* GREECE */}
                  <button
                    type="button"
                    onClick={() => setCountry("GR")}
                    className={`relative flex items-center gap-3 px-4 py-3 rounded-xl border transition-all duration-200 ${
                      country === "GR"
                        ? "border-blue-600 bg-blue-50 ring-2 ring-blue-600/20"
                        : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                    }`}
                  >
                    <img
                      src="/images/flags/gr.png"
                      alt="Greece"
                      className="w-8 h-6 object-cover rounded shadow-sm shrink-0"
                    />
                    <div className="text-left">
                      <p
                        className={`text-sm font-semibold ${country === "GR" ? "text-blue-700" : "text-slate-700"}`}
                      >
                        Greece
                      </p>
                      <p className="text-xs text-slate-400">Operations</p>
                    </div>
                    {country === "GR" && (
                      <div className="ml-auto w-2 h-2 rounded-full bg-blue-600" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 text-sm flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-200">
            <p className="text-xs text-slate-400 text-center">
              Access is restricted to authorized agents and administrators only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
