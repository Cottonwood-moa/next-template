import MainLayout from '@/components/layouts/MainLayout';
import PageTransition from '@/components/layouts/PageTransition';
import commonUtil from '@/utils/commonUtil';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

interface PostProps {
  id: number;
}
export default function Post({ id }: PostProps) {
  const router = useRouter();
  const onClickRandomPost = () => {
    router.push(`/post/${commonUtil.randomNumber(1)}`);
  };
  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        className="h-[100vh] w-[100vw]"
      >
        <span>{id}</span>
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
