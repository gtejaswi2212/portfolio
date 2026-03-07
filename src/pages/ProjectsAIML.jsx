import ProjectsCategory from './ProjectsCategory';
import { getProjectsByCategory } from '../data/projects';

export default function ProjectsAIML() {
  return (
    <ProjectsCategory
      title="AI / ML Projects"
      description="Intelligent systems spanning retrieval pipelines, deep learning workflows, and evaluation-driven machine learning applications."
      projects={getProjectsByCategory('ai-ml')}
    />
  );
}
