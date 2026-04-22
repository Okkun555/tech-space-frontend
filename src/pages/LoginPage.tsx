import { useForm } from "react-hook-form"
import {
  Base,
  Button,
  Center,
  FormControl,
  Heading,
  Input,
  SmartHRLogo,
  Stack,
} from "smarthr-ui"

type LoginFormValues = {
  email: string
  password: string
}

function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>({
    defaultValues: { email: "", password: "" },
  })

  const onSubmit = (data: LoginFormValues) => {
    console.log("login submit (dummy):", data)
  }

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
              Tech Space ログイン画面
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
                  {...register("email", {
                    required: "メールアドレスを入力してください",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "メールアドレスの形式が正しくありません",
                    },
                  })}
                />
              </FormControl>

              <FormControl
                label="パスワード"
                errorMessages={errors.password?.message}
              >
                <Input
                  type="password"
                  autoComplete="current-password"
                  width="100%"
                  error={!!errors.password}
                  {...register("password", {
                    required: "パスワードを入力してください",
                    minLength: {
                      value: 8,
                      message: "パスワードは8文字以上で入力してください",
                    },
                  })}
                />
              </FormControl>

              <Button
                type="submit"
                variant="primary"
                wide
                loading={isSubmitting}
              >
                ログイン
              </Button>
            </Stack>
          </form>
        </Stack>
      </Base>
    </Center>
  )
}

export default LoginPage
