import { motion } from 'framer-motion';

export function PageWrapper({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.32, ease: 'easeOut' }}
      className="relative"
    >
      {children}
    </motion.main>
  );
}
