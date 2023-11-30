import { motion } from 'framer-motion';

export default function SideMenu() {
  return (
    <motion.div
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      exit={{ x: -100 }}
      transition={{
        ease: 'easeOut',
      }}
      className="absolute h-full w-[100px] bg-black text-white"
    >
      <div>테스트1</div>
      <div>테스트1</div>
      <div>테스트1</div>
      <div>테스트1</div>
      <div>테스트1</div>
      <div>테스트1</div>
      <div>테스트1</div>
      <div>테스트1</div>
    </motion.div>
  );
}
