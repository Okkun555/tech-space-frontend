import type { Gender, Occupation } from "./profile";

export type CurrentUserProfile = {
  id: number;
  name: string;
  birthday: string;
  gender: Gender;
  introduction: string;
  occupation: Occupation;
};

export type CurrentUser = {
  id: number;
  email: string;
  profile?: CurrentUserProfile;
};

export type MeResponse = {
  data: CurrentUser;
};

export type LoginRequest = {
  session: {
    email: string;
    password: string;
  };
};

export type LoginResponse = {
  data: {
    id: number;
    email: string;
  };
};

export type SignupRequest = {
  user: {
    email: string;
    password: string;
    password_confirmation: string;
  };
};

export type SignupResponse = {
  data: {
    id: number;
    email: string;
  };
};
