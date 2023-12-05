import MainLayout from '@/components/layouts/MainLayout';
import commonUtil from '@/utils/commonUtil';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useScroll } from '@react-hooks-library/core';
import { useEffect, useRef, useState } from 'react';

interface PostProps {
  id: number;
}
export default function Post({ id }: PostProps) {
  const router = useRouter();
  const pageRef = useRef();

  const [scroll, setScroll] = useState({ y: 0 });

  useScroll(pageRef, ({ scrollY }) => setScroll({ y: scrollY }));

  const onClickRandomPost = () => {
    router.push(`/post/${commonUtil.randomNumber(1)}`);
  };
  
  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        className="h-[100vh] w-[100vw] overflow-y-auto"
      >
        <div ref={pageRef} className='h-[200vh]'>{id}</div>
        <button type="button" className="btn" onClick={onClickRandomPost}>
          랜덤 포스트
        </button>
      </motion.div>
    </MainLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async (
  ctx: GetServerSidePropsContext,
) => ({
  props: {
    id: ctx.params?.id,
  },
});
