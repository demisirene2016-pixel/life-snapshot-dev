import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Globe,
  MessageCircle,
  Copy,
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ContactSectionProps {
  data: {
    email: string;
    phone: string;
    location: string;
    kakaoTalk: string;
    github: string;
    linkedin: string;
    website: string;
  };
}

const ContactSection = ({ data }: ContactSectionProps) => {
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  const sendEmail = () => {
    window.location.href = `mailto:${data.email}`;
  };

  return (
    <section id="contact" className="section-padding bg-muted/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Get In Touch
          </h2>
          <p className="text-xl text-muted-foreground">
            Let's work together on your next project
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="glass-card p-6 space-y-6">
              <div>
                <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{data.email}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{data.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 text-muted-foreground">
                    <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                    <span>{data.location}</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border">
                <h4 className="font-semibold mb-4">Quick Actions</h4>
                <div className="flex flex-wrap gap-3">
                  <Button variant="default" onClick={sendEmail} className="gap-2">
                    <Mail className="w-4 h-4" />
                    Send Email
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => copyToClipboard(data.email, "Email")}
                    className="gap-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copy Email
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => window.open(data.kakaoTalk, "_blank")}
                    className="gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    KakaoTalk
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card className="glass-card p-6">
              <h3 className="text-2xl font-bold mb-6">Find Me Online</h3>
              <div className="space-y-4">
                {[
                  {
                    icon: Github,
                    label: "GitHub",
                    url: data.github,
                    color: "hover:text-purple-500",
                  },
                  {
                    icon: Linkedin,
                    label: "LinkedIn",
                    url: data.linkedin,
                    color: "hover:text-blue-500",
                  },
                  {
                    icon: Globe,
                    label: "Personal Website",
                    url: data.website,
                    color: "hover:text-green-500",
                  },
                ].map((social) => (
                  <motion.button
                    key={social.label}
                    whileHover={{ x: 8 }}
                    onClick={() => window.open(social.url, "_blank")}
                    className={`flex items-center gap-4 w-full p-4 rounded-lg bg-muted/50 hover:bg-muted transition-all ${social.color}`}
                  >
                    <social.icon className="w-6 h-6" />
                    <span className="font-medium">{social.label}</span>
                  </motion.button>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-12 pt-8 border-t border-border"
        >
          <p className="text-muted-foreground">
            © 2024 John Doe. Built with React, TypeScript & TailwindCSS
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
