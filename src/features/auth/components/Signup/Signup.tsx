import type { FC } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useSignup } from "./useSignup";

export const Signup: FC = () => {
  const { register, handleSubmit, onSubmit, errors, isMutating } = useSignup();

  return (
    <div className="flex min-h-svh items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col gap-6 p-8">
          <div className="flex flex-col items-center gap-2">
            <h1 className="font-display text-lg uppercase tracking-widest">
              Tech Space
            </h1>
            <p className="font-mono text-sm text-muted-foreground">
              アカウント作成
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-4"
          >
            <Field
              label="メールアドレス"
              htmlFor="signup-email"
              errorMessage={errors.email?.message}
            >
              <Input
                id="signup-email"
                type="email"
                autoComplete="email"
                invalid={!!errors.email}
                {...register("email")}
              />
            </Field>

            <Field
              label="パスワード"
              htmlFor="signup-password"
              errorMessage={errors.password?.message}
            >
              <Input
                id="signup-password"
                type="password"
                autoComplete="new-password"
                invalid={!!errors.password}
                {...register("password")}
              />
            </Field>

            <Field
              label="パスワード（確認）"
              htmlFor="signup-password-confirmation"
              errorMessage={errors.passwordConfirmation?.message}
            >
              <Input
                id="signup-password-confirmation"
                type="password"
                autoComplete="new-password"
                invalid={!!errors.passwordConfirmation}
                {...register("passwordConfirmation")}
              />
            </Field>

            <Button
              type="submit"
              variant="primary"
              size="wide"
              loading={isMutating}
              disabled={isMutating}
            >
              アカウント作成
            </Button>
          </form>

          <div className="flex justify-center">
            <Link
              to="/login"
              className="font-mono text-sm text-foreground underline underline-offset-4 hover:text-accent"
            >
              既にアカウントをお持ちの方はこちら
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
