import { useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const COLUMNS = 6;
const ROWS = 11;
const TILE_COUNT = COLUMNS * ROWS;

function proximityBrightness(mouse, rect, index) {
  if (!mouse || !rect) return 0;

  const col = index % COLUMNS;
  const row = Math.floor(index / COLUMNS);
  const cx = ((col + 0.5) / COLUMNS) * rect.width;
  const cy = ((row + 0.5) / ROWS) * rect.height;

  const dx = mouse.x - cx;
  const dy = mouse.y - cy;
  const distance = Math.sqrt(dx * dx + dy * dy);

  return Math.max(0, 1 - distance / 145);
}

export function InteractiveGridPanel() {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState(null);
  const [rect, setRect] = useState(null);

  const cells = useMemo(() => Array.from({ length: TILE_COUNT }, (_, i) => i), []);

  const handleMouseMove = (event) => {
    const bounds = containerRef.current?.getBoundingClientRect();
    if (!bounds) return;

    setRect({ width: bounds.width, height: bounds.height });
    setMousePosition({ x: event.clientX - bounds.left, y: event.clientY - bounds.top });
  };

  const handleMouseLeave = () => {
    setMousePosition(null);
  };

  return (
    <div
      ref={containerRef}
      className="group relative rounded-2xl border border-border bg-card/80 p-3 cursor-card"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: mousePosition ? 1 : 0,
          background: mousePosition
            ? `radial-gradient(240px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(45,212,191,0.22), transparent 72%)`
            : 'transparent',
        }}
      />
      <div className="relative grid grid-cols-6 gap-2 rounded-xl">
        {cells.map((index) => {
          const intensity = proximityBrightness(mousePosition, rect, index);
          const baseOpacity = 0.2 + intensity * 0.7;
          const scale = 1 + intensity * 0.09;

          return (
            <motion.div
              key={index}
              whileHover={{ y: -2, scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="h-5 rounded-sm border border-primary/20"
              style={{
                opacity: baseOpacity,
                transform: `scale(${scale})`,
                background:
                  'linear-gradient(145deg, rgba(45,212,191,0.35), rgba(59,130,246,0.22))',
                boxShadow: intensity
                  ? `0 0 ${8 + intensity * 16}px rgba(45,212,191,${0.08 + intensity * 0.2})`
                  : 'none',
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
