import { alertFireSelector, alertStore } from '@/atom/atom';
import Dialog from '@/components/common/Dialog';
import MainLayout from '@/components/layouts/MainLayout';
import commonUtil from '@/utils/commonUtil';
import { NextPage } from 'next';
import { useRef } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

const Template: NextPage = () => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [alert, setAlert] = useRecoilState(alertStore);
  const alertFire = useSetRecoilState(alertFireSelector);
  const addTest = () => {
    alertFire([
      {
        message: `${commonUtil.getRandomEmoji()}동해물과 백두산이 마르고 삼천이 보전하세.`,
        life: 2000,
      },
    ]);
  };
  const removeTest = () => {
    const removedTest = alert.slice(1);
    setAlert(removedTest);
  };
  return (
    <MainLayout>
      <div className="h-full min-h-[100vh] w-full overflow-y-auto">
        <button
          type="button"
          className="btn font-gugi"
          onClick={() => dialogRef?.current?.showModal()}
        >
          open modal
        </button>
        <button type="button" className="btn" onClick={addTest}>
          추가
        </button>
        <button type="button" className="btn" onClick={removeTest}>
          삭제
        </button>
        <Dialog ref={dialogRef} header="Dialog">
          테스트
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default Template;
