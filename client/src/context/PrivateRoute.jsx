import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";


const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user, loading, isAdmin } = useContext(AuthContext);
  console.log("PrivateRoute Check:", { user, loading, isAdmin: isAdmin(), adminOnly });

  if (loading) return <p>Loading...</p>;
  if (!user) return <Navigate to="/login" />;
  if (adminOnly && !isAdmin()) return <Navigate to="/" />;

  return children;
};

export default PrivateRoute;