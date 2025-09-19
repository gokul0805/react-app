import { motion } from 'framer-motion';

const ScrollFadeIn = ({ children, delay = 0, duration = 0.6, y = 30 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration, delay }}
    >
      {children}
    </motion.div>
  );
};

export default ScrollFadeIn;