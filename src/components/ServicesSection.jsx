import React from 'react';
import { m } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Server, Network, Database, Smartphone } from 'lucide-react';
import { useI18n } from '@/i18n';

const WHATSAPP_NUMBER = '5598991530102';

const serviceIcons = [Server, Network, Database, Smartphone];

// Projeto de referência por serviço (mesma ordem de t.services.items). Imagens vêm de /public/projects.
const serviceReferences = [
  { name: 'self-stream-deck', image: '/projects/self-stream-deck.webp', href: 'https://lucasfelip.github.io/self-stream-deck/' },
  null,
  null,
  { name: "Ana's Joias", image: '/projects/ana-joias.webp', href: 'https://github.com/LucasFelip/ana-joiais-dev' },
];

const ServicesSection = () => {
  const { t } = useI18n();
  return (
    <section id="servicos" className="relative overflow-hidden py-12 md:py-24 bg-background">
      <div className="absolute inset-0 bg-grid" />
      <div className="container relative mx-auto px-4">
        <div className="text-center">
          <span className="section-label">{t.services.label}</span>
        </div>
        <m.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-4"
        >
          {t.services.title}
        </m.h2>
        <m.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto"
        >
          {t.services.subtitle}
        </m.p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {t.services.items.map((service, index) => {
            const Icon = serviceIcons[index];
            return (
              <m.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="dashboard-card h-full flex flex-col hover:border-primary/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-11 h-11 rounded-md border border-primary/30 bg-primary/10 text-primary-text flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{service.description}</p>
                {serviceReferences[index] && (
                  <a
                    href={serviceReferences[index].href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 flex items-center gap-3 rounded-md border border-border bg-black/20 p-2 transition-colors hover:border-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <img
                      src={serviceReferences[index].image}
                      alt=""
                      loading="lazy"
                      className="h-10 w-16 shrink-0 rounded object-cover"
                    />
                    <span className="font-mono text-xs text-muted-foreground">
                      {t.services.reference}: <span className="text-foreground">{serviceReferences[index].name}</span>
                    </span>
                  </a>
                )}
                <Button variant="outline" size="sm" asChild className="w-full mt-5">
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(service.whatsappMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t.services.quote}
                  </a>
                </Button>
              </m.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
