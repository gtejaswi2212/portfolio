import { motion } from 'framer-motion';
import { ArrowUpRight, ExternalLink, Github } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';

export function ProjectCard({ project, index = 0, showCategory = true, fromPath = '/projects' }) {
  const categoryLabel =
    project.categoryLabel ||
    project.category
      .split('-')
      .map((part) => part.toUpperCase())
      .join(' / ');

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="group h-full overflow-hidden bg-card/70 transition duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-soft">
        <div className="relative aspect-[16/9] overflow-hidden border-b border-border/60 bg-muted/40">
          <img
            src={project.image}
            alt={`${project.title} preview`}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
          {showCategory ? (
            <span className="absolute left-3 top-3 rounded-full border border-primary/30 bg-background/80 px-2 py-1 text-[11px] font-medium text-primary backdrop-blur-sm">
              {categoryLabel}
            </span>
          ) : null}
        </div>

        <CardHeader>
          <CardTitle className="text-xl leading-tight">{project.title}</CardTitle>
          <p className="text-sm text-muted-foreground line-clamp-3">{project.description}</p>
        </CardHeader>

        <CardContent className="space-y-4 text-sm">
          <div className="flex flex-wrap gap-2">
            {project.stack.map((skill) => (
              <Badge key={skill}>{skill}</Badge>
            ))}
          </div>

          {project.metrics?.length ? (
            <div className="rounded-lg border border-primary/25 bg-primary/10 px-3 py-2 text-primary">
              {project.metrics[0]}
            </div>
          ) : null}

          <div className="flex flex-wrap gap-2">
            {project.githubUrl ? (
              <a href={project.githubUrl} target="_blank" rel="noreferrer" className="cursor-hover">
                <Button size="sm" variant="secondary" asChild>
                  <span>
                    <Github className="h-4 w-4" />
                    GitHub
                  </span>
                </Button>
              </a>
            ) : null}

            {project.demoUrl ? (
              <a href={project.demoUrl} target="_blank" rel="noreferrer" className="cursor-hover">
                <Button size="sm" variant="outline" asChild>
                  <span>
                    <ExternalLink className="h-4 w-4" />
                    Live Demo
                  </span>
                </Button>
              </a>
            ) : null}
          </div>
        </CardContent>

        <CardFooter>
          <Link to={`/projects/${project.slug}`} state={{ from: fromPath }} className="w-full cursor-hover">
            <Button variant="outline" className="w-full justify-between" asChild>
              <span>
                View Details
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
