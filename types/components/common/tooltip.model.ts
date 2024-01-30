export interface TooltipProps {
  message: JSX.Element | React.ReactNode | string;
  children: React.ReactNode;
  type?: 'dark' | 'light' | 'success' | 'warning' | 'info' | 'error';
  direction?: 'top' | 'right' | 'left' | 'bottom';
  effect?: 'solid' | 'float';
}