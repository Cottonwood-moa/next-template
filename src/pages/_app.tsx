import useLocalStorageWithSync from '@/hooks/useLocalStorageWithSync';
import '@/styles/globals.scss';
import '@fontsource/gugi';
import '@fontsource/noto-sans-kr';
import { AnimatePresence } from 'framer-motion';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { ReactElement, ReactNode } from 'react';
import { RecoilRoot } from 'recoil';
import { SWRConfig } from 'swr';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const [value, _setValue] = useLocalStorageWithSync('theme');
  const getLayout = Component.getLayout ?? ((page) => page);

  // mode -> 'popLayout', 'wait', 'sync'
  return (
    <SWRConfig>
      <RecoilRoot>
        <div data-theme={value || 'light'}>
          <AnimatePresence mode="wait">
            {getLayout(<Component {...pageProps} key={router.asPath} />)}
          </AnimatePresence>
        </div>
      </RecoilRoot>
    </SWRConfig>
  );
}
