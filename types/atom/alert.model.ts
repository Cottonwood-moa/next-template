export interface AlertProps {
  id?: string;
  message: string;
  life?: number;
  type: 'info' | 'success' | 'warning' | 'error';
}