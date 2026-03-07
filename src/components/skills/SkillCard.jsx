import { motion } from 'framer-motion';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export function SkillCard({ group, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className="h-full bg-card/70 transition duration-300 hover:border-primary/30 hover:shadow-soft">
        <CardHeader>
          <CardTitle className="text-lg">{group.label}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {group.items.map((item) => (
              <Badge key={item} className="hover:border-primary/35 hover:bg-primary/10 hover:text-foreground">
                {item}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
