import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, Menu, X } from 'lucide-react';
import { navItems } from '../../data/navigation';
import { socialLinks } from '../../data/socialLinks';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';
import { ThemeToggle } from './ThemeToggle';

const getLinkClasses = ({ isActive }) =>
  cn(
    'rounded-lg px-3 py-2 text-sm transition-colors cursor-hover',
    isActive
      ? 'bg-primary/15 text-foreground'
      : 'text-muted-foreground hover:text-foreground hover:bg-accent/60'
  );

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="container-shell flex h-16 items-center justify-between gap-3">
        <Link to="/" className="text-base font-semibold tracking-wide cursor-hover">
          Tejaswi Ganji
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <NavLink key={item.path} to={item.path} className={getLinkClasses}>
              {item.name}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <ThemeToggle />
          <a href={socialLinks.resume} download className="cursor-hover">
            <Button size="sm">
              <Download className="h-4 w-4" />
              Resume
            </Button>
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="rounded-lg border border-border bg-card/70 p-2 text-foreground lg:hidden cursor-hover"
          aria-label="Toggle mobile menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-border lg:hidden"
          >
            <div className="container-shell py-3">
              <div className="flex flex-col gap-1">
                {navItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={getLinkClasses}
                    onClick={() => setOpen(false)}
                  >
                    {item.name}
                  </NavLink>
                ))}
              </div>
              <div className="mt-3 flex items-center justify-between">
                <ThemeToggle />
                <a href={socialLinks.resume} download onClick={() => setOpen(false)}>
                  <Button size="sm">
                    <Download className="h-4 w-4" />
                    Resume
                  </Button>
                </a>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
