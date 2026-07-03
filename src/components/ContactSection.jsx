import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github, CalendarClock } from 'lucide-react';

const SCHEDULING_LINK = 'https://cal.com/lusca-ferreira/30min';

const DiscordIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="currentColor"
    {...props}
  >
    <path d="M18.942 5.556a10.392 10.392 0 00-4.01-1.415A10.953 10.953 0 0012 4c-.825 0-1.633.085-2.417.242a10.392 10.392 0 00-4.009 1.415 10.703 10.703 0 00-2.867 11.03c.26.905.784 1.73 1.486 2.435.02.02.04.038.062.056L6.53 20.42c.7.533 1.474.96 2.297 1.275a8.802 8.802 0 003.173.405h.01a8.808 8.808 0 003.173-.405c.823-.315 1.597-.742 2.298-1.275l1.327-1.343a9.625 9.625 0 001.486-2.435A10.706 10.706 0 0018.942 5.556zM9.48 14.728a1.646 1.646 0 01-1.634-1.694c0-.936.733-1.695 1.633-1.695.901 0 1.634.76 1.634 1.695s-.733 1.694-1.634 1.694zm5.04 0a1.646 1.646 0 01-1.634-1.694c0-.936.733-1.695 1.634-1.695s1.634.76 1.634 1.695-.733 1.694-1.634 1.694z"/>
  </svg>
);

const contactLinks = [
  {
    href: "mailto:lucasfelipereis@hotmail.com",
    icon: Mail,
    label: "Email",
  },
  {
    href: "https://www.linkedin.com/in/lucas-ferreira-5247b1221/",
    icon: Linkedin,
    label: "LinkedIn",
  },
  {
    href: "https://github.com/LucasFelip",
    icon: Github,
    label: "GitHub",
  },
  {
    href: "https://discord.com/users/luckylusca",
    icon: DiscordIcon,
    label: "Discord",
  },
  {
    href: SCHEDULING_LINK,
    icon: CalendarClock,
    label: "Agendar",
  }
];

const ContactSection = () => {
  return (
    <section id="contatos" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 text-center">
        <span className="section-label">05 — Contato</span>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="rounded-lg border border-primary/30 bg-card/60 backdrop-blur-sm overflow-hidden shadow-2xl shadow-black/40"
        >
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-border bg-black/20">
            <span className="w-2.5 h-2.5 rounded-full bg-destructive/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
            <span className="w-2.5 h-2.5 rounded-full bg-primary/70" />
            <span className="ml-3 font-mono text-xs text-muted-foreground">contato.sh</span>
          </div>

          <div className="p-10 md:p-16 text-left">
            <p className="font-mono text-sm text-primary mb-4">$ echo "Vamos conversar?"</p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-4xl md:text-5xl font-bold mb-4"
            >
              Entre em Contato
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg text-muted-foreground mb-12 max-w-xl"
            >
              Conecte-se comigo através das redes abaixo. Estou sempre aberto a novas oportunidades, colaborações e projetos freelance!
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4, staggerChildren: 0.1 }}
              className="flex flex-wrap gap-4"
            >
              {contactLinks.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <motion.a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="flex flex-col items-center gap-2 w-24 p-4 rounded-lg border border-border bg-background/40 text-muted-foreground transition-colors hover:border-primary hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
                    whileHover={{ y: -3 }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 20, delay: index * 0.1 }}
                  >
                    <IconComponent className="h-6 w-6" />
                    <span className="font-mono text-xs">{link.label}</span>
                  </motion.a>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;