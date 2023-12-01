import { motion } from 'framer-motion';

export default function SideMenu() {
  return (
    <div className="absolute h-full w-[100px] bg-base-100">
      <motion.div
        initial={{ x: -100 }}
        animate={{ x: 0 }}
        exit={{ x: -100 }}
        transition={{
          ease: 'easeOut',
        }}
        className="absolute h-full w-[100px] bg-black text-white"
      />
    </div>
  );
}
