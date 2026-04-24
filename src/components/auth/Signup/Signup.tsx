import type {FC} from "react";
import {Link} from "react-router-dom";
import {
  Base,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  SmartHRLogo,
  Stack,
  TextLink,
} from "smarthr-ui"
import {useSignup} from "./useSignup.ts";

export const Signup: FC = () => {
  const {
    register,
    handleSubmit,
    onSubmit,
    errors,
    isMutating,
  } = useSignup()

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
              Tech Space アカウント作成
            </Heading>
          </Stack>

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <Stack gap={1.25} align="stretch">
              <FormControl
                label="メールアドレス"
                errorMessages={errors.email?.message}
              >
                <Input
                  type="email"
                  autoComplete="email"
                  width="100%"
                  error={!!errors.email}
                  {...register("email")}
                />
              </FormControl>

              <FormControl
                label="パスワード"
                errorMessages={errors.password?.message}
              >
                <Input
                  type="password"
                  autoComplete="new-password"
                  width="100%"
                  error={!!errors.password}
                  {...register("password")}
                />
              </FormControl>

              <FormControl
                label="パスワード（確認）"
                errorMessages={errors.passwordConfirmation?.message}
              >
                <Input
                  type="password"
                  autoComplete="new-password"
                  width="100%"
                  error={!!errors.passwordConfirmation}
                  {...register("passwordConfirmation")}
                />
              </FormControl>

              <Button
                type="submit"
                variant="primary"
                wide
                loading={isMutating}
                disabled={isMutating}
              >
                アカウント作成
              </Button>
            </Stack>
          </form>

          <Stack gap={0.5} align="center">
            <TextLink elementAs={Link} to="/login">
              既にアカウントをお持ちの方はこちら
            </TextLink>
          </Stack>
        </Stack>
      </Base>
    </Center>
  )
}
