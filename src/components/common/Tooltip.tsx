import { motion } from 'framer-motion';
import { useState } from 'react';

interface TooltipProps {
  children: React.ReactNode;
  direction: string;
}

export default function Tooltip({ children, direction }: TooltipProps) {
  const [isHover, setIsHover] = useState(false);
  const onMouseEnter = () => {
    setIsHover(true);
  };

  const onMouseOut = () => {
    setIsHover(false);
  };

  return (
    <div className="relative h-fit w-fit">
      {isHover && (
        <motion.div className="absolute left-0 right-0 top-[-100px] m-auto h-[100px] w-[100px] rounded-md bg-slate-400">
          테스트
        </motion.div>
      )}
      <div
        className="h-fit w-fit bg-red-200"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseOut}
      >
        {children}
      </div>
    </div>
  );
}
