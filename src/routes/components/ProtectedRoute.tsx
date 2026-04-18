import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export type TProtectedRoute = {
  children: React.ReactNode;
};

const ProtectedRoute = (props: TProtectedRoute) => {
  const { children } = props;

  const { user, loading } = useAuth();
  const hasAccess = user;

  if (loading) {
    return null;
  }

  if (!user) return <Navigate to="/" />;

  return hasAccess ? children : <Navigate to="/403" replace />;
};

export default ProtectedRoute;
