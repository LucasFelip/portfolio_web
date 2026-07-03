
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MapPin, CalendarDays, ExternalLink, ChevronDown } from 'lucide-react';

const MOBILE_VISIBLE_COUNT = 2;

const experiencesData = [
    {
        imagemLink: '/logos/pulse.jpg',
        instituicao: 'Pulse - Grupo Mateus',
        localizacao: 'São Luís, MA',
        inicioMes: 'Junho',
        inicioAno: '2025',
        terminoMes: '',
        terminoAno: '',
        cargo: 'Programador Pleno - Engenheiro de Software',
        atuacao: 'Atuo na construção de soluções inovadoras e escaláveis, utilizando tecnologias de ponta para otimizar processos e melhorar a experiência do cliente. Farei parte de uma equipe multidisciplinar, colaborando com profissionais de diversas áreas para desenvolver produtos que atendam às necessidades do mercado.',
        link: 'https://www.grupomateus.com.br/inovacao/'
    },
    {
        imagemLink: '/logos/lsdi.png',
        instituicao: 'LSDI - UFMA',
        localizacao: 'São Luís, MA',
        inicioMes: 'Janeiro',
        inicioAno: '2025',
        terminoMes: '',
        terminoAno: '',
        cargo: 'Voluntário em Administração de Laboratório',
        atuacao: 'Atuo voluntariamente na administração do Laboratório de Sistemas Distribuídos e Inteligentes (LSDI), desenvolvendo novas tecnologias e mantendo os recursos e serviços de infraestrutura que sustentam as pesquisas do laboratório.',
        link: 'https://ufma.br'
    },
    {
        imagemLink: '/logos/coreplan.png',
        instituicao: 'Coreplan Gestão Tecnologia e Serviços',
        localizacao: 'Fortaleza, CE',
        inicioMes: 'Novembro',
        inicioAno: '2023',
        terminoMes: 'Maio',
        terminoAno: '2025',
        cargo: 'Analista de Suporte de TI',
        atuacao: 'Atuo na manutenção do Sistema de Processos Automatizados (SPA), prestando suporte técnico especializado para procuradorias estaduais e municipais (PGE e PGM) e participando do processo de análise e uso do sistema junto ao cliente.',
        link: 'https://www.coreplan.com.br/'
    },
    {
        imagemLink: 'https://www.tjma.jus.br/imagens/logo_share.png',
        instituicao: 'Tribunal de Justiça do Maranhão',
        localizacao: 'São Luís, MA',
        inicioMes: 'Agosto',
        inicioAno: '2022',
        terminoMes: 'Novembro',
        terminoAno: '2023',
        cargo: 'Estagiário de Desenvolvimento de Software',
        atuacao: 'Participei do desenvolvimento e manutenção do sistema SAPRE, focado na gestão de precatórios. Contribuí para o gerenciamento de demandas, organização da equipe via metodologias ágeis (Scrum), e auxiliei na análise de código e resolução de bugs.',
        link: 'https://www.tjma.jus.br/'
    },
    {
        imagemLink: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSqmXO8nCMqO8lMGqTnKM_7vgims6zAf9fEvVWRJw&s',
        instituicao: 'Junta Comercial do Estado do Maranhão',
        localizacao: 'São Luís, MA',
        inicioMes: 'Outubro',
        inicioAno: '2021',
        terminoMes: 'Agosto',
        terminoAno: '2022',
        cargo: 'Estagiário de Desenvolvimento de Software',
        atuacao: 'Atuei na migração do banco de dados do sistema de Consulta Empresarial, transferindo dados do banco PL/SQL  para o banco Apache Pinot, e posteriormente para o MongoDB, visando melhorar a performance e os resultados das consultas.',
        link: 'https://www.jucema.ma.gov.br/'
    }
];

const ExperienceCard = ({ experience, index, isLast }) => {
  const { imagemLink, instituicao, localizacao, inicioMes, inicioAno, terminoMes, terminoAno, cargo, atuacao, link } = experience;
  const fallbackText = instituicao.substring(0, 2).toUpperCase();
  const isCurrent = !terminoAno;
  const periodo = isCurrent
    ? `${inicioMes} ${inicioAno} — atual`
    : `${inicioMes} ${inicioAno} — ${terminoMes} ${terminoAno}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className={`relative pl-16 xs:pl-20 ${isLast ? 'pb-0' : 'pb-8'}`}
    >
      <Avatar className="absolute left-0 top-0 h-12 w-12 xs:h-16 xs:w-16 ring-4 ring-background">
        <AvatarImage src={imagemLink} alt={instituicao} />
        <AvatarFallback className="text-lg bg-primary/20 text-primary">{fallbackText}</AvatarFallback>
      </Avatar>

      <div className="dashboard-card hover:border-primary/50 transition-colors">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-1">
          <h3 className="text-xl font-semibold text-foreground">{cargo}</h3>
          {isCurrent && (
            <span className="inline-flex items-center gap-1.5 font-mono text-[0.65rem] uppercase tracking-wide text-primary border border-primary/30 rounded-full px-2 py-0.5">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" /> atual
            </span>
          )}
        </div>
        <a href={link} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline inline-flex items-center">
          {instituicao} <ExternalLink className="w-3 h-3 ml-1.5" />
        </a>
        <div className="font-mono text-xs text-muted-foreground mt-2 flex flex-col sm:flex-row sm:gap-4">
          <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {localizacao}</span>
          <span className="flex items-center gap-1"><CalendarDays className="w-3 h-3" /> {periodo}</span>
        </div>
        <p className="text-sm text-foreground/80 leading-relaxed mt-3">{atuacao}</p>
      </div>
    </motion.div>
  );
};


const ExperienceSection = () => {
  const [expanded, setExpanded] = useState(false);
  const hasMore = experiencesData.length > MOBILE_VISIBLE_COUNT;

  return (
    <section id="experiencias" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <span className="section-label">02 — Experiência</span>
        </div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-4"
        >
          Experiências
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-muted-foreground text-center mb-12 max-w-2xl mx-auto"
        >
          Minha trajetória profissional e as contribuições que fiz em cada função.
        </motion.p>
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute left-6 xs:left-8 top-6 xs:top-8 bottom-6 xs:bottom-8 w-px bg-border" />
          {experiencesData.map((exp, index) => (
            <div
              key={index}
              className={!expanded && index >= MOBILE_VISIBLE_COUNT ? 'hidden md:block' : ''}
            >
              <ExperienceCard experience={exp} index={index} isLast={index === experiencesData.length - 1} />
            </div>
          ))}
        </div>
        {hasMore && (
          <div className="md:hidden text-center mt-6">
            <Button variant="outline" size="sm" onClick={() => setExpanded(!expanded)}>
              {expanded ? 'Ver menos' : `Ver mais experiências (${experiencesData.length - MOBILE_VISIBLE_COUNT})`}
              <ChevronDown className={`w-4 h-4 ml-2 transition-transform ${expanded ? 'rotate-180' : ''}`} />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ExperienceSection;
  