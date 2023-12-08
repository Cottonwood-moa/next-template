import MainLayout from '@/components/layouts/MainLayout';
import commonUtil from '@/utils/commonUtil';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import { useScroll } from '@react-hooks-library/core';
import { useEffect, useRef, useState } from 'react';
import PostHeader from '@/components/headers/PostHeader';

interface PostProps {
  id: number;
}
export default function Post({ id }: PostProps) {
  const router = useRouter();
  const pageRef = useRef();
  const [_scroll, setScroll] = useState({ y: 0 });
  useScroll(pageRef, ({ scrollY }) => setScroll({ y: scrollY }));

  /* 진입 시 localStorage에 해당 post id 저장 */
  useEffect(() => {
    const getPosts = JSON.parse(localStorage.getItem('visitedPosts')) ?? [];
    const checkExist = getPosts.some((post) => post.id === id);
    if (!checkExist) {
      localStorage.setItem(
        'visitedPosts',
        JSON.stringify([...getPosts, { id }]),
      );
    }
  }, []);

  const onClickRandomPost = () => {
    router.push(`/post/${commonUtil.randomNumber(1)}`);
  };

  return (
    <MainLayout postHeader={<PostHeader />}>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        className="h-[100vh] w-[100vw] overflow-y-auto"
      >
        <div ref={pageRef} className="h-[200vh]">
          <button type="button" className="btn" onClick={onClickRandomPost}>
            랜덤 포스트
          </button>
          {id}
        </div>
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
