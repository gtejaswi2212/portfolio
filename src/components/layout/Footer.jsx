import { Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { socialLinks } from '../../data/socialLinks';

export function Footer() {
  return (
    <footer className="border-t border-border/70 py-10">
      <div className="container-shell flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="font-semibold">Tejaswi Ganji</p>
          <p className="text-sm text-muted-foreground">Built with React, Tailwind, Framer Motion</p>
          <p className="text-sm text-muted-foreground">Open to AI, ML, and Data Systems opportunities</p>
        </div>
        <div className="flex items-center gap-1">
          <Link to="/projects" className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground cursor-hover">
            Projects
          </Link>
          <Link to="/contact" className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground cursor-hover">
            Contact
          </Link>
          <a href={socialLinks.github} target="_blank" rel="noreferrer" className="rounded-md p-2 hover:bg-accent/50 cursor-hover">
            <Github className="h-4 w-4" />
          </a>
          <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="rounded-md p-2 hover:bg-accent/50 cursor-hover">
            <Linkedin className="h-4 w-4" />
          </a>
          <a href={socialLinks.email} className="rounded-md p-2 hover:bg-accent/50 cursor-hover">
            <Mail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
