import type { FC } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useCurrentUser } from "../../../hooks/useCurrentUser";

export const RequireAuth: FC = () => {
  const { isLoggedIn, isLoading } = useCurrentUser();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-background">
        <span className="font-display text-sm uppercase tracking-widest text-foreground animate-pulse">
          Loading...
        </span>
      </div>
    );
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};
