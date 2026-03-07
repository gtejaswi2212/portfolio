import { ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { PageWrapper } from '../components/layout/PageWrapper';
import { ProjectCard } from '../components/projects/ProjectCard';
import { ProjectHero } from '../components/projects/ProjectHero';
import { Button } from '../components/ui/button';

export default function ProjectsCategory({ title, description, projects }) {
  const location = useLocation();

  return (
    <PageWrapper>
      <section className="container-shell pt-6 pb-4">
        <Link to="/projects" className="cursor-hover inline-block">
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
      </section>
      <ProjectHero title={title} description={description} />

      <section className="container-shell pb-20">
        {projects.length ? (
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={index}
                showCategory={false}
                fromPath={location.pathname}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-border bg-card/40 p-10 text-center">
            <p className="text-lg font-medium">Projects coming soon</p>
            <p className="mt-2 text-sm text-muted-foreground">This category will be populated with more work soon.</p>
          </div>
        )}
      </section>
    </PageWrapper>
  );
}
