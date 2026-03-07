import { Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Button } from '../components/ui/button';
import { heroStats, resumeHighlights } from '../data/stats';
import { skillsByCategory } from '../data/skills';
import { socialLinks } from '../data/socialLinks';

export default function Resume() {
  return (
    <PageWrapper>
      <section className="container-shell py-20">
        <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-semibold sm:text-5xl">
          Resume Snapshot
        </motion.h1>
        <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
          Quick recruiter-focused profile summary with technical strengths, metrics, and role alignment.
        </p>
        <a href={socialLinks.resume} download className="mt-7 inline-block cursor-hover">
          <Button size="lg">
            <Download className="h-4 w-4" />
            Download Full Resume
          </Button>
        </a>
      </section>

      <section className="container-shell pb-10">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {heroStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="rounded-2xl border border-border bg-card/70 p-5"
            >
              <p className="font-mono text-3xl font-semibold text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container-shell pb-10">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card/70 p-6">
            <h2 className="text-xl font-semibold">Selected Achievements</h2>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {resumeHighlights.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-border bg-card/70 p-6">
            <h2 className="text-xl font-semibold">Technical Summary</h2>
            <div className="mt-4 space-y-3">
              {skillsByCategory.map((group) => (
                <div key={group.label}>
                  <p className="text-sm font-medium">{group.label}</p>
                  <p className="text-sm text-muted-foreground">{group.items.join(' • ')}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
