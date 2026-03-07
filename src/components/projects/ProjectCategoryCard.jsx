import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export function ProjectCategoryCard({ category, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
    >
      <Card className="group h-full overflow-hidden bg-card/70 transition duration-300 hover:-translate-y-1 hover:border-primary/35 hover:shadow-soft">
        <div className="relative aspect-[16/9] overflow-hidden border-b border-border/60 bg-muted/30">
          <img
            src={category.image}
            alt={`${category.title} category`}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            loading="lazy"
          />
        </div>

        <CardHeader>
          <CardTitle className="text-xl">{category.title}</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">{category.description}</p>
          <Link to={category.path} className="inline-block cursor-hover">
            <Button variant="outline" asChild>
              <span>
                View Projects
                <ArrowRight className="h-4 w-4" />
              </span>
            </Button>
          </Link>
        </CardContent>
      </Card>
    </motion.div>
  );
}
