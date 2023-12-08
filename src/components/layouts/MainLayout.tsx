import useLocalStorageWithSync from '@/hooks/useLocalStorageWithSync';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import { useEffect, useState } from 'react';
import MainHeader, { DaisyUiTheme } from '../headers/MainHeader';
import Alert from '../common/Alert';
import PageLoading from '../common/PageLoading';

interface MainLayoutProps {
  children: React.ReactNode;
}
export default function MainLayout({ children }: MainLayoutProps) {
  const [theme, setTheme] = useLocalStorageWithSync('theme');
  /* side menu visible */
  const [_sideMenuVisible, setSideMenuVisible] = useState(false);

  /**
   * @description side menu handler
   */
  const keydownHandler = (e: KeyboardEvent) => {
    if (e.key === 'b' && e.ctrlKey) {
      setSideMenuVisible((prev) => !prev);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', keydownHandler);
    return () => {
      document.removeEventListener('keydown', keydownHandler);
    };
  }, []);
  return (
    <div className="w-full bg-base-100">
      <PageLoading />
      {/* main header (고정) */}
      <MainHeader
        theme={theme || 'light'}
        setTheme={(newTheme: DaisyUiTheme) => setTheme(newTheme)}
      />
      <motion.div layout className={twMerge('relative w-full')}>
        {/* main children (slot) */}
        <motion.div className={twMerge('w-full')}>{children}</motion.div>
      </motion.div>
      <Alert />
    </div>
  );
}
