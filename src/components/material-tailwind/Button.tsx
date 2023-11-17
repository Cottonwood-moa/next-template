import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from '@material-tailwind/react';

interface ButtonProps extends MuiButtonProps {
  // do extends
}

export default function Button({
  variant,
  size,
  color,
  fullWidth,
  ripple,
  className,
  children,
}: ButtonProps) {
  return (
    <MuiButton
      variant={variant}
      size={size}
      color={color}
      fullWidth={fullWidth}
      ripple={ripple}
      className={className}
    >
      {children}
    </MuiButton>
  );
}
