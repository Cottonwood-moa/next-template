import Dialog from '@/components/common/Dialog';
import { NextPage } from 'next';
import { useRef } from 'react';

const Template: NextPage = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  return (
    <div className="h-[100vh] w-[100vw]">
      <button
        type="button"
        className="btn"
        onClick={() => dialogRef?.current?.showModal()}
      >
        open modal
      </button>
      <Dialog ref={dialogRef} header="Dialog">
        테스트
      </Dialog>
    </div>
  );
};

export default Template;
