import { Navigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { Spinner } from "../../components/spinner";

export type TProtectedRoute = {
  children: React.ReactNode;
};

const ProtectedRoute = (props: TProtectedRoute) => {
  const { children } = props;

  const { user, loading } = useAuth();
  const hasAccess = user;

  if (loading) {
    return <Spinner fullScreen={true} />;
  }

  if (!user) return <Navigate to="/" />;

  return hasAccess ? children : <Navigate to="/403" replace />;
};

export default ProtectedRoute;
