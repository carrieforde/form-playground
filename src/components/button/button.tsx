import * as React from "react";

import s from "./button.module.css";
import cn from "classnames";

export type ButtonProps = {
  color?: "default" | "primary" | "error";
  variant?: "filled" | "outline" | "text";
} & React.HTMLProps<HTMLButtonElement>;

export const Button = React.forwardRef<
  HTMLButtonElement,
  React.PropsWithChildren<ButtonProps>
>(({ children, color = "default", variant = "text", ...props }, ref) => {
  const buttonClasses = cn("button", s.button, s[variant], s[color]);

  return (
    <button {...props} className={buttonClasses} ref={ref}>
      {children}
    </button>
  );
});

export default Button;
