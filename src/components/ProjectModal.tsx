import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

interface Project {
  id: string;
  title: string;
  image: string;
  techStack: string[];
  tags: string[];
  description: string;
  contribution: string;
  results: string;
  links: Array<{ type: string; url: string }>;
}

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal = ({ project, onClose }: ProjectModalProps) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        >
          <Card className="glass-card p-8">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2 gradient-text">
                  {project.title}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="rounded-full"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Image */}
            <div className="h-64 bg-gradient-to-br from-primary/20 to-accent/20 rounded-xl mb-6 flex items-center justify-center">
              <div className="text-8xl opacity-30">🚀</div>
            </div>

            {/* Description */}
            <div className="space-y-6 mb-6">
              <div>
                <h3 className="text-xl font-bold mb-2">Description</h3>
                <p className="text-muted-foreground">{project.description}</p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">My Contribution</h3>
                <p className="text-muted-foreground">{project.contribution}</p>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-2">Results & Impact</h3>
                <p className="text-muted-foreground">{project.results}</p>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="mb-6">
              <h3 className="text-xl font-bold mb-3">Tech Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <Badge key={tech} variant="outline">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Links */}
            {project.links.length > 0 && (
              <div className="flex gap-3">
                {project.links.map((link) => (
                  <Button
                    key={link.type}
                    variant="default"
                    className="gap-2"
                    onClick={() => window.open(link.url, "_blank")}
                  >
                    {link.type === "github" ? (
                      <Github className="w-4 h-4" />
                    ) : (
                      <ExternalLink className="w-4 h-4" />
                    )}
                    {link.type === "github" ? "View Code" : "Live Demo"}
                  </Button>
                ))}
              </div>
            )}
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ProjectModal;
