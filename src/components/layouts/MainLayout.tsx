import useLocalStorageWithSync from '@/hooks/useLocalStorageWithSync';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';
import MainHeader, { DaisyUiTheme } from '../headers/MainHeader';
import Alert from '../common/Alert';
import PageLoading from '../common/PageLoading';

interface MainLayoutProps {
  children: React.ReactNode;
  sideBar?: React.ReactNode;
  postHeader?: React.ReactNode;
}
export default function MainLayout({ children, sideBar, postHeader }: MainLayoutProps) {
  const [theme, setTheme] = useLocalStorageWithSync('theme');
  return (
    <div className="w-full bg-base-100">
      <PageLoading />
      {/* main header (고정) */}
      <MainHeader
        theme={theme || 'light'}
        setTheme={(newTheme: DaisyUiTheme) => setTheme(newTheme)}
      />
      {/* post header (prop) */}
      {postHeader && postHeader}
      <motion.div layout className={twMerge('relative w-full')}>
        {/* side menu (prop) */}
        {sideBar && sideBar}
        {/* main children (slot) */}
        <motion.div
          initial={{ x: 0 }}
          animate={{ x: sideBar ? 100 : 0 }}
          className={twMerge(sideBar ? 'w-[calc(100%-100px)]' : 'w-full')}
        >
          {children}
        </motion.div>
      </motion.div>
      <Alert />
    </div>
  );
}
