import React, { useState } from 'react';
import { MessageSquare, Sparkles, X, ChevronRight } from 'lucide-react';

export type MascotContext =
  | 'home'
  | 'unidades'
  | 'produtos'
  | 'servicos'
  | 'transportadora'
  | 'trabalhe'
  | 'contato'
  | 'classificados'
  | 'footer';

interface RcmMascotProps {
  context?: MascotContext;
  customMessage?: string;
  customTitle?: string;
  size?: 'sm' | 'md' | 'lg';
  position?: 'inline' | 'floating' | 'card';
  ctaText?: string;
  onCtaClick?: () => void;
  className?: string;
}

export const RcmMascot: React.FC<RcmMascotProps> = ({
  context = 'home',
  customMessage,
  customTitle,
  size = 'md',
  position = 'inline',
  ctaText,
  onCtaClick,
  className = ''
}) => {
  const [bubbleOpen, setBubbleOpen] = useState(true);

  const contextData = {
    home: {
      title: 'Bem-vindo à Rede RCM!',
      message: 'Olá! Eu sou o FIEL, mascote oficial da RCM. Estamos prontos para atender você com combustível de procedência garantida e o melhor atendimento.',
      cta: 'Encontrar Posto Próximo'
    },
    unidades: {
      title: 'Localize o Posto Mais Perto',
      message: 'Procurando uma RCM perto da sua rota? Filtre por cidade ou veja todas as nossas unidades no mapa interativo com rotas traçadas.',
      cta: 'Ver Unidades no Mapa'
    },
    produtos: {
      title: 'Dúvida com a Lubrificação?',
      message: 'Trabalhamos com os melhores óleos, fluidos e aditivos homologados para o motor do seu carro. Clique em Tenho Interesse para falar conosco!',
      cta: 'Consultar Especialista'
    },
    servicos: {
      title: 'Padrão RCM de Pista',
      message: 'Da calibragem digital à troca de óleo e conveniência, nossa equipe é treinada para cuidar do seu veículo com dedicação.',
      cta: 'Conhecer Todos os Serviços'
    },
    transportadora: {
      title: 'Frota Própria & Qualidade Assegurada',
      message: 'Com a transportadora própria da RCM, garantimos a pureza e a procedência do combustível desde a base de distribuição até o tanque do seu carro.',
      cta: 'Conhecer Nossa Logística'
    },
    trabalhe: {
      title: 'Venha Crescer com a Gente!',
      message: 'A Rede RCM valoriza pessoas de verdade. Cadastre seu currículo diretamente pelo nosso formulário e venha fazer parte da nossa equipe.',
      cta: 'Enviar Currículo'
    },
    contato: {
      title: 'Fale Conosco Rapidinho!',
      message: 'Precisa tirar dúvidas, solicitar parceria corporativa para frotas ou falar com a administração? Nosso WhatsApp está a um toque.',
      cta: 'Chamar no WhatsApp'
    },
    classificados: {
      title: 'Espaços Comerciais Premium',
      message: 'Traga o seu negócio para dentro da Rede RCM! Lojas e quiosques com alto fluxo garantido de motoristas todos os dias.',
      cta: 'Ver Espaços Disponíveis'
    },
    footer: {
      title: 'RCM: Energia em Cada Jornada',
      message: 'Muito obrigado por visitar nosso portal! Tenha uma excelente viagem e volte sempre a um posto RCM.',
      cta: 'Fale Conosco'
    }
  };

  const current = contextData[context] || contextData.home;
  const displayTitle = customTitle || current.title;
  const displayMessage = customMessage || current.message;
  const displayCta = ctaText || current.cta;

  const sizeDimensions = {
    sm: 'w-28 sm:w-32',
    md: 'w-48 sm:w-56',
    lg: 'w-64 sm:w-80'
  };

  if (position === 'card') {
    return (
      <div
        id={`mascot-card-${context}`}
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-950 p-6 lg:p-8 text-white shadow-xl border border-blue-700/40 ${className}`}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 grid grid-cols-1 sm:grid-cols-[150px_minmax(0,1fr)] items-center gap-5">
          <div className="shrink-0 animate-rcm-float">
            <div className="relative">
              <img
                src="/assets/Mascote RCM.png"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== '/assets/rcm_mascot.png') target.src = '/assets/rcm_mascot.png';
                }}
                alt="FIEL — Mascote Oficial da RCM"
                className="relative w-36 sm:w-40 h-auto object-contain mx-auto drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]"
              />
            </div>
          </div>

          <div className="min-w-0 w-full text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/15 text-orange-300 text-[10px] sm:text-xs font-bold tracking-wider uppercase mb-3 border border-orange-500/30">
              <Sparkles className="w-3.5 h-3.5 shrink-0" />
              <span>FIEL — MASCOTE OFICIAL DA RCM</span>
            </div>

            <h3 className="text-xl sm:text-2xl font-display font-bold text-white leading-tight mb-3 max-w-none">
              {displayTitle}
            </h3>

            <p className="text-blue-100/90 text-sm leading-relaxed mb-5 max-w-none">
              {displayMessage}
            </p>

            {onCtaClick && (
              <button
                type="button"
                onClick={onCtaClick}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-orange-500 hover:bg-blue-900 text-white font-bold text-xs sm:text-sm transition-all shadow-lg hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span>{displayCta}</span>
                <ChevronRight className="w-4 h-4 shrink-0" />
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-end gap-3 sm:gap-4 ${className}`} id={`mascot-section-${context}`}>
      <div className="shrink-0 animate-rcm-float select-none">
        <img
          src="/assets/Mascote RCM.png"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src !== '/assets/rcm_mascot.png') target.src = '/assets/rcm_mascot.png';
          }}
          alt="FIEL — Mascote Oficial da RCM"
          className={`${sizeDimensions[size]} object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.4)] transition-transform hover:scale-105`}
        />
      </div>

      {bubbleOpen && (
        <div className="relative max-w-xs sm:max-w-md bg-white rounded-2xl rounded-bl-sm p-4 sm:p-5 shadow-lg border border-slate-200/80 text-slate-800">
          <button
            type="button"
            onClick={() => setBubbleOpen(false)}
            className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100 transition-colors"
            title="Fechar balão"
            aria-label="Fechar balão de mensagem"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-blue-900">
              {displayTitle}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-3">
            {displayMessage}
          </p>
          {onCtaClick && (
            <button
              type="button"
              onClick={onCtaClick}
              className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 group cursor-pointer"
            >
              <span>{displayCta}</span>
              <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
