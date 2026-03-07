import { motion } from 'framer-motion';
import { ArrowRight, Download, Github, Linkedin, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Button } from '../components/ui/button';
import { socialLinks } from '../data/socialLinks';
import { heroStats } from '../data/stats';

export default function Home() {
  return (
    <PageWrapper>
      <section className="container-shell pt-20 pb-16 sm:pt-24 sm:pb-20">
        <div className="max-w-4xl space-y-7">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="inline-flex rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-primary"
          >
            AI / ML Engineer and Data Scientist
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Tejaswi Ganji
              <span className="mt-2 block bg-gradient-to-r from-primary to-blue-500 bg-clip-text text-3xl text-transparent sm:text-4xl">
                Building production-grade AI systems from data to deployment
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg">
              I design and build intelligent applications across machine learning, retrieval workflows, and scalable
              data infrastructure with a focus on reliability, measurable outcomes, and engineering quality.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.12 }}
            className="flex flex-wrap gap-3"
          >
            <Link to="/projects" className="cursor-hover">
              <Button size="lg" asChild>
                <span>
                  View Projects
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Button>
            </Link>
            <a href={socialLinks.resume} download className="cursor-hover">
              <Button size="lg" variant="secondary" asChild>
                <span>
                  <Download className="h-4 w-4" />
                  Download Resume
                </span>
              </Button>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.16 }}
            className="flex items-center gap-2"
          >
            <a
              className="rounded-full border border-border bg-card/70 p-2 hover:border-primary/40 cursor-hover"
              href={socialLinks.github}
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
            >
              <Github className="h-4 w-4" />
            </a>
            <a
              className="rounded-full border border-border bg-card/70 p-2 hover:border-primary/40 cursor-hover"
              href={socialLinks.linkedin}
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <a
              className="rounded-full border border-border bg-card/70 p-2 hover:border-primary/40 cursor-hover"
              href={socialLinks.email}
              aria-label="Email"
            >
              <Mail className="h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </section>

      <section className="container-shell pb-14 sm:pb-20">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {heroStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="rounded-2xl border border-border bg-card/70 p-4"
            >
              <p className="font-mono text-3xl font-semibold text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
