import useSWRMutation from "swr/mutation";
import { API_PATHS } from "@/constants/paths";
import { deleteFetcher } from "@/libs/api";

export const useDeletePost = (postId: number, onSuccess?: () => void) => {
  const { trigger, isMutating } = useSWRMutation(
    API_PATHS.posts.destroy(postId),
    (url: string) => deleteFetcher<null>(url),
    { onSuccess },
  );

  return { deletePost: trigger, isDeleting: isMutating };
};
