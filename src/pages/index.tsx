import MainLayout from '@/components/layouts/MainLayout';
import PageTransition from '@/components/layouts/PageTransition';
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  const handleClick = () => {
    router.push('/template');
  };
  return (
    <MainLayout>
      <PageTransition>
        <div className="h-full min-h-[100vh] w-full overflow-y-auto">
          {process.env.NEXT_PUBLIC_TAG}
          <button type="button" className="btn" onClick={handleClick}>
            template
          </button>
        </div>
      </PageTransition>
    </MainLayout>
  );
}
