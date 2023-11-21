import Dialog from '@/components/common/Dialog';
import MainLayout from '@/components/layouts/MainLayout';
import { NextPage } from 'next';
import { useRef } from 'react';

const Template: NextPage = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  return (
    <MainLayout>
      <div className="h-full min-h-[100vh] w-full">
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
    </MainLayout>
  );
};

export default Template;
