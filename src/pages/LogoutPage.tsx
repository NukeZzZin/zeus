import { useEffect } from "react";
import { useNavigate } from "react-router";
import { routes } from "@utils/endpoint";

import useAuthStore from "@stores/auth_store";

import Loading from "@components/Loading";

const LogoutPage = () => {
  const navigate = useNavigate();
  const clearTokenTuple = useAuthStore((state) => state.clearTokenTuple);
  const refreshToken = useAuthStore((state) => state.refreshToken);

  useEffect(() => {
    if (refreshToken) routes.session.logout(refreshToken);
    clearTokenTuple();
    localStorage.removeItem("prometheus:auth");
    navigate("/", { replace: true });
  }, [refreshToken, clearTokenTuple, navigate]);

<<<<<<< HEAD
  return <Loading />;
=======
  return <Loading/>;
>>>>>>> sync
};

export default LogoutPage;
