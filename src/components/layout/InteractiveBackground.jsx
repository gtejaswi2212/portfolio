import { useEffect, useRef } from 'react';

const PARTICLE_COUNT = 54;
const MAX_LINK_DISTANCE = 130;

function createParticles(width, height, count) {
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    size: Math.random() * 1.8 + 0.8,
  }));
}

export function InteractiveBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    let particles = [];
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const particleCount = reducedMotion ? 28 : PARTICLE_COUNT;

    const state = {
      dotColor: 'rgba(20, 184, 166, 0.22)',
      lineRGB: '45, 212, 191',
      glowColor: 'rgba(59, 130, 246, 0.1)',
      mouseInfluence: 0.035,
    };

    const applyTheme = () => {
      const dark = document.documentElement.classList.contains('dark');
      if (dark) {
        state.dotColor = 'rgba(45, 212, 191, 0.22)';
        state.lineRGB = '94, 234, 212';
        state.glowColor = 'rgba(56, 189, 248, 0.08)';
      } else {
        state.dotColor = 'rgba(13, 148, 136, 0.24)';
        state.lineRGB = '13, 148, 136';
        state.glowColor = 'rgba(2, 132, 199, 0.08)';
      }
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = createParticles(width, height, particleCount);
    };

    const onMouseMove = (event) => {
      mouse = { x: event.clientX, y: event.clientY };
    };

    const draw = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      ctx.clearRect(0, 0, width, height);

      const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 20, mouse.x, mouse.y, 280);
      gradient.addColorStop(0, state.glowColor);
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      particles.forEach((particle) => {
        const dx = mouse.x - particle.x;
        const dy = mouse.y - particle.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (!reducedMotion && dist < 220) {
          particle.vx += dx * state.mouseInfluence * 0.0008;
          particle.vy += dy * state.mouseInfluence * 0.0008;
        }

        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vx *= 0.992;
        particle.vy *= 0.992;

        if (particle.x < 0 || particle.x > width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > height) particle.vy *= -1;

        particle.x = Math.max(0, Math.min(width, particle.x));
        particle.y = Math.max(0, Math.min(height, particle.y));
      });

      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_LINK_DISTANCE) {
            const alpha = (1 - dist / MAX_LINK_DISTANCE) * 0.75;
            ctx.strokeStyle = `rgba(${state.lineRGB}, ${alpha.toFixed(2)})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      particles.forEach((particle) => {
        ctx.fillStyle = state.dotColor;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });

      if (!reducedMotion) {
        rafId = window.requestAnimationFrame(draw);
      }
    };

    const observer = new MutationObserver(applyTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    applyTheme();
    resize();
    draw();

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <canvas ref={canvasRef} className="h-full w-full opacity-80" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-background/75" />
    </div>
  );
}
