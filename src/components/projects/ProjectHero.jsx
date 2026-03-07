import { motion } from 'framer-motion';

export function ProjectHero({ title, description }) {
  return (
    <section className="container-shell py-20">
      <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-semibold sm:text-5xl">
        {title}
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="mt-4 max-w-3xl text-lg text-muted-foreground"
      >
        {description}
      </motion.p>
    </section>
  );
}
