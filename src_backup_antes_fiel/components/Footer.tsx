import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Instagram,
  MessageCircle,
  ShieldCheck,
  Fuel,
  Lock,
  ArrowUp,
  Clock,
  Truck
} from 'lucide-react';
import { RcmLogo } from './RcmLogo';
import { ViewTab } from './Navbar';

interface FooterProps {
  setActiveTab: (tab: ViewTab) => void;
  onOpenPrivacyPolicy?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenPrivacyPolicy }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800 relative overflow-hidden" id="rcm-main-footer">
      {/* Background glow accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-orange-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center gap-3">
              <div className="bg-white p-2 rounded-2xl inline-block shadow-lg">
                <RcmLogo size="md" />
              </div>
            </div>

            <p className="text-slate-400 text-sm leading-relaxed max-w-md">
              A <strong>Rede de Postos RCM</strong> é referência regional em combustíveis certificados, infraestrutura de conveniência, serviços automotivos e transporte especializado. Uma rede em constante expansão movida por confiança, tecnologia e proximidade humana.
            </p>

            <div className="pt-2 flex flex-wrap gap-2 text-xs font-semibold text-slate-300">
              <span className="px-3 py-1 rounded-full bg-blue-900/40 border border-blue-700/50 text-blue-300">
                CONFIANÇA
              </span>
              <span className="px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-300">
                QUALIDADE
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-900/40 border border-blue-700/50 text-blue-300">
                TECNOLOGIA
              </span>
              <span className="px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/40 text-orange-300">
                EXPANSÃO
              </span>
            </div>

            {/* Mascote miniature endorsement */}
            <div className="mt-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 flex items-center gap-4 max-w-md">
              <img
                src="/assets/Mascote RCM.png"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (target.src !== '/assets/rcm_mascot.png') target.src = '/assets/rcm_mascot.png';
                }}
                alt="Mascote RCM"
                className="w-16 h-16 object-contain shrink-0 drop-shadow-md"
              />
              <div className="text-xs">
                <p className="font-bold text-white mb-0.5">Mascote Oficial RCM</p>
                <p className="text-slate-400">
                  "Tenha sempre uma boa viagem e faça uma parada tranquila em um dos nossos postos!"
                </p>
              </div>
            </div>
          </div>

          {/* Col 2: Institucional & Rede */}
          <div className="space-y-4">
            <h4 className="text-white font-display font-bold text-sm uppercase tracking-wider border-b border-slate-800 pb-2 flex items-center gap-2">
              <Fuel className="w-4 h-4 text-orange-500" />
              <span>Navegação</span>
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => { setActiveTab('home'); scrollToTop(); }}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Página Inicial (Home)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => { setActiveTab('quem-somos'); scrollToTop(); }}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Quem Somos & História
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => { setActiveTab('unidades'); scrollToTop(); }}
                  className="hover:text-orange-400 transition-colors cursor-pointer font-semibold text-white"
                >
                  Unidades & Mapa de Postos
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => { setActiveTab('produtos'); scrollToTop(); }}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Catálogo de Produtos
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => { setActiveTab('servicos'); scrollToTop(); }}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Serviços de Pista & Mecânica
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => { setActiveTab('transportadora'); scrollToTop(); }}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Nossa Transportadora
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Comunicação & Comercial */}
          <div className="space-y-4">
            <h4 className="text-white font-display font-bold text-sm uppercase tracking-wider border-b border-slate-800 pb-2 flex items-center gap-2">
              <Truck className="w-4 h-4 text-orange-500" />
              <span>Oportunidades</span>
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  type="button"
                  onClick={() => { setActiveTab('rcm-news'); scrollToTop(); }}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  RCM News (Notícias)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => { setActiveTab('acoes'); scrollToTop(); }}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Ações & Treinamentos
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => { setActiveTab('classificados'); scrollToTop(); }}
                  className="hover:text-orange-400 transition-colors cursor-pointer text-orange-400 font-bold"
                >
                  Classificados (Locação de Espaços)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => { setActiveTab('trabalhe-conosco'); scrollToTop(); }}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Trabalhe Conosco (Vagas)
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => { setActiveTab('contato'); scrollToTop(); }}
                  className="hover:text-orange-400 transition-colors cursor-pointer"
                >
                  Fale com a RCM
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => { setActiveTab('admin'); scrollToTop(); }}
                  className="hover:text-orange-400 transition-colors cursor-pointer text-xs text-slate-500 flex items-center gap-1 mt-3"
                >
                  <Lock className="w-3 h-3" />
                  <span>Painel Administrativo RCM</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Canais de Atendimento */}
          <div className="space-y-4">
            <h4 className="text-white font-display font-bold text-sm uppercase tracking-wider border-b border-slate-800 pb-2 flex items-center gap-2">
              <Phone className="w-4 h-4 text-orange-500" />
              <span>Atendimento</span>
            </h4>

            <div className="space-y-3 text-xs sm:text-sm text-slate-400">
              <a
                href="https://wa.me/5584998765432"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2.5 p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 transition-colors text-white group"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <span className="block text-[11px] text-slate-400 uppercase font-semibold">WhatsApp Comercial</span>
                  <span className="font-bold text-emerald-300">(84) 99876-5432</span>
                </div>
              </a>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <div>
                  <span className="block text-slate-400 text-xs">Central Telefônica</span>
                  <span className="text-slate-200">(84) 3645-1200</span>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-orange-400 mt-0.5 shrink-0" />
                <div>
                  <span className="block text-slate-400 text-xs">E-mail Institucional</span>
                  <span className="text-slate-200">contato@postorcm.com.br</span>
                </div>
              </div>

              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-slate-300 hover:text-orange-400 transition-colors pt-1"
              >
                <Instagram className="w-4 h-4 text-pink-500" />
                <span>@postorcm_oficial</span>
              </a>

              <div className="flex items-center gap-2 text-xs text-slate-500 pt-2">
                <Clock className="w-3.5 h-3.5" />
                <span>Postos com atendimento 24 Horas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar: Legal, LGPD & Back to Top */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex flex-wrap items-center gap-4">
            <span>© {new Date().getFullYear()} Rede de Postos RCM. Todos os direitos reservados.</span>
            <span className="hidden sm:inline">•</span>
            {onOpenPrivacyPolicy && (
              <button
                type="button"
                onClick={onOpenPrivacyPolicy}
                className="hover:text-slate-300 underline cursor-pointer"
              >
                Política de Privacidade & Cookies (LGPD)
              </button>
            )}
            <span className="hidden sm:inline">•</span>
            <span>Segurança e Qualidade Certificada</span>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800 transition-colors cursor-pointer"
          >
            <span>Voltar ao topo</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
