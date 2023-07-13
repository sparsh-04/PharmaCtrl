import { Button, SxProps, Theme } from "@mui/material";
import React from "react";

function AppButton({
  btnText,
  variant,
  color,
  type,
  onClick,
  className,
  size,
  startIcon,
  disabled,
  fullWidth,
  autoFocus,
  children,
  sx,
  ...rest
}: {
  btnText: string;
  variant?: "text" | "outlined" | "contained";
  color?: "primary" | "secondary" | "success" | "warning" | "error";
  type?: any;
  onClick?: any;
  className?: string;
  size?: any;
  startIcon?: any;
  disabled?: boolean;
  fullWidth?: boolean;
  autoFocus?: boolean;
  children?: React.ReactNode;
  sx?: SxProps<Theme>;
}) {
  return (
    <Button
      size={size || "medium"}
      startIcon={startIcon || ""}
      disabled={disabled}
      type={type || "button"}
      onClick={onClick}
      fullWidth={fullWidth}
      variant={variant || "text"}
      color={color || "primary"}
      className={className}
      autoFocus={autoFocus}
      sx={sx}
      {...rest}
    >
      {children}
      {btnText}
    </Button>
  );
}

export default AppButton;
