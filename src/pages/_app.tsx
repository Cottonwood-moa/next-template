import useLocalStorageWithSync from '@/hooks/useLocalStorageWithSync';
import '@/styles/globals.scss';
import '@fontsource/gugi';
import '@fontsource/noto-sans-kr';
import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { RecoilRoot } from 'recoil';
import { SWRConfig } from 'swr';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [value, _setValue] = useLocalStorageWithSync('theme');
  // mode -> 'popLayout', 'wait', 'sync'
  return (
    <SWRConfig>
      <RecoilRoot>
        <div data-theme={value || 'light'}>
          <AnimatePresence mode="wait">
            <Component {...pageProps} key={router.asPath} />
          </AnimatePresence>
        </div>
      </RecoilRoot>
    </SWRConfig>
  );
}
