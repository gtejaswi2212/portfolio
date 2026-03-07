import { motion, useReducedMotion } from 'framer-motion';

const tinyDots = Array.from({ length: 28 }).map((_, i) => ({
  id: i,
  left: `${(i * 17) % 100}%`,
  top: `${(i * 29) % 100}%`,
  delay: (i % 8) * 0.25,
}));

export function BackgroundEffects() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_25%,rgba(45,212,191,0.16),transparent_42%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.14),transparent_38%),radial-gradient(circle_at_55%_80%,rgba(56,189,248,0.1),transparent_44%)] dark:bg-[radial-gradient(circle_at_20%_25%,rgba(45,212,191,0.15),transparent_42%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,0.14),transparent_38%),radial-gradient(circle_at_55%_80%,rgba(56,189,248,0.1),transparent_44%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] bg-[size:28px_28px] opacity-40 dark:opacity-30" />

      {tinyDots.map((dot) => (
        <motion.span
          key={dot.id}
          className="absolute h-[3px] w-[3px] rounded-full bg-primary/40"
          style={{ left: dot.left, top: dot.top }}
          animate={
            reduceMotion
              ? undefined
              : {
                  opacity: [0.25, 0.8, 0.25],
                  scale: [1, 1.5, 1],
                }
          }
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 2.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: dot.delay,
                }
          }
        />
      ))}
    </div>
  );
}
