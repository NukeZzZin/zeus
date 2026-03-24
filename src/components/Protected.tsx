import { Navigate } from "react-router";
import useAuthStore from "@stores/auth_store";

const Protected = ({ children }: { children: React.ReactNode }) =>
  useAuthStore((state) => state.isLoggedIn) ? children : <Navigate to="/login" replace/>;

export default Protected;
