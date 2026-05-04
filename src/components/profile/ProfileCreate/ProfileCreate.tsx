import type { CSSProperties, FC } from "react";
import { Controller } from "react-hook-form";
import {
  Cluster,
  FormControl,
  Input,
  PageHeading,
  RadioButton,
  Section,
  Select,
  Stack,
  StatusLabel,
  Text,
  Textarea,
} from "smarthr-ui";
import { PrimaryButton } from "../../shared/PrimaryButton";
import { useProfileCreate } from "./useProfileCreate";

const genderOptions = [
  { value: "male", label: "男性" },
  { value: "female", label: "女性" },
  { value: "other", label: "その他" },
] as const;

const requiredLabel = <StatusLabel type="red">必須</StatusLabel>;
const optionalLabel = <StatusLabel>任意</StatusLabel>;

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
    <div style={pageStyle}>
      <Stack gap={2} align="stretch">
        <Stack gap={0.75} align="stretch">
          <PageHeading>プロフィール作成</PageHeading>
          <Text color="TEXT_GREY">
            あなたの情報を入力してください。登録した内容は他のメンバーに公開されます。
          </Text>
        </Stack>

        <Section>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack gap={1.5} align="stretch">
              <FormControl
                label="アカウント名"
                statusLabels={requiredLabel}
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
                statusLabels={requiredLabel}
                errorMessages={errors.birthday?.message}
              >
                <Input
                  type="date"
                  autoComplete="bday"
                  error={!!errors.birthday}
                  {...register("birthday")}
                />
              </FormControl>

              <FormControl
                label="性別"
                statusLabels={requiredLabel}
                errorMessages={errors.gender?.message}
              >
                <Cluster gap={1.25}>
                  {genderOptions.map((option) => (
                    <RadioButton
                      key={option.value}
                      value={option.value}
                      {...register("gender")}
                    >
                      {option.label}
                    </RadioButton>
                  ))}
                </Cluster>
              </FormControl>

              <FormControl
                label="職業"
                statusLabels={requiredLabel}
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
                statusLabels={optionalLabel}
                helpMessage="興味のある分野や活動内容など、自由に記入できます（500文字まで）。"
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

              <Cluster justify="flex-end" gap={1}>
                <PrimaryButton
                  type="submit"
                  loading={isMutating}
                  disabled={isMutating}
                >
                  プロフィールを登録
                </PrimaryButton>
              </Cluster>
            </Stack>
          </form>
        </Section>
      </Stack>
    </div>
  );
};

const pageStyle: CSSProperties = {
  maxWidth: 720,
  margin: "0 auto",
  padding: "32px 24px 64px",
};
