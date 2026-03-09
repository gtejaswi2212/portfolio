import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Github, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  getProjectBySlug,
  projectCategories,
  GITHUB_PROFILE_URL,
  allProjects,
} from "@/data/projects";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return allProjects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const categoryConfig = projectCategories[project.category];

  return (
    <div className="min-h-screen bg-grid-pattern transition-colors duration-300">
      <div className="mx-auto max-w-3xl px-4 py-12 md:px-8">
        <Button variant="ghost" size="sm" className="mb-8 gap-2 -ml-2" asChild>
          <Link href="/#projects">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Link>
        </Button>

        <article className="space-y-6">
          <div>
            <p className="mb-1 text-sm font-medium text-emerald-400/90">
              {categoryConfig.label}
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-foreground md:text-4xl">
              {project.title}
            </h1>
          </div>

          {project.image ? (
            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-muted">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
                priority
                unoptimized
              />
            </div>
          ) : (
            <div className="aspect-video w-full rounded-xl bg-gradient-to-br from-violet-500/20 to-emerald-500/20 flex items-center justify-center">
              <span className="text-6xl font-bold text-foreground/30">
                {project.title.charAt(0)}
              </span>
            </div>
          )}

          {project.impact && (
            <p className="text-sm font-medium text-emerald-400/90">
              {project.impact}
            </p>
          )}

          <p className="text-muted-foreground leading-relaxed">
            {project.description}
          </p>

          <div>
            <h2 className="mb-2 text-sm font-semibold text-foreground">
              Tech stack
            </h2>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-md border border-border bg-muted/50 px-3 py-1 text-sm text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-4">
            <Button variant="secondary" className="gap-2" asChild>
              <a
                href={project.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="h-4 w-4" />
                GitHub Repo
              </a>
            </Button>
            {project.demoUrl && (
              <Button variant="secondary" className="gap-2" asChild>
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </a>
              </Button>
            )}
            <Button variant="secondary" className="gap-2" asChild>
              <a
                href={GITHUB_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                View more on GitHub
              </a>
            </Button>
          </div>
        </article>
      </div>
    </div>
  );
}
