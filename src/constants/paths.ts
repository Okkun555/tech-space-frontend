export const API_PATHS = {
  auth: {
    login: "/api/auth/login",
    signup: "/api/auth/signup",
    me: "/api/auth/me",
  },
  profile: {
    create: "/api/users/profile",
  },
  occupations: {
    index: "/api/occupations",
  },
} as const;
