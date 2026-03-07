import { useEffect, useState } from 'react';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight;
      const current = window.scrollY;
      setProgress(height > 0 ? (current / height) * 100 : 0);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="fixed left-0 right-0 top-0 z-[60] h-[2px] bg-transparent">
      <div className="h-full bg-gradient-to-r from-primary via-cyan-400 to-blue-400" style={{ width: `${progress}%` }} />
    </div>
  );
}
