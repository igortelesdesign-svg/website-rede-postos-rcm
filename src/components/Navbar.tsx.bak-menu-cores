import React, { useState } from 'react';
import {
  Menu,
  X,
  MapPin,
  MessageCircle,
  Lock,
  ChevronRight,
  Phone,
  Store,
  Fuel,
  Users,
  Briefcase
} from 'lucide-react';
import { RcmLogo } from './RcmLogo';
import { useData } from '../context/DataContext';

export type ViewTab =
  | 'home'
  | 'quem-somos'
  | 'unidades'
  | 'unidade-detail'
  | 'produtos'
  | 'servicos'
  | 'rcm-news'
  | 'news-detail'
  | 'acoes'
  | 'transportadora'
  | 'trabalhe-conosco'
  | 'contato'
  | 'classificados'
  | 'admin';

interface NavbarProps {
  activeTab: ViewTab;
  setActiveTab: (tab: ViewTab) => void;
  onSelectUnit?: (id: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAdminLoggedIn } = useData();

  const navLinks: { id: ViewTab; label: string; highlight?: boolean }[] = [
    { id: 'home', label: 'Home' },
    { id: 'quem-somos', label: 'Quem Somos' },
    { id: 'unidades', label: 'Unidades' },
    { id: 'produtos', label: 'Produtos' },
    { id: 'servicos', label: 'Serviços' },
    { id: 'rcm-news', label: 'RCM News' },
    { id: 'acoes', label: 'Ações' },
    { id: 'transportadora', label: 'Nossa Transportadora' },
    { id: 'classificados', label: 'Classificados', highlight: true },
    { id: 'trabalhe-conosco', label: 'Trabalhe Conosco' },
    { id: 'contato', label: 'Contato' }
  ];

  const handleNavClick = (tab: ViewTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs transition-all" id="rcm-main-header">
      {/* Top bar with quick contacts & institutional announcement */}
      <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-blue-950 text-white text-xs py-1.5 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6 text-blue-200/90 font-medium">
            <span className="flex items-center gap-1.5">
              <Fuel className="w-3.5 h-3.5 text-orange-400" />
              Rede de Postos RCM • Confiança que Move Sua Jornada
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-orange-400" />
              Presença Regional em Expansão
            </span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/5584998765432"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-orange-400 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span>WhatsApp Oficial: (84) 99876-5432</span>
            </a>

            <button
              type="button"
              onClick={() => handleNavClick('admin')}
              className={`flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                isAdminLoggedIn
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                  : 'bg-white/10 hover:bg-white/20 text-blue-200'
              }`}
              title="Painel Administrativo RCM"
            >
              <Lock className="w-3 h-3" />
              <span>{isAdminLoggedIn ? 'Admin Ativo' : 'Painel RCM'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main navigation container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo Brand */}
          <button
            type="button"
            onClick={() => handleNavClick('home')}
            className="flex items-center text-left focus:outline-none cursor-pointer group shrink-0"
          >
            <RcmLogo size="lg" />
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleNavClick(link.id)}
                  className={`px-3 py-2 rounded-xl text-xs xl:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                    isActive
                      ? 'bg-blue-900 text-white shadow-md shadow-blue-900/20'
                      : link.highlight
                      ? 'text-orange-600 hover:text-orange-700 hover:bg-orange-50 font-bold'
                      : 'text-slate-700 hover:text-blue-900 hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                  {link.highlight && (
                    <span className="ml-1.5 inline-block w-1.5 h-1.5 rounded-full bg-orange-500" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Quick Action Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleNavClick('unidades')}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-bold shadow-md shadow-orange-500/25 transition-all hover:shadow-orange-500/40 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              <MapPin className="w-4 h-4" />
              <span>Encontre uma RCM</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:text-blue-900 hover:bg-slate-100 focus:outline-none"
              aria-label="Abrir menu de navegação"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-2 animate-in slide-in-from-top-4 duration-200 shadow-xl">
          <div className="grid grid-cols-1 gap-1">
            {navLinks.map((link) => {
              const isActive = activeTab === link.id;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => handleNavClick(link.id)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl text-sm font-semibold transition-colors cursor-pointer text-left ${
                    isActive
                      ? 'bg-blue-900 text-white'
                      : link.highlight
                      ? 'bg-orange-50 text-orange-600 font-bold'
                      : 'text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 opacity-70" />
                </button>
              );
            })}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => handleNavClick('unidades')}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-orange-500 text-white font-bold text-sm shadow-md"
            >
              <MapPin className="w-4 h-4" />
              <span>Encontre uma Unidade RCM</span>
            </button>

            <button
              type="button"
              onClick={() => handleNavClick('admin')}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs"
            >
              <Lock className="w-3.5 h-3.5 text-blue-900" />
              <span>{isAdminLoggedIn ? 'Painel Administrativo (Conectado)' : 'Acessar Painel Administrativo'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
