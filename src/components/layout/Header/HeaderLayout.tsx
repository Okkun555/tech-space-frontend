import type { CSSProperties, FC } from "react";
import { NavLink, Outlet } from "react-router-dom";

export const HeaderLayout: FC = () => {
  return (
    <>
      <header style={headerStyle}>
        <NavLink to="/" style={brandStyle}>
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
          Tech Space
        </NavLink>

        <nav style={navStyle}>
          <NavLink
            to="/"
            end
            style={({ isActive }) => getNavLinkStyle(isActive)}
          >
            ホーム
          </NavLink>
        </nav>
      </header>
      <main style={mainStyle}>
        <Outlet />
      </main>
    </>
  );
};

const HEADER_BG = "#1f2328";
const HEADER_BORDER = "#30363d";
const HEADER_TEXT = "#f0f6fc";
const HEADER_TEXT_MUTED = "#9da7b3";
const HEADER_ACTIVE_ACCENT = "#fb8500";

const headerStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  height: 62,
  padding: "0 24px",
  backgroundColor: HEADER_BG,
  borderBottom: `1px solid ${HEADER_BORDER}`,
  color: HEADER_TEXT,
};

const brandStyle: CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
  textDecoration: "none",
  color: HEADER_TEXT,
  fontWeight: 600,
  fontSize: 16,
};

const navStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 20,
  marginLeft: 32,
  flex: 1,
};

const baseNavLinkStyle: CSSProperties = {
  textDecoration: "none",
  fontSize: 14,
  fontWeight: 500,
  padding: "6px 4px",
  borderBottom: "2px solid transparent",
};

const getNavLinkStyle = (isActive: boolean): CSSProperties => ({
  ...baseNavLinkStyle,
  color: isActive ? HEADER_TEXT : HEADER_TEXT_MUTED,
  borderBottomColor: isActive ? HEADER_ACTIVE_ACCENT : "transparent",
});

const mainStyle: CSSProperties = {
  minHeight: "calc(100svh - 62px)",
  backgroundColor: "var(--shr-color-base-grey)",
};
