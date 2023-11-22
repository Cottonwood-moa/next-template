import useLocalStorageWithSync from '@/hooks/useLocalStorageWithSync';
import { motion } from 'framer-motion';
import MainHeader from '../headers/MainHeader';
import Alert from '../common/Alert';
import PageLoading from '../common/PageLoading';

interface MainLayoutProps {
  children: React.ReactNode;
}
export default function MainLayout({ children }: MainLayoutProps) {
  const [theme, setTheme] = useLocalStorageWithSync('theme');

  const setThemeFn = (newTheme: string) => {
    setTheme(newTheme);
    console.log('하이킥');
  };

  return (
    <>
      <PageLoading />
      <MainHeader theme={theme} setTheme={setThemeFn} />
      <motion.div
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 300, opacity: 0 }}
        transition={{
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}
        className="h-full overflow-y-auto p-4"
      >
        {children}
      </motion.div>
      <Alert />
    </>
  );
}
