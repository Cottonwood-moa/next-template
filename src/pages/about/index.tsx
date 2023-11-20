import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const About: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('하이킥 router', router);
  }, [router]);
  return <div className="text-red-500">About test</div>;
};

export default About;
