import MainLayout from '@/components/layouts/MainLayout';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { motion } from 'framer-motion';
import { useScroll } from '@react-hooks-library/core';
import { ReactElement, useEffect, useRef, useState } from 'react';
import PostHeader from '@/components/headers/PostHeader';
import commonUtil from '@/utils/commonUtil';
import { useRecoilState } from 'recoil';
import { visitedPostAtom } from '@/atom/postAtom';
import { PostProps } from '@@/pages/post/post.model';

export default function PostDetailPage({ id, title, body }: PostProps) {
  const [visitedPostList, setVisitedPostList] = useRecoilState(visitedPostAtom);
  const pageRef = useRef();
  const [_scroll, setScroll] = useState({ y: 0 });
  useScroll(pageRef, ({ scrollY }) => setScroll({ y: scrollY }));

  useEffect(() => {
    if (!id) return;
    const checkExist = visitedPostList.some((post) => post.id === id);
    if (!checkExist) {
      setVisitedPostList((prev) => [...prev, { id, title }]);
    }
  }, [id]);
  // -translate - y - 14;
  return (
    <motion.div>
      <PostHeader currentPostId={id} />
      <div
        ref={pageRef}
        className="relative z-10 flex h-[calc(100vh-100px)] w-full -translate-y-4 transform flex-col items-center overflow-y-auto bg-base-100 px-48 pb-48 pt-24"
      >
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: -14 }}
          className="bg-base-100"
        >
          <div>{title}</div>
          <div>{body}</div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export const getStaticPaths: GetStaticPaths = () => ({
  paths: [],
  fallback: true,
});

export const getStaticProps: GetStaticProps = async (
  ctx: GetStaticPropsContext,
) => {
  console.log('하이킥 ctx', ctx);
  return {
    props: {
      id: ctx.params?.id,
      title: commonUtil.randomString(40),
      body: `.`,
    },
    revalidate: 10,
  };
};

PostDetailPage.getLayout = function getLayout(page: ReactElement) {
  return <MainLayout>{page}</MainLayout>;
};
