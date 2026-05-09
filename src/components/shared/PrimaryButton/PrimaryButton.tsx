import type { FC } from "react";
import { Button, type ButtonProps } from "@/components/ui/button";

type Props = Omit<ButtonProps, "variant">;

export const PrimaryButton: FC<Props> = (props) => {
  return <Button variant="primary" {...props} />;
};
