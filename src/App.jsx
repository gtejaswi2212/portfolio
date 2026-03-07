import { AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import About from './pages/About';
import Contact from './pages/Contact';
import Experience from './pages/Experience';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import ProjectDetails from './pages/ProjectDetails';
import Projects from './pages/Projects';
import ProjectsAIML from './pages/ProjectsAIML';
import ProjectsData from './pages/ProjectsData';
import ProjectsSoftware from './pages/ProjectsSoftware';
import Resume from './pages/Resume';

function AnimatedRoutes() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/data" element={<ProjectsData />} />
          <Route path="/projects/ai-ml" element={<ProjectsAIML />} />
          <Route path="/projects/software" element={<ProjectsSoftware />} />
          <Route path="/projects/:slug" element={<ProjectDetails />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return <AnimatedRoutes />;
}
