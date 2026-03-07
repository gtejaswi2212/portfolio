import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springX = useSpring(cursorX, { stiffness: 600, damping: 38, mass: 0.25 });
  const springY = useSpring(cursorY, { stiffness: 600, damping: 38, mass: 0.25 });

  useEffect(() => {
    const canUseCursor =
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
      window.innerWidth >= 1024;

    setEnabled(canUseCursor);
    document.documentElement.classList.toggle('custom-cursor', canUseCursor);
    if (!canUseCursor) return;

    const onMouseMove = (event) => {
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
    };

    const onMouseOver = (event) => {
      const interactiveTarget = event.target.closest(
        'a, button, input, textarea, select, [role="button"], .cursor-hover'
      );
      setHovering(Boolean(interactiveTarget));
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);

    return () => {
      document.documentElement.classList.remove('custom-cursor');
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!enabled) return null;

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[80] hidden h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/70 bg-primary/10 lg:block"
        style={{ x: springX, y: springY, scale: hovering ? 1.9 : 1 }}
        transition={{ type: 'spring', stiffness: 350, damping: 20 }}
      />
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[81] hidden h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary lg:block"
        style={{ x: springX, y: springY }}
      />
    </>
  );
}
