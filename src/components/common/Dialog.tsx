import React, { forwardRef, ForwardedRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface DialogProps {
  header?: string;
  children?: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  className?: string;
  confirmEvent?: () => void;
  cancelEvent?: () => void;
}

const Dialog = forwardRef(
  (
    {
      header,
      children,
      confirmLabel = '확인',
      cancelLabel = '취소',
      className,
      confirmEvent = () => {},
      cancelEvent = () => {},
    }: DialogProps,
    ref: ForwardedRef<HTMLDialogElement>,
  ) => (
    <dialog ref={ref} className="modal">
      <div className={twMerge('modal-box', className)}>
        <h3 className="text-lg font-bold">{header}</h3>
        <div className="py-4">{children}</div>
        <div className="modal-action">
          <form method="dialog">
            <button
              type="submit"
              className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
            >
              ✕
            </button>
            <button type="submit" className="btn" onClick={cancelEvent}>
              {cancelLabel}
            </button>
            <button type="submit" className="btn ml-2" onClick={confirmEvent}>
              {confirmLabel}
            </button>
          </form>
        </div>
      </div>
    </dialog>
  ),
);

export default Dialog;
