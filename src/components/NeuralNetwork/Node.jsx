import { motion, useReducedMotion } from 'framer-motion';

export function Node({ node, position, proximity, hovered, connected, onHover, onLeave, parallax }) {
  const reduceMotion = useReducedMotion();
  const glowStrength = hovered ? 0.95 : connected ? 0.72 : 0.35 + proximity * 0.45;
  const scale = hovered ? 1.13 : 1 + proximity * 0.06;

  return (
    <motion.button
      type="button"
      onMouseEnter={() => onHover(node.id)}
      onMouseLeave={onLeave}
      className="cursor-card absolute z-20 rounded-2xl border border-primary/30 px-3 py-2 text-xs font-medium text-foreground backdrop-blur-md transition-colors"
      style={{
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
        background:
          'linear-gradient(145deg, rgba(255,255,255,0.12), rgba(148,163,184,0.06))',
        boxShadow: `0 10px 30px -18px rgba(15, 23, 42, 0.55), 0 0 ${10 + glowStrength * 20}px rgba(45,212,191,${0.12 + glowStrength * 0.25})`,
      }}
      animate={
        reduceMotion
          ? {
              x: 0,
              y: 0,
              scale,
            }
          : {
              x: [0, 3 + node.depth * 2, 0, -2 - node.depth * 2, 0],
              y: [0, -3 - node.depth * 2, 0, 2 + node.depth * 2, 0],
              scale,
            }
      }
      transition={
        reduceMotion
          ? { duration: 0.2 }
          : {
              duration: 6 + node.depth * 3,
              repeat: Infinity,
              ease: 'easeInOut',
            }
      }
      whileHover={{ scale: 1.15 }}
      aria-label={node.label}
    >
      <span
        className="pointer-events-none absolute inset-0 rounded-2xl"
        style={{
          background: `radial-gradient(circle at 50% 50%, rgba(45,212,191,${0.07 + glowStrength * 0.22}), transparent 70%)`,
          opacity: hovered || connected ? 1 : 0.6,
        }}
      />

      <motion.span
        className="relative z-10 block whitespace-nowrap"
        animate={{
          textShadow: hovered
            ? '0 0 12px rgba(45,212,191,0.55)'
            : connected
              ? '0 0 9px rgba(45,212,191,0.4)'
              : '0 0 0px rgba(0,0,0,0)',
        }}
        transition={{ duration: 0.2 }}
      >
        {node.label}
      </motion.span>

      <motion.span
        className="pointer-events-none absolute -z-10 inset-0 rounded-2xl"
        animate={{
          rotateX: parallax.y * 0.03,
          rotateY: -parallax.x * 0.03,
        }}
        transition={{ type: 'spring', stiffness: 120, damping: 14 }}
      />
    </motion.button>
  );
}
