import MainLayout from '@/components/layouts/MainLayout';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';

interface PostProps {
  id: number;
}
export default function Post({ id }: PostProps) {
  return (
    <MainLayout>
      <div className="h-[100vh] w-[100vw]">{id}</div>
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
