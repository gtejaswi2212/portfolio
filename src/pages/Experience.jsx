import { motion } from 'framer-motion';
import { PageWrapper } from '../components/layout/PageWrapper';
import { Badge } from '../components/ui/badge';
import { experiences } from '../data/experience';

export default function Experience() {
  return (
    <PageWrapper>
      <section className="container-shell py-20">
        <motion.h1 initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="text-4xl font-semibold sm:text-5xl">
          Experience
        </motion.h1>
        <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
          Engineering journey across applied ML, research systems, and production software delivery.
        </p>
      </section>

      <section className="container-shell pb-20">
        <div className="relative mx-auto max-w-4xl">
          <div className="absolute left-[10px] top-0 h-full w-px bg-gradient-to-b from-primary via-primary/30 to-transparent" />
          <div className="space-y-8">
            {experiences.map((item, index) => (
              <motion.article
                key={`${item.organization}-${item.role}`}
                initial={{ opacity: 0, x: -14 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="relative pl-10"
              >
                <span className="absolute left-[2px] top-7 h-[17px] w-[17px] rounded-full border-2 border-primary bg-background" />
                <div className="rounded-2xl border border-border bg-card/70 p-5 transition duration-300 hover:border-primary/35 hover:shadow-soft">
                  <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                    <div>
                      <h2 className="text-xl font-semibold">{item.role}</h2>
                      <p className="text-muted-foreground">{item.organization}</p>
                    </div>
                    <span className="rounded-md border border-primary/25 bg-primary/10 px-2.5 py-1 text-xs text-primary">
                      {item.dates}
                    </span>
                  </div>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {item.achievements.map((achievement) => (
                      <li key={achievement} className="flex items-start gap-2">
                        <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-primary" />
                        <span>{achievement}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {item.tools.map((tool) => (
                      <Badge key={tool}>{tool}</Badge>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
