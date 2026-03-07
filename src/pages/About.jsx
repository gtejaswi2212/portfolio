import { motion } from 'framer-motion';
import { Cpu, FlaskConical, GraduationCap, Layers, Workflow } from 'lucide-react';
import { PageWrapper } from '../components/layout/PageWrapper';
import { SkillCard } from '../components/skills/SkillCard';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { expertiseCategories, technicalStrengths } from '../data/skills';

const focusAreas = [
  {
    icon: Layers,
    title: 'Background',
    text: 'I hold an MS in Data Science from Stony Brook University and bring 3+ years of experience across software engineering, ML systems, and data workflows.',
  },
  {
    icon: Workflow,
    title: 'What I Build',
    text: 'I design end-to-end intelligent systems: retrieval workflows, deep learning pipelines, validation frameworks, and production-ready services.',
  },
  {
    icon: FlaskConical,
    title: 'Areas of Interest',
    text: 'Production AI platforms, retrieval-augmented systems, model evaluation loops, and dependable data-to-model infrastructure.',
  },
  {
    icon: Cpu,
    title: 'Engineering Focus',
    text: 'Reliable model behavior, scalable architecture, and measurable outcomes from experimentation to deployment.',
  },
];

const journey = [
  {
    label: 'Foundation',
    detail: 'Software engineering fundamentals in production enterprise environments.',
  },
  {
    label: 'Scale',
    detail: 'Data-intensive workflows, distributed processing, and quality-controlled pipelines.',
  },
  {
    label: 'Intelligence',
    detail: 'ML systems, retrieval applications, and model evaluation for practical AI products.',
  },
];

export default function About() {
  return (
    <PageWrapper>
      <section className="container-shell py-20">
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-semibold tracking-tight sm:text-5xl"
        >
          About
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06 }}
          className="mt-4 max-w-3xl text-lg text-muted-foreground"
        >
          I build AI and ML systems that move from experimentation to production with clear technical quality,
          measurable impact, and maintainable engineering design.
        </motion.p>
      </section>

      <section className="container-shell pb-14">
        <div className="grid gap-4 md:grid-cols-2">
          {focusAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="h-full bg-card/75">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg border border-primary/25 bg-primary/10 p-2 text-primary">
                      <area.icon className="h-5 w-5" />
                    </div>
                    <CardTitle>{area.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">{area.text}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container-shell pb-14">
        <div className="rounded-2xl border border-border bg-card/70 p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-lg border border-primary/25 bg-primary/10 p-2 text-primary">
              <GraduationCap className="h-5 w-5" />
            </div>
            <h2 className="text-xl font-semibold">Education & Background</h2>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            MS in Data Science from Stony Brook University. My work has spanned applied ML, scientific and healthcare
            data workflows, retrieval systems, and software engineering in production teams.
          </p>
        </div>
      </section>

      <section className="container-shell pb-14">
        <h2 className="mb-5 text-2xl font-semibold">Technical Expertise</h2>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {expertiseCategories.map((group, index) => (
            <SkillCard key={group.label} group={group} index={index} />
          ))}
        </div>
      </section>

      <section className="container-shell pb-14">
        <h2 className="mb-5 text-2xl font-semibold">Strength Areas</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {technicalStrengths.map((strength, index) => (
            <motion.div
              key={strength.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="rounded-2xl border border-border bg-card/70 p-5"
            >
              <h3 className="text-lg font-semibold">{strength.title}</h3>
              <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                {strength.points.map((point) => (
                  <li key={point} className="flex items-start gap-2">
                    <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-primary" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container-shell pb-20">
        <h2 className="mb-5 text-2xl font-semibold">Engineering Journey</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {journey.map((step, index) => (
            <motion.div
              key={step.label}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className="rounded-2xl border border-border bg-card/70 p-5"
            >
              <p className="text-sm uppercase tracking-widest text-primary">{step.label}</p>
              <p className="mt-2 text-sm text-muted-foreground">{step.detail}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </PageWrapper>
  );
}
