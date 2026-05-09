import type { FC } from "react";
import { Controller } from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { PrimaryButton } from "../../shared/PrimaryButton";
import { useProfileCreate } from "./useProfileCreate";

const genderOptions = [
  { value: "male", label: "男性" },
  { value: "female", label: "女性" },
  { value: "other", label: "その他" },
] as const;

const requiredBadge = <Badge variant="required">必須</Badge>;
const optionalBadge = <Badge>任意</Badge>;

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

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-2">
          <h1 className="font-display text-2xl uppercase tracking-widest">
            プロフィール作成
          </h1>
          <p className="font-mono text-base text-muted-foreground">
            あなたの情報を入力してください。登録した内容は他のメンバーに公開されます。
          </p>
        </div>

        <section className="border-2 border-foreground bg-card p-8 shadow-[8px_8px_0_0_var(--color-foreground)]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-6"
          >
            <Field
              label="アカウント名"
              htmlFor="profile-name"
              badge={requiredBadge}
              errorMessage={errors.name?.message}
            >
              <Input
                id="profile-name"
                type="text"
                autoComplete="nickname"
                invalid={!!errors.name}
                {...register("name")}
              />
            </Field>

            <Field
              label="生年月日"
              htmlFor="profile-birthday"
              badge={requiredBadge}
              errorMessage={errors.birthday?.message}
            >
              <Input
                id="profile-birthday"
                type="date"
                autoComplete="bday"
                invalid={!!errors.birthday}
                {...register("birthday")}
              />
            </Field>

            <Field
              label="性別"
              badge={requiredBadge}
              errorMessage={errors.gender?.message}
            >
              <Controller
                control={control}
                name="gender"
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    name={field.name}
                    className="flex flex-wrap gap-5"
                  >
                    {genderOptions.map((option) => (
                      <label
                        key={option.value}
                        className="inline-flex cursor-pointer items-center gap-2 font-mono text-base"
                      >
                        <RadioGroupItem value={option.value} />
                        <span>{option.label}</span>
                      </label>
                    ))}
                  </RadioGroup>
                )}
              />
            </Field>

            <Field
              label="職業"
              badge={requiredBadge}
              errorMessage={errors.occupationId?.message}
            >
              <Controller
                control={control}
                name="occupationId"
                render={({ field }) => (
                  <Select
                    value={field.value || undefined}
                    onValueChange={field.onChange}
                    disabled={isOccupationsLoading}
                  >
                    <SelectTrigger
                      invalid={!!errors.occupationId}
                      onBlur={field.onBlur}
                    >
                      <SelectValue placeholder="選択してください" />
                    </SelectTrigger>
                    <SelectContent>
                      {occupations.map((occupation) => (
                        <SelectItem
                          key={occupation.id}
                          value={String(occupation.id)}
                        >
                          {occupation.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>

            <Field
              label="自己紹介"
              htmlFor="profile-introduction"
              badge={optionalBadge}
              helpText="興味のある分野や活動内容など、自由に記入できます（500文字まで）。"
              errorMessage={errors.introduction?.message}
            >
              <Textarea
                id="profile-introduction"
                rows={5}
                maxLength={500}
                invalid={!!errors.introduction}
                {...register("introduction")}
              />
            </Field>

            <div className="flex justify-end">
              <PrimaryButton
                type="submit"
                loading={isMutating}
                disabled={isMutating}
              >
                プロフィールを登録
              </PrimaryButton>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};
