import { Variants } from 'framer-motion';

export const AnimateInputVariants: Variants = {
  initial: {
    scale: 1,
    rotate: 0,
  },
  error: {
    scale: [0.8, 1.25, 1],
    rotate: [5, 0, -5, 0],
  },
};
