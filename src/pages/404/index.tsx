import { Home, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";

const Page404 = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">
      <div className="text-center max-w-md">
        {/* Icon */}
        <div className="w-20 h-20 mx-auto mb-6 bg-white border border-slate-200 rounded-2xl flex items-center justify-center shadow-sm">
          <span className="text-3xl font-bold text-slate-900">404</span>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-slate-900 mb-2">
          Page not found
        </h1>

        <p className="text-sm text-slate-500 mb-8">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl border border-slate-200 bg-white hover:bg-slate-100 text-sm text-slate-700 transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Go back
          </Button>

          <Button
            onClick={() => navigate("/dashboard")}
            className="flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-sm transition"
          >
            <Home className="w-4 h-4" />
            Dashboard
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Page404;
