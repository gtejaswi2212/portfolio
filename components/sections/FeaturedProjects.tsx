"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowRight } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  aiMlProjects,
  dataVizProjects,
  softwareProjects,
  projectCategories,
  GITHUB_PROFILE_URL,
  type Project,
  type ProjectCategory,
} from "@/data/projects";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
};

const cardItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 },
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div variants={cardItem}>
      <Card className="group h-full border-border transition-all duration-300 hover:border-violet-500/25 hover:shadow-[0_0_40px_rgba(139,92,246,0.12)] overflow-hidden">
        {project.image ? (
          <div className="relative h-40 w-full bg-muted">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
              unoptimized
            />
          </div>
        ) : (
          <div className="h-40 w-full bg-gradient-to-br from-violet-500/20 to-emerald-500/20 flex items-center justify-center">
            <span className="text-4xl font-bold text-foreground/30">
              {project.title.charAt(0)}
            </span>
          </div>
        )}
        <CardHeader className="pb-2">
          <Link
            href={`/projects/${project.slug}`}
            className="text-lg font-semibold text-foreground group-hover:text-violet-700 dark:group-hover:text-violet-200/90 hover:underline underline-offset-2"
          >
            {project.title}
          </Link>
          {project.impact && (
            <p className="text-sm font-medium text-emerald-400/90">
              {project.impact}
            </p>
          )}
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm leading-relaxed text-muted-foreground line-clamp-3">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-border bg-muted/50 px-2 py-0.5 text-xs text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </CardContent>
        <CardFooter className="gap-2 flex-wrap">
          <Button variant="secondary" size="sm" className="gap-1.5" asChild>
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-3.5 w-3.5" />
              GitHub Repo
            </a>
          </Button>
          {project.demoUrl && (
            <Button variant="secondary" size="sm" className="gap-1.5" asChild>
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Live Demo
              </a>
            </Button>
          )}
          <Button variant="ghost" size="sm" className="gap-1" asChild>
            <Link href={`/projects/${project.slug}`}>
              Details
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

function ProjectSection({
  category,
  projects,
}: {
  category: ProjectCategory;
  projects: Project[];
}) {
  const config = projectCategories[category];
  if (projects.length === 0) return null;
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 first:mt-0"
      >
        <h3 className="mb-1 text-xl font-semibold text-foreground md:text-2xl">
          {config.label}
        </h3>
        <p className="mb-6 text-sm text-muted-foreground">
          {config.description}
        </p>
      </motion.div>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </motion.div>
    </>
  );
}

export function FeaturedProjects() {
  return (
    <section id="projects" className="relative px-4 py-20 md:px-8 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <h2 className="mb-2 text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            Projects
          </h2>
          <p className="text-muted-foreground">
            Selected work from my GitHub — AI/ML, data, and software
          </p>
        </motion.div>

        <ProjectSection
          category="ai-ml"
          projects={aiMlProjects}
        />
        <ProjectSection
          category="data-viz"
          projects={dataVizProjects}
        />
        <ProjectSection
          category="software"
          projects={softwareProjects}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 rounded-xl border border-border bg-muted/30 p-6 text-center"
        >
          <p className="mb-3 text-sm font-medium text-muted-foreground">
            More repos and contributions
          </p>
          <Button variant="secondary" className="gap-2" asChild>
            <a
              href={GITHUB_PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Github className="h-4 w-4" />
              View More on GitHub
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
