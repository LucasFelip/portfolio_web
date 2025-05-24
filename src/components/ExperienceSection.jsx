
import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Briefcase, MapPin, CalendarDays, ExternalLink } from 'lucide-react';

const experiencesData = [
    {
        imagemLink: 'https://media.licdn.com/dms/image/v2/D4D0BAQHxMkWtbZypVA/company-logo_200_200/company-logo_200_200/0/1704803475942?e=1753315200&v=beta&t=hB9CQJG90bvWE1UnC6FmY9QdlWmo4qzwwZhaCmq997c',
        instituicao: 'Pulse - Grupo Mateus',
        localizacao: 'São Luís, MA',
        inicioMes: 'Junho',
        inicioAno: '2025',
        terminoMes: '',
        terminoAno: '',
        cargo: 'Programador Pleno - Arquiteto de Software',
        atuacao: 'Atuo na construção de soluções inovadoras e escaláveis, utilizando tecnologias de ponta para otimizar processos e melhorar a experiência do cliente. Farei parte de uma equipe multidisciplinar, colaborando com profissionais de diversas áreas para desenvolver produtos que atendam às necessidades do mercado.',
        link: 'https://www.grupomateus.com.br/inovacao/'
    },
    {
        imagemLink: 'https://media.licdn.com/dms/image/D4D03AQF0xdN7Q2XS4Q/profile-displayphoto-shrink_800_800/0/1673450964826?e=2147483647&v=beta&t=ywL6nJJDaY8xzCI8Sfrorqw0_TCuyjO8rE6BrfXp4wI',
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

const ExperienceCard = ({ experience, index }) => {
  const { imagemLink, instituicao, localizacao, inicioMes, inicioAno, terminoMes, terminoAno, cargo, atuacao, link } = experience;
  const fallbackText = instituicao.substring(0, 2).toUpperCase();
  const periodo = `${inicioMes} ${inicioAno} - ${terminoMes}${terminoAno ? ' ' + terminoAno : ''}`;

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
    >
      <Card className="overflow-hidden bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/50">
          <CardHeader className="flex flex-col xs:flex-row items-start space-x-0 xs:space-x-4 p-4 xs:p-6">
              <Avatar className="h-12 w-12 xs:h-16 xs:w-16 mb-4 xs:mb-0">
                  <AvatarImage src={imagemLink} alt={instituicao} />
                  <AvatarFallback className="text-lg bg-primary/20 text-primary">{fallbackText}</AvatarFallback>
              </Avatar>
          <div className="flex-1">
            <CardTitle className="text-xl text-foreground">{cargo}</CardTitle>
            <a href={link} target="_blank" rel="noopener noreferrer" className="text-md text-primary hover:underline inline-flex items-center">
              {instituicao} <ExternalLink className="w-3 h-3 ml-1.5" />
            </a>
            <div className="text-xs text-muted-foreground mt-1 flex flex-col sm:flex-row sm:space-x-3">
              <span className="flex items-center"><MapPin className="w-3 h-3 mr-1" /> {localizacao}</span>
              <span className="flex items-center"><CalendarDays className="w-3 h-3 mr-1" /> {periodo}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <p className="text-sm text-foreground/80 leading-relaxed">{atuacao}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};


const ExperienceSection = () => {
  return (
    <section id="experiencias" className="py-20 md:py-32">
      <div className="container mx-auto px-4">
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
        <div className="space-y-8 max-w-3xl mx-auto">
          {experiencesData.map((exp, index) => (
            <ExperienceCard key={index} experience={exp} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
  