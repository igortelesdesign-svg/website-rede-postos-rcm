import React, { useState } from 'react';
import { MessageCircle, X, ExternalLink } from 'lucide-react';

interface WhatsAppFloatingProps {
  currentContext?: string;
  defaultPhone?: string;
}

export const WhatsAppFloatingButton: React.FC<WhatsAppFloatingProps> = ({
  currentContext = 'Geral',
  defaultPhone = '5584998765432'
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const getCustomMessage = () => {
    switch (currentContext) {
      case 'produtos':
        return 'Olá! Estou navegando no catálogo de produtos da Rede RCM e gostaria de tirar uma dúvida.';
      case 'unidades':
        return 'Olá! Gostaria de informações sobre as unidades e serviços da Rede de Postos RCM.';
      case 'classificados':
        return 'Olá! Vi uma oportunidade de locação de espaço comercial na Rede RCM e tenho interesse.';
      case 'trabalhe':
        return 'Olá! Gostaria de falar com o departamento de Recursos Humanos da Rede RCM.';
      case 'transportadora':
        return 'Olá! Gostaria de saber mais sobre as operações e parcerias da Transportadora RCM.';
      default:
        return 'Olá! Estou no site da Rede de Postos RCM e gostaria de atendimento.';
    }
  };

  const whatsappUrl = `https://wa.me/${defaultPhone}?text=${encodeURIComponent(getCustomMessage())}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-auto" id="rcm-floating-whatsapp">
      {showTooltip && (
        <div className="mb-3 w-72 bg-white rounded-2xl p-4 shadow-2xl border border-slate-200 text-slate-800 animate-in fade-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-bold text-slate-900">Atendimento RCM Online</span>
            </div>
            <button
              type="button"
              onClick={() => setShowTooltip(false)}
              className="text-slate-400 hover:text-slate-600 p-0.5 rounded"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-slate-600 mb-3 leading-relaxed">
            Precisa de ajuda rápida com postos, produtos ou parcerias? Converse direto com nosso time no WhatsApp.
          </p>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-md transition-colors"
          >
            <span>Iniciar Conversa</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      )}

      <div className="relative group">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => setShowTooltip(true)}
          className="flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-emerald-600 to-green-500 hover:from-emerald-500 hover:to-green-400 text-white shadow-xl shadow-emerald-600/40 transition-all transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-400/40"
          aria-label="Fale conosco pelo WhatsApp"
          title="Fale conosco pelo WhatsApp"
        >
          <MessageCircle className="w-7 h-7 fill-white/20" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-orange-500 border-2 border-white"></span>
          </span>
        </a>
      </div>
    </div>
  );
};
