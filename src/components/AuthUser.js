import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function AuthUser({ children }) {
  const { user } = useSelector((state) => state.users);

  //checking if user is logged in
  if (Object.keys(user).length === 0) {
    return <Navigate to="/registration/log-in" />;
  }

  return children;
}

export default AuthUser;
