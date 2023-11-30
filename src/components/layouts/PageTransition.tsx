import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';

type PageTransitionProps = HTMLMotionProps<'div'>;

function PageTransition({ children, ...rest }: PageTransitionProps) {
  const variant = {
    initial: { x: 300, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: 300, opacity: 0 },
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
      delay: 0.2,
    },
  };

  const variant2 = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0, opacity: 0 },
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
    },
  };

  return (
    <motion.div {...variant} {...rest}>
      {children}
    </motion.div>
  );
}

export default PageTransition;
