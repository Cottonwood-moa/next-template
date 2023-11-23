import MainLayout from '@/components/layouts/MainLayout';
import commonUtil from '@/utils/commonUtil';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { useRouter } from 'next/router';

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
      <div className="h-[100vh] w-[100vw]">
        <span>{id}</span>
        <button type="button" className="btn" onClick={onClickRandomPost}>
          랜덤 포스트
        </button>
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
