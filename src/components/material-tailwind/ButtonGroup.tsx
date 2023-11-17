import {
  ButtonGroup as MuiButtonGroup,
  ButtonGroupProps,
} from '@material-tailwind/react';

export default function ButtonGroup({
  variant,
  size,
  color,
  fullWidth,
  ripple,
  className,
  children,
}: ButtonGroupProps) {
  return (
    <MuiButtonGroup
      variant={variant}
      size={size}
      color={color}
      fullWidth={fullWidth}
      ripple={ripple}
      className={className}
    >
      {children}
    </MuiButtonGroup>
  );
}
