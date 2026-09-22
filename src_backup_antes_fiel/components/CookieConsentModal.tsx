import React, { useState, useEffect } from 'react';
import { ShieldCheck, Check, Settings, X } from 'lucide-react';

interface CookieConsentProps {
  onOpenPrivacyPolicy?: () => void;
}

export const CookieConsentModal: React.FC<CookieConsentProps> = ({ onOpenPrivacyPolicy }) => {
  const [accepted, setAccepted] = useState(true);
  const [showPreferences, setShowPreferences] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);
  const [marketingEnabled, setMarketingEnabled] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('rcm_cookie_consent_accepted');
    if (!saved) {
      setAccepted(false);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('rcm_cookie_consent_accepted', 'all');
    localStorage.setItem('rcm_cookie_analytics', 'true');
    localStorage.setItem('rcm_cookie_marketing', 'true');
    setAccepted(true);
  };

  const handleSavePreferences = () => {
    localStorage.setItem('rcm_cookie_consent_accepted', 'custom');
    localStorage.setItem('rcm_cookie_analytics', String(analyticsEnabled));
    localStorage.setItem('rcm_cookie_marketing', String(marketingEnabled));
    setShowPreferences(false);
    setAccepted(true);
  };

  if (accepted) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 md:left-8 md:max-w-xl z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="bg-slate-900/95 backdrop-blur-md text-white rounded-2xl p-5 sm:p-6 shadow-2xl border border-slate-700/80">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0 border border-orange-500/30">
            <ShieldCheck className="w-5 h-5" />
          </div>

          <div className="flex-1">
            <h4 className="text-base font-bold text-white mb-1 flex items-center gap-2">
              <span>Privacidade & Cookies (LGPD)</span>
            </h4>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              A Rede de Postos RCM valoriza sua privacidade. Utilizamos cookies e tecnologias essenciais para garantir o funcionamento seguro do nosso portal e aprimorar a sua navegação, em conformidade com a LGPD (Lei nº 13.709/2018).
            </p>

            {showPreferences && (
              <div className="mb-4 p-3.5 bg-slate-800/80 rounded-xl border border-slate-700 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-200">Cookies Necessários (Sessão & Segurança)</span>
                  <span className="text-emerald-400 font-bold">Obrigatório</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-slate-700/60">
                  <label htmlFor="chk-analytics" className="cursor-pointer text-slate-300">
                    Cookies de Análise e Métricas
                  </label>
                  <input
                    id="chk-analytics"
                    type="checkbox"
                    checked={analyticsEnabled}
                    onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                    className="w-4 h-4 rounded text-orange-500 focus:ring-orange-500"
                  />
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-slate-700/60">
                  <label htmlFor="chk-marketing" className="cursor-pointer text-slate-300">
                    Comunicação e Redirecionamento de Atendimento
                  </label>
                  <input
                    id="chk-marketing"
                    type="checkbox"
                    checked={marketingEnabled}
                    onChange={(e) => setMarketingEnabled(e.target.checked)}
                    className="w-4 h-4 rounded text-orange-500 focus:ring-orange-500"
                  />
                </div>
              </div>
            )}

            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={handleAcceptAll}
                className="px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs sm:text-sm font-semibold transition-all shadow-md shadow-orange-500/20 cursor-pointer"
              >
                Aceitar Todos
              </button>

              {showPreferences ? (
                <button
                  type="button"
                  onClick={handleSavePreferences}
                  className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
                >
                  Salvar Preferências
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowPreferences(true)}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs sm:text-sm font-medium transition-colors border border-slate-700 cursor-pointer"
                >
                  Preferências
                </button>
              )}

              {onOpenPrivacyPolicy && (
                <button
                  type="button"
                  onClick={onOpenPrivacyPolicy}
                  className="text-xs text-slate-400 hover:text-white underline ml-auto cursor-pointer"
                >
                  Política de Privacidade
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
