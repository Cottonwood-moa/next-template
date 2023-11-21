import MainLayout from '@/components/layouts/MainLayout';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const About: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('하이킥 router', router);
  }, [router]);
  return (
    <MainLayout>
      <div className="h-[100vh] w-[100vw]" />
    </MainLayout>
  );
};

export default About;
