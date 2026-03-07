import { PageWrapper } from '../components/layout/PageWrapper';
import { ProjectCategoryCard } from '../components/projects/ProjectCategoryCard';
import { ProjectHero } from '../components/projects/ProjectHero';
import { projectCategories } from '../data/projects';

export default function Projects() {
  return (
    <PageWrapper>
      <ProjectHero
        title="Projects"
        description="A curated portfolio across data systems, AI/ML applications, and software engineering builds. Explore by domain for focused case studies."
      />

      <section className="container-shell pb-20">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projectCategories.map((category, index) => (
            <ProjectCategoryCard key={category.key} category={category} index={index} />
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
