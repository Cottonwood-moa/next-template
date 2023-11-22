import useLocalStorageWithSync from '@/hooks/useLocalStorageWithSync';
import '@/styles/globals.scss';
import '@fontsource/gugi';
import '@fontsource/noto-sans-kr';
import { AnimatePresence } from 'framer-motion';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { RecoilRoot } from 'recoil';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const [value, _setValue] = useLocalStorageWithSync('theme');
  return (
    <RecoilRoot>
      <div data-theme={value}>
        <AnimatePresence mode="wait" initial={false}>
          <Component {...pageProps} key={router.asPath} />
        </AnimatePresence>
      </div>
    </RecoilRoot>
  );
}
