export interface DialogProps {
  header?: string;
  children?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  className?: string;
  confirmEvent?: () => void;
  cancelEvent?: () => void;
}
