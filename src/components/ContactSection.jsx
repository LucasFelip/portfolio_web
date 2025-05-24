import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github } from 'lucide-react';

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
    color: "hover:text-red-500",
  },
  {
    href: "https://www.linkedin.com/in/lucas-ferreira-5247b1221/",
    icon: Linkedin,
    label: "LinkedIn",
    color: "hover:text-blue-500",
  },
  {
    href: "https://github.com/LucasFelip",
    icon: Github,
    label: "GitHub",
    color: "hover:text-gray-400",
  },
  {
    href: "https://discord.com/users/luckylusca",
    icon: DiscordIcon,
    label: "Discord",
    color: "hover:text-indigo-500",
  }
];

const ContactSection = () => {
  return (
    <section id="contatos" className="py-20 md:py-32 bg-background">
      <div className="container mx-auto px-4 text-center">
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
          className="text-lg text-muted-foreground mb-12 max-w-xl mx-auto"
        >
          Conecte-se comigo através das redes abaixo. Estou sempre aberto a novas oportunidades e colaborações!
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4, staggerChildren: 0.1 }}
          className="flex flex-wrap justify-center items-center gap-6 sm:gap-8"
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
                className={`p-3 rounded-full bg-card/50 backdrop-blur-sm border border-border/50 text-foreground transition-all duration-300 ease-in-out transform hover:scale-110 ${link.color} focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50`}
                whileHover={{ y: -5 }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ type: "spring", stiffness: 260, damping: 20, delay: index * 0.1 }}
              >
                <IconComponent className="h-8 w-8 sm:h-10 sm:w-10" />
              </motion.a>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;