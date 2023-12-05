import useLocalStorageWithSync from '@/hooks/useLocalStorageWithSync';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import MainHeader, { DaisyUiTheme } from '../headers/MainHeader';
import Alert from '../common/Alert';
import PageLoading from '../common/PageLoading';

interface MainLayoutProps {
  children: React.ReactNode;
  side?: React.ReactNode;
}
export default function MainLayout({ children, side }: MainLayoutProps) {
  const [theme, setTheme] = useLocalStorageWithSync('theme');
  return (
    <div className="w-full bg-base-100">
      <PageLoading />
      <MainHeader
        theme={theme || 'light'}
        setTheme={(newTheme: DaisyUiTheme) => setTheme(newTheme)}
      />
      <motion.div layout className={twMerge('relative w-full')}>
        {side && side}
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: side ? 100 : 0 }}
          className={twMerge(side ? 'w-[calc(100%-100px)]' : 'w-full')}
        >
          {children}
        </motion.div>
      </motion.div>
      <Alert />
    </div>
  );
}
