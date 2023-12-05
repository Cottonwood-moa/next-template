import { motion } from 'framer-motion';

export default function SideMenu() {
  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{
        ease: 'easeOut',
      }}
      className="fixed z-10 h-full w-[100px] bg-black text-white"
    />
  );
}
