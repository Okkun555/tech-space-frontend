import type { FC } from "react";
import { Controller } from "react-hook-form";
import {
  Base,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  RadioButton,
  Select,
  SmartHRLogo,
  Stack,
  Textarea,
} from "smarthr-ui";
import { useProfileCreate } from "./useProfileCreate";

const genderOptions = [
  { value: "male", label: "男性" },
  { value: "female", label: "女性" },
  { value: "other", label: "その他" },
] as const;

export const ProfileCreate: FC = () => {
  const {
    control,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isMutating,
    occupations,
    isOccupationsLoading,
  } = useProfileCreate();

  const occupationOptions = occupations.map((occupation) => ({
    value: String(occupation.id),
    label: occupation.name,
  }));

  return (
    <Center
      minHeight="100svh"
      padding={1}
      verticalCentering
      style={{ backgroundColor: "var(--shr-color-base-grey)" }}
    >
      <Base padding={3} radius="m" layer={3} style={{ width: 480 }}>
        <Stack gap={2} align="stretch">
          <Stack gap={2} align="center">
            <SmartHRLogo fill="brand" />
            <Heading type="sectionTitle" size="L">
              プロフィール作成
            </Heading>
          </Stack>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack gap={1.25} align="stretch">
              <FormControl
                label="アカウント名"
                errorMessages={errors.name?.message}
              >
                <Input
                  type="text"
                  autoComplete="nickname"
                  width="100%"
                  error={!!errors.name}
                  {...register("name")}
                />
              </FormControl>

              <FormControl
                label="生年月日"
                errorMessages={errors.birthday?.message}
              >
                <Input
                  type="date"
                  autoComplete="bday"
                  width="100%"
                  error={!!errors.birthday}
                  {...register("birthday")}
                />
              </FormControl>

              <FormControl
                label="性別"
                errorMessages={errors.gender?.message}
              >
                <Stack gap={0.5}>
                  {genderOptions.map((option) => (
                    <RadioButton
                      key={option.value}
                      value={option.value}
                      {...register("gender")}
                    >
                      {option.label}
                    </RadioButton>
                  ))}
                </Stack>
              </FormControl>

              <FormControl
                label="職業"
                errorMessages={errors.occupationId?.message}
              >
                <Controller
                  control={control}
                  name="occupationId"
                  render={({ field }) => (
                    <Select
                      options={occupationOptions}
                      hasBlank
                      blankLabel="選択してください"
                      width="100%"
                      error={!!errors.occupationId}
                      disabled={isOccupationsLoading}
                      name={field.name}
                      value={field.value}
                      onChange={field.onChange}
                      onBlur={field.onBlur}
                    />
                  )}
                />
              </FormControl>

              <FormControl
                label="自己紹介"
                errorMessages={errors.introduction?.message}
              >
                <Textarea
                  width="100%"
                  rows={5}
                  maxLetters={500}
                  error={!!errors.introduction}
                  {...register("introduction")}
                />
              </FormControl>

              <Button
                type="submit"
                variant="primary"
                wide
                loading={isMutating}
                disabled={isMutating}
              >
                プロフィールを登録
              </Button>
            </Stack>
          </form>
        </Stack>
      </Base>
    </Center>
  );
};
