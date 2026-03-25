import { Navigate } from "react-router";
import { useIsLoggedIn } from "@stores/auth_store";

const Protected = ({ children }: { children: React.ReactNode }) => {
  return useIsLoggedIn() ? children : <Navigate to="/login" replace/>;
};

export default Protected;
