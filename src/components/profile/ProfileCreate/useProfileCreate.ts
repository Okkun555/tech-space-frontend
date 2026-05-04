import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";
import { z } from "zod";
import { API_PATHS } from "../../../constants/paths";
import {
  fieldLabels,
  validationMessages,
} from "../../../constants/validationMessages";
import { getFetcher, postFetcher } from "../../../libs/api";
import type {
  OccupationsResponse,
  ProfileCreateRequest,
  ProfileCreateResponse,
} from "../../../types/api/profile";

const profileCreateSchema = z.object({
  name: z
    .string()
    .min(1, validationMessages.required(fieldLabels.name))
    .max(100, validationMessages.maxLength(fieldLabels.name, 100)),
  birthday: z
    .string()
    .min(1, validationMessages.required(fieldLabels.birthday))
    .refine(
      (value) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const input = new Date(value);
        return !Number.isNaN(input.getTime()) && input < today;
      },
      { message: validationMessages.pastDate(fieldLabels.birthday) },
    ),
  gender: z.enum(["male", "female", "other"], {
    message: validationMessages.select(fieldLabels.gender),
  }),
  occupationId: z
    .string()
    .min(1, validationMessages.select(fieldLabels.occupation)),
  introduction: z
    .string()
    .max(500, validationMessages.maxLength(fieldLabels.introduction, 500)),
});

type ProfileCreateFormValues = z.infer<typeof profileCreateSchema>;

export const useProfileCreate = () => {
  const navigate = useNavigate();

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileCreateFormValues>({
    defaultValues: {
      name: "",
      birthday: "",
      gender: undefined,
      occupationId: "",
      introduction: "",
    },
    resolver: zodResolver(profileCreateSchema),
  });

  const { data: occupationsData, isLoading: isOccupationsLoading } =
    useSWR<OccupationsResponse>(
      API_PATHS.occupations.index,
      getFetcher<OccupationsResponse>,
    );

  const { trigger, isMutating } = useSWRMutation(
    API_PATHS.profile.create,
    postFetcher<ProfileCreateResponse, ProfileCreateRequest>,
  );

  const onSubmit = async (data: ProfileCreateFormValues) => {
    await trigger({
      profile: {
        name: data.name,
        birthday: data.birthday,
        gender: data.gender,
        occupation_id: Number(data.occupationId),
        introduction: data.introduction,
        programming_languages: [],
        sns_links: [],
      },
    });
    navigate("/");
  };

  return {
    control,
    register,
    errors,
    handleSubmit,
    onSubmit,
    isMutating,
    occupations: occupationsData?.data ?? [],
    isOccupationsLoading,
  };
};
