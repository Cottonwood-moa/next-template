import '@/styles/globals.scss';
import type { AppProps } from 'next/app';
import { ThemeProvider } from '@material-tailwind/react';
import { RecoilRoot } from 'recoil';

export default function App({ Component, pageProps }: AppProps) {
  console.log('husky');
  return (
    <RecoilRoot>
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </RecoilRoot>
  );
}
