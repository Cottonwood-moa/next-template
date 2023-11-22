import { AnimatePresence, motion } from 'framer-motion';
import { loadingStore } from '@/atom/atom';
import { useRecoilValue } from 'recoil';

export default function PageLoading() {
  const loading = useRecoilValue(loadingStore);
  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed z-10 flex h-[100vh] w-[100vw] items-center justify-center bg-black bg-opacity-20"
        >
          <span className="loading loading-ring w-16" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
