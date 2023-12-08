import MainLayout from '@/components/layouts/MainLayout';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { motion } from 'framer-motion';
import { useScroll } from '@react-hooks-library/core';
import { useEffect, useRef, useState } from 'react';
import PostHeader from '@/components/headers/PostHeader';
import { useGetMockPostDetail } from '@/services/mockPostService';
import { useSetRecoilState } from 'recoil';
import { loadingStore } from '@/atom/atom';

interface PostProps {
  id: string;
}
export default function Post({ id }: PostProps) {
  /* Loading */
  const setLoading = useSetRecoilState(loadingStore);
  const pageRef = useRef();
  const [_scroll, setScroll] = useState({ y: 0 });
  useScroll(pageRef, ({ scrollY }) => setScroll({ y: scrollY }));
  const { data, isLoading } = useGetMockPostDetail({ id });

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

  /**
   * @description SWR loading <-> page loading 추적.
   */
  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  return (
    <MainLayout
      postHeader={
        data && <PostHeader currentPost={{ id, title: data.title as string }} />
      }
    >
      <div className="flex h-[100vh] w-full justify-center overflow-y-auto px-40 pb-[200px] pt-12">
        {data && (
          <motion.div
            ref={pageRef}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-[2000px]"
          >
            <div>
              <div>{data.title}</div>
              <div>{data.body}</div>
            </div>
          </motion.div>
        )}
      </div>
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
