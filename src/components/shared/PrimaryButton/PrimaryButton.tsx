import type { ComponentProps, CSSProperties, FC } from "react";
import { Button } from "smarthr-ui";

const BG = "#1f2328";
const BG_HOVER = "#2c3137";
const TEXT = "#ffffff";

type Props = Omit<ComponentProps<typeof Button>, "variant">;

export const PrimaryButton: FC<Props> = ({
  style,
  onMouseEnter,
  onMouseLeave,
  ...rest
}) => {
  return (
    <Button
      {...rest}
      variant="primary"
      style={{ ...buttonStyle, ...style }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = BG_HOVER;
        onMouseEnter?.(e);
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = BG;
        onMouseLeave?.(e);
      }}
    />
  );
};

const buttonStyle: CSSProperties = {
  backgroundColor: BG,
  borderColor: BG,
  color: TEXT,
};
