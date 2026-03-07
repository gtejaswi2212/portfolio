import { motion } from 'framer-motion';
import { ArrowLeft, ExternalLink, Github } from 'lucide-react';
import { Link, Navigate, useLocation, useParams } from 'react-router-dom';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { getProjectBySlug } from '../data/projects';

export default function ProjectDetails() {
  const { slug } = useParams();
  const location = useLocation();
  const project = getProjectBySlug(slug);

  if (!project) return <Navigate to="/404" replace />;

  const fromPath = typeof location.state?.from === 'string' ? location.state.from : '/projects';
  const backPath = fromPath.startsWith('/projects') ? fromPath : '/projects';

  return (
    <PageWrapper>
      <section className="container-shell py-10 sm:py-12">
        <div className="sticky top-20 z-40 inline-block">
          <Link to={backPath} className="cursor-hover">
            <Button
              variant="outline"
              className="h-10 border-border/70 bg-background/85 backdrop-blur-sm transition hover:border-primary/35 hover:bg-card/90"
              asChild
            >
              <span>
                <ArrowLeft className="h-4 w-4" />
                Back
              </span>
            </Button>
          </Link>
        </div>
      </section>

      <section className="container-shell pb-20">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-semibold sm:text-5xl"
        >
          {project.title}
        </motion.h1>
        <p className="mt-3 max-w-3xl text-lg text-muted-foreground">{project.description}</p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
          <div className="space-y-5 rounded-2xl border border-border bg-card/70 p-6">
            <div className="overflow-hidden rounded-xl border border-border/60">
              <img src={project.image} alt={`${project.title} cover`} className="h-full w-full object-cover" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Problem</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.problem}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Approach</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.approach}</p>
            </div>
            <div>
              <h2 className="text-xl font-semibold">Outcomes</h2>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {project.outcomes.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="space-y-5 rounded-2xl border border-border bg-card/70 p-6">
            <div>
              <h3 className="text-sm uppercase tracking-widest text-muted-foreground">Tech Stack</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <Badge key={tech}>{tech}</Badge>
                ))}
              </div>
            </div>

            {project.keyFeatures?.length ? (
              <div>
                <h3 className="text-sm uppercase tracking-widest text-muted-foreground">Key Features</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {project.keyFeatures.map((feature) => (
                    <li key={feature} className="rounded-lg border border-border bg-background/70 px-3 py-2">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {project.metrics?.length ? (
              <div>
                <h3 className="text-sm uppercase tracking-widest text-muted-foreground">Impact / Metrics</h3>
                <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                  {project.metrics.map((metric) => (
                    <li key={metric} className="rounded-lg border border-primary/25 bg-primary/10 px-3 py-2 text-primary">
                      {metric}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="flex flex-col gap-2 pt-2">
              {project.githubUrl ? (
                <a href={project.githubUrl} target="_blank" rel="noreferrer" className="cursor-hover">
                  <Button className="w-full justify-between" variant="secondary" asChild>
                    <span>
                      GitHub
                      <Github className="h-4 w-4" />
                    </span>
                  </Button>
                </a>
              ) : null}

              {project.demoUrl ? (
                <a href={project.demoUrl} target="_blank" rel="noreferrer" className="cursor-hover">
                  <Button className="w-full justify-between" variant="outline" asChild>
                    <span>
                      Live Demo
                      <ExternalLink className="h-4 w-4" />
                    </span>
                  </Button>
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
