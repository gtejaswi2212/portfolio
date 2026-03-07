import ProjectsCategory from './ProjectsCategory';
import { getProjectsByCategory } from '../data/projects';

export default function ProjectsData() {
  return (
    <ProjectsCategory
      title="Data / Visualization Projects"
      description="Data engineering, analytics, and visualization-focused projects that prioritize reproducibility, trust, and measurable outcomes."
      projects={getProjectsByCategory('data')}
    />
  );
}
