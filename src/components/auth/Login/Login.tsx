import { useEffect, type FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Field } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useCurrentUser } from "@/features/shared/hooks/useCurrentUser";
import { useLogin } from "./useLogin";

export const Login: FC = () => {
  const navigate = useNavigate();
  const { isLoggedIn, hasProfile, isLoading } = useCurrentUser();
  const { register, handleSubmit, onSubmit, errors, isMutating } = useLogin();

  useEffect(() => {
    if (isLoading || !isLoggedIn) return;
    navigate(hasProfile ? "/" : "/profile/new", { replace: true });
  }, [isLoading, isLoggedIn, hasProfile, navigate]);

  return (
    <div className="flex min-h-svh items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardContent className="flex flex-col gap-6 p-8">
          <div className="flex flex-col items-center gap-2">
            <h1 className="font-display text-lg uppercase tracking-widest">
              Tech Space
            </h1>
            <p className="font-mono text-sm text-muted-foreground">
              ログイン画面
            </p>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-4"
          >
            <Field
              label="メールアドレス"
              htmlFor="login-email"
              errorMessage={errors.email?.message}
            >
              <Input
                id="login-email"
                type="email"
                autoComplete="email"
                invalid={!!errors.email}
                {...register("email")}
              />
            </Field>

            <Field
              label="パスワード"
              htmlFor="login-password"
              errorMessage={errors.password?.message}
            >
              <Input
                id="login-password"
                type="password"
                autoComplete="current-password"
                invalid={!!errors.password}
                {...register("password")}
              />
            </Field>

            <Button
              type="submit"
              variant="primary"
              size="wide"
              loading={isMutating}
              disabled={isMutating}
            >
              ログイン
            </Button>
          </form>

          <div className="flex justify-center">
            <Link
              to="/signup"
              className="font-mono text-sm text-foreground underline underline-offset-4 hover:text-accent"
            >
              アカウント作成はこちら
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
