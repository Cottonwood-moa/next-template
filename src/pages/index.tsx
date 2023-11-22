import MainLayout from '@/components/layouts/MainLayout';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const handleClick = () => {
    router.push('/template');
  };
  return (
    <MainLayout>
      <div className="h-full min-h-[100vh] w-full overflow-y-auto">
        {process.env.NEXT_PUBLIC_TAG}
        <button type="button" className="btn" onClick={handleClick}>
          template
        </button>
      </div>
    </MainLayout>
  );
}
