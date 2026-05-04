import { useNavigate } from "react-router-dom";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { API_PATHS } from "../constants/paths";
import { deleteFetcher } from "../libs/api";
import { CURRENT_USER_KEY } from "./useCurrentUser";

export const useLogout = () => {
  const navigate = useNavigate();

  const { trigger, isMutating } = useSWRMutation(
    API_PATHS.auth.logout,
    (url: string) => deleteFetcher<null>(url),
  );

  const logout = async () => {
    await trigger();
    await mutate(CURRENT_USER_KEY, undefined, { revalidate: false });
    navigate("/login", { replace: true });
  };

  return { logout, isMutating };
};
