import { API_PATHS } from "@/constants/paths";
import { usePagination } from "@/features/shared/pagination/usePagination";
import { getFetcher } from "@/libs/api";
import type { PostsResponse } from "@/types/api";
import useSWR from "swr";

export const useTimeLine = () => {
  const { page, setPage } = usePagination();

  const key = `${API_PATHS.posts.index}?page=${page}`;

  const { data, error, isLoading, mutate } = useSWR<PostsResponse>(
    key,
    getFetcher<PostsResponse>,
    { revalidateOnFocus: false },
  );

  return {
    posts: data?.data ?? [],
    pagination: data?.pagination,
    page,
    setPage,
    isLoading,
    error,
    refresh: mutate,
  };
};
