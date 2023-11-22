import { alertFireSelector, loadingStore } from '@/atom/atom';
import Dialog from '@/components/common/Dialog';
import MainLayout from '@/components/layouts/MainLayout';
import commonUtil from '@/utils/commonUtil';
import { NextPage } from 'next';
import { useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { useRouter } from 'next/router';
import { AnimatePresence, motion } from 'framer-motion';
import PageTransition from '@/components/layouts/PageTransition';

const Template: NextPage = () => {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const setLoading = useSetRecoilState(loadingStore);
  const alertFire = useSetRecoilState(alertFireSelector);
  const addTest = () => {
    alertFire([
      {
        message: `${commonUtil.getRandomEmoji()}동해물과 백두산이 마르고 삼천이 보전하세.`,
        life: 2000,
      },
    ]);
  };
  const handleClick = () => {
    router.push('/');
  };

  return (
    <MainLayout>
      <PageTransition>
        <div className="flex h-full min-h-[100vh] w-full gap-2 overflow-y-auto">
          <button type="button" className="btn" onClick={handleClick}>
            /
          </button>
          <button
            type="button"
            className="btn font-gugi"
            onClick={() => dialogRef?.current?.showModal()}
          >
            open modal
          </button>
          <button type="button" className="btn" onClick={addTest}>
            Alert 추가
          </button>
          <button
            type="button"
            className="btn"
            onClick={() => {
              setLoading(true);
              setTimeout(() => {
                setLoading(false);
              }, 2000);
            }}
          >
            Loading on/off
          </button>
          <Dialog ref={dialogRef} header="Dialog">
            테스트
          </Dialog>
        </div>
      </PageTransition>
    </MainLayout>
  );
};

export default Template;
