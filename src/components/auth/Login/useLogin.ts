import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { mutate } from "swr";
import useSWRMutation from "swr/mutation";
import { z } from "zod";
import { API_PATHS } from "../../../constants/paths";
import {
  fieldLabels,
  validationMessages,
} from "../../../constants/validationMessages";
import { CURRENT_USER_KEY } from "../../../hooks/useCurrentUser";
import { postFetcher } from "../../../libs/api";
import type { LoginRequest, LoginResponse } from "../../../types/api/auth";

const loginSchema = z.object({
  email: z
    .email(validationMessages.invalidFormat(fieldLabels.email))
    .min(1, validationMessages.required(fieldLabels.email)),
  password: z
    .string()
    .min(1, validationMessages.required(fieldLabels.password))
    .min(8, validationMessages.minLength(fieldLabels.password, 8)),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export const useLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const { trigger, isMutating } = useSWRMutation(
    API_PATHS.auth.login,
    postFetcher<LoginResponse, LoginRequest>,
  );

  const onSubmit = async (data: LoginFormValues) => {
    await trigger({
      session: {
        email: data.email,
        password: data.password,
      },
    });
    await mutate(CURRENT_USER_KEY);
  };

  return {
    register,
    errors,
    handleSubmit,
    onSubmit,
    isMutating,
  };
};
