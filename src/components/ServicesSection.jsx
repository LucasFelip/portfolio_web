import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Server, Network, Database, Smartphone } from 'lucide-react';
import { useI18n } from '@/i18n';

const WHATSAPP_NUMBER = '5598991530102';

const serviceIcons = [Server, Network, Database, Smartphone];

const ServicesSection = () => {
  const { t } = useI18n();
  return (
    <section id="servicos" className="relative overflow-hidden py-20 md:py-32 bg-background">
      <div className="absolute inset-0 bg-grid" />
      <div className="container relative mx-auto px-4">
        <div className="text-center">
          <span className="section-label">{t.services.label}</span>
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-4"
        >
          {t.services.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto"
        >
          {t.services.subtitle}
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.services.items.map((service, index) => {
            const Icon = serviceIcons[index];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="dashboard-card h-full flex flex-col hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-md border border-primary/30 bg-primary/10 text-primary flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{service.description}</p>
                <Button variant="outline" size="sm" asChild className="w-full mt-5">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(service.whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t.services.quote}
                  </a>
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
