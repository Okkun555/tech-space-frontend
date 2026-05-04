import type { FC } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Center, Loader } from "smarthr-ui";
import { useCurrentUser } from "../../../hooks/useCurrentUser";

export const RequireAuth: FC = () => {
  const { isLoggedIn, isLoading } = useCurrentUser();
  const location = useLocation();

  if (isLoading) {
    return (
      <Center minHeight="100svh" verticalCentering>
        <Loader />
      </Center>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};
