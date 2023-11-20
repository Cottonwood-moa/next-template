import Image from 'next/image';
import { Inter } from 'next/font/google';
import Button from '@/components/material-tailwind/Button';
import ButtonGroup from '@/components/material-tailwind/ButtonGroup';
import Pagination from '@/components/material-tailwind/Pagination';
import Breadcrumbs from '@/components/material-tailwind/Breadcrumbs';
import { useEffect, useState } from 'react';
import Avatar from '@/components/material-tailwind/Avatar';
import { size as avatarSize } from '@material-tailwind/react/types/components/avatar';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  /* paginator */
  const [active, setActive] = useState(1);
  const [pageData, setPageData] = useState<{ data: unknown[]; total: number }>({
    data: [],
    total: 0,
  });
  const mockFetch = () => {
    setPageData({ data: [1, 2, 3, 4, 5], total: 10 });
  };

  useEffect(() => {
    mockFetch();
  }, []);

  /* breadCrumbs */
  const breadCrumbs = [
    {
      url: '/',
      label: 'Home',
    },
    {
      url: '/about',
      label: 'About',
    },
  ];
  /* Avatar */
  const avatar = {
    src: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80',
    alt: 'avatar',
    size: 'sm' as avatarSize,
  };
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Avatar avatar={avatar} />
      <Breadcrumbs link={breadCrumbs} />
      <Button>테스트</Button>
      <ButtonGroup>
        <Button>테스트</Button>
        <Button>테스트</Button>
        <Button>테스트</Button>
        <Button>테스트</Button>
      </ButtonGroup>

      <Pagination
        total={pageData.total}
        active={active}
        setActive={setActive}
      />

      <div className="font-mono z-10 w-full max-w-5xl items-center justify-between text-sm lg:flex">
        <p className="from-zinc-200 dark:border-neutral-800 dark:bg-zinc-800/30 lg:dark:bg-zinc-800/30 fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b pb-6 pt-8 backdrop-blur-2xl dark:from-inherit lg:static  lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4">
          Get started by editing&nbsp;
          <code className="font-mono font-bold">src/pages/index.tsx</code>
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </div>

      <div className="after:from-sky-200 after:dark:from-sky-900 relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700/10 after:dark:via-[#0141ff]/40 before:lg:h-[360px]">
        <Image
          className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
          src="/next.svg"
          alt="Next.js Logo"
          width={180}
          height={37}
          priority
        />
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:w-full lg:max-w-5xl lg:grid-cols-4 lg:text-left">
        <a
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          className="hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Docs{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Find in-depth information about Next.js features and API.
          </p>
        </a>

        <a
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          className="hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Learn{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Learn about Next.js in an interactive course with&nbsp;quizzes!
          </p>
        </a>

        <a
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          className="hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Templates{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Discover and deploy boilerplate example Next.js&nbsp;projects.
          </p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template-tw&utm_campaign=create-next-app"
          className="hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100"
          target="_blank"
          rel="noopener noreferrer"
        >
          <h2 className="mb-3 text-2xl font-semibold">
            Deploy{' '}
            <span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
              -&gt;
            </span>
          </h2>
          <p className="m-0 max-w-[30ch] text-sm opacity-50">
            Instantly deploy your Next.js site to a shareable URL with Vercel.
          </p>
        </a>
      </div>
    </main>
  );
}
