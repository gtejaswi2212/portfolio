import { Outlet } from 'react-router-dom';
import { CustomCursor } from '../cursor/CustomCursor';
import { Footer } from './Footer';
import { InteractiveBackground } from './InteractiveBackground';
import { Navbar } from './Navbar';
import { ScrollProgress } from './ScrollProgress';

export function MainLayout() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <ScrollProgress />
      <CustomCursor />
      <InteractiveBackground />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}
