import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, BookOpen, FileCheck } from "lucide-react";

interface AwardItem {
  id: string;
  title: string;
  category: string;
  period: string;
  institution: string;
  description: string;
}

interface AwardsSectionProps {
  data: AwardItem[];
}

const categoryConfig = {
  certification: {
    icon: FileCheck,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  award: {
    icon: Award,
    color: "text-yellow-500",
    bgColor: "bg-yellow-500/10",
  },
  training: {
    icon: BookOpen,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
};

const AwardsSection = ({ data }: AwardsSectionProps) => {
  return (
    <section id="awards" className="section-padding">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Awards & Certifications
          </h2>
          <p className="text-xl text-muted-foreground">
            Recognition and achievements
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((award, index) => {
            const config =
              categoryConfig[award.category as keyof typeof categoryConfig];
            const Icon = config.icon;

            return (
              <motion.div
                key={award.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <Card className="glass-card p-6 hover:shadow-xl transition-shadow h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`p-3 rounded-xl ${config.bgColor}`}>
                      <Icon className={`w-6 h-6 ${config.color}`} />
                    </div>
                    <Badge variant="secondary" className="capitalize">
                      {award.category}
                    </Badge>
                  </div>

                  <h3 className="text-xl font-bold mb-2">{award.title}</h3>
                  <p className="text-sm text-primary mb-2">
                    {award.institution}
                  </p>
                  <p className="text-sm text-muted-foreground mb-3">
                    {award.period}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {award.description}
                  </p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
