export const API_PATHS = {
  auth: {
    login: "/api/auth/login",
    signup: "/api/auth/signup",
    logout: "/api/auth/logout",
    me: "/api/auth/me",
  },
  profile: {
    create: "/api/users/profile",
  },
  occupations: {
    index: "/api/occupations",
  },
  posts: {
    index: "/api/posts",
  },
} as const;
