import useLocalStorageWithSync from '@/hooks/useLocalStorageWithSync';
import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import { RecoilRoot } from 'recoil';

export default function App({ Component, pageProps }: AppProps) {
  const [value, _setValue] = useLocalStorageWithSync('theme');
  useEffect(() => {}, [value]);
  return (
    <RecoilRoot>
      <div data-theme={value}>
        <Component {...pageProps} />
      </div>
    </RecoilRoot>
  );
}
