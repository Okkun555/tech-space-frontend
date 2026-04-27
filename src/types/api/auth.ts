export type CurrentUser = {
  id: number;
  email: string;
};

export type MeResponse = {
  user: CurrentUser;
};

export type LoginRequest = {
  session: {
    email: string;
    password: string;
  };
};

export type LoginResponse = {
  id: number;
  email: string;
};

export type SignupRequest = {
  user: {
    email: string;
    password: string;
    password_confirmation: string;
  };
};

export type SignupResponse = {
  id: number;
  email: string;
};
