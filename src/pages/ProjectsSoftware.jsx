import ProjectsCategory from './ProjectsCategory';
import { getProjectsByCategory } from '../data/projects';

export default function ProjectsSoftware() {
  return (
    <ProjectsCategory
      title="Software Engineering Projects"
      description="Backend and systems-focused projects with clean architecture, operational reliability, and production engineering quality."
      projects={getProjectsByCategory('software')}
    />
  );
}
