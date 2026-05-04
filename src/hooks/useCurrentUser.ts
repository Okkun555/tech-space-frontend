import useSWR from "swr";
import { API_PATHS } from "../constants/paths";
import { ApiError, getFetcher } from "../libs/api";
import type { MeResponse } from "../types/api/auth";

export const CURRENT_USER_KEY = API_PATHS.auth.me;

export const useCurrentUser = () => {
  const { data, error, isLoading } = useSWR<MeResponse>(
    CURRENT_USER_KEY,
    getFetcher<MeResponse>,
    {
      shouldRetryOnError: (err) =>
        !(err instanceof ApiError && err.status === 401),
      revalidateOnFocus: false,
    },
  );

  const isUnauthorized = error instanceof ApiError && error.status === 401;

  return {
    currentUser: data?.data ?? null,
    isLoggedIn: !!data?.data,
    hasProfile: !!data?.data?.profile,
    isLoading,
    error: isUnauthorized ? null : error,
  };
};
