import { Link } from 'react-router-dom';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Button } from '../components/ui/button';

export default function NotFound() {
  return (
    <PageWrapper>
      <section className="container-shell flex min-h-[70vh] flex-col items-center justify-center text-center">
        <p className="text-sm uppercase tracking-[0.22em] text-primary">404</p>
        <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">Page not found</h1>
        <p className="mt-4 max-w-xl text-muted-foreground">The page you requested does not exist or may have moved.</p>
        <Link to="/" className="mt-8 cursor-hover">
          <Button>Back to Home</Button>
        </Link>
      </section>
    </PageWrapper>
  );
}
