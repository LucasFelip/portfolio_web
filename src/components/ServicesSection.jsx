import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Server, Network, Database, Smartphone } from 'lucide-react';

const WHATSAPP_NUMBER = '5598991530102';

const servicesData = [
  {
    icon: Server,
    title: 'Sistemas sob medida',
    description: 'Crio o programa que a sua empresa precisa: aquele que organiza processos e economiza seu tempo no dia a dia.',
    whatsappMessage: 'Olá Lucas! Vi seu portfólio e preciso de um sistema sob medida para minha empresa. Podemos conversar?',
  },
  {
    icon: Network,
    title: 'Mais velocidade e estabilidade',
    description: 'Se o seu sistema está lento ou trava quando muita gente usa ao mesmo tempo, eu resolvo isso.',
    whatsappMessage: 'Olá Lucas! Meu sistema está lento/travando e preciso de ajuda. Podemos conversar?',
  },
  {
    icon: Database,
    title: 'Cuido dos seus dados',
    description: 'Organizo as informações da sua empresa — clientes, vendas, cadastros — com segurança e sem risco de perder nada.',
    whatsappMessage: 'Olá Lucas! Preciso organizar/migrar os dados da minha empresa com segurança. Podemos conversar?',
  },
  {
    icon: Smartphone,
    title: 'Sites e aplicativos',
    description: 'Do zero ao ar: seu site ou aplicativo pronto para os seus clientes usarem.',
    whatsappMessage: 'Olá Lucas! Quero um site/aplicativo desenvolvido. Podemos conversar?',
  },
];

const ServicesSection = () => {
  return (
    <section id="servicos" className="relative overflow-hidden py-20 md:py-32 bg-background">
      <div className="absolute inset-0 bg-grid" />
      <div className="container relative mx-auto px-4">
        <div className="text-center">
          <span className="section-label">03 — Serviços</span>
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-4"
        >
          Serviços para o seu projeto
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto"
        >
          Disponível para projetos freelance, da ideia à entrega pronta para usar.
        </motion.p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {servicesData.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
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
                    Solicitar orçamento
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
