import type { FC } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/features/shared/hooks/useCurrentUser";
import { useLogout } from "@/features/shared/hooks/useLogout";

export const HeaderLayout: FC = () => {
  const { currentUser } = useCurrentUser();
  const { logout, isMutating } = useLogout();

  return (
    <>
      <header className="flex h-16 items-center border-b-4 border-foreground bg-foreground px-6 text-background">
        <NavLink
          to="/"
          className="inline-flex items-center gap-2 font-display text-sm uppercase tracking-widest text-background no-underline"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          Tech Space
        </NavLink>

        {currentUser && (
          <div className="ml-auto flex items-center gap-3">
            <span className="font-mono text-3xl text-background/70">
              {currentUser.profile
                ? currentUser.profile.name
                : currentUser.email}
            </span>
            <Button
              size="sm"
              variant="accent"
              onClick={logout}
              loading={isMutating}
              disabled={isMutating}
            >
              ログアウト
            </Button>
          </div>
        )}
      </header>
      <main className="min-h-[calc(100svh-4rem)] bg-background">
        <Outlet />
      </main>
    </>
  );
};
