import { Variants } from 'framer-motion';

export const animateDrawer: Variants = {
  initial: {
    x: 600,
    opacity: 0.25,
  },
  animate: {
    x: 0,
    opacity: 1,
  },
  exit: {
    x: 600,
    opacity: 0,
  },
};
