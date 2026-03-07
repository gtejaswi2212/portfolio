import { motion, useReducedMotion } from 'framer-motion';

export function Edge({ id, path, intensity, highlighted }) {
  const reduceMotion = useReducedMotion();
  const baseOpacity = 0.15 + intensity * 0.45;
  const glowOpacity = highlighted ? 0.9 : 0.45 + intensity * 0.35;

  return (
    <g>
      <path d={path} fill="none" stroke="currentColor" strokeOpacity={baseOpacity} strokeWidth="1.2" className="text-primary/65" />
      <motion.path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeWidth={highlighted ? 1.8 : 1.5}
        strokeOpacity={glowOpacity}
        strokeLinecap="round"
        className="text-cyan-400/90"
        strokeDasharray="7 10"
        animate={
          reduceMotion
            ? undefined
            : {
                strokeDashoffset: [0, -34],
                opacity: highlighted ? [0.55, 1, 0.55] : [0.3, 0.75, 0.3],
              }
        }
        transition={
          reduceMotion
            ? undefined
            : {
                duration: highlighted ? 1.2 : 2.1,
                repeat: Infinity,
                ease: 'linear',
                delay: (id % 6) * 0.1,
              }
        }
      />
    </g>
  );
}
