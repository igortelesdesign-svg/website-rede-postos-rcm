import React, { useState } from 'react';
import { MapPin, Copy, Check, Share2, Navigation, MessageSquare, ExternalLink, X } from 'lucide-react';
import { StationUnit } from '../types';

interface ShareAddressModalProps {
  station: StationUnit;
  isOpen: boolean;
  onClose: () => void;
}

export const ShareAddressModal: React.FC<ShareAddressModalProps> = ({
  station,
  isOpen,
  onClose
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const fullAddress = `${station.address}, ${station.neighborhood}, ${station.city} - ${station.state}, CEP ${station.cep}`;
  const routeUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${station.name}, ${station.address}, ${station.city} ${station.state}`
  )}`;

  const formattedShareMessage = `⛽ *${station.name} - Rede de Postos RCM*\n📍 *Endereço:* ${fullAddress}\n🕒 *Horário de Funcionamento:* ${station.openingHours}\n🗺️ *Localização no Google Maps:* ${routeUrl}\n\nAbasteça com confiança e qualidade garantida na Rede RCM!`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: station.name,
          text: formattedShareMessage,
          url: routeUrl
        });
      } catch {
        // Share cancelled
      }
    } else {
      // Open WhatsApp with formatted text
      const waUrl = `https://wa.me/?text=${encodeURIComponent(formattedShareMessage)}`;
      window.open(waUrl, '_blank');
    }
  };

  const handleWhatsAppShare = () => {
    const waUrl = `https://wa.me/?text=${encodeURIComponent(formattedShareMessage)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          aria-label="Fechar modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header with location icon */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-2xl bg-orange-500/15 text-orange-600 flex items-center justify-center border border-orange-500/30">
            <MapPin className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600">
              Endereço Compartilhável
            </span>
            <h3 className="text-xl font-display font-bold text-slate-900">
              {station.name}
            </h3>
          </div>
        </div>

        {/* Visual Location Card */}
        <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 mb-6">
          <div className="flex items-start gap-3 mb-4">
            <MapPin className="w-5 h-5 text-blue-900 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-slate-900 mb-1">
                {station.address}
              </p>
              <p className="text-xs text-slate-600">
                {station.neighborhood} • {station.city} - {station.state}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                CEP: {station.cep}
              </p>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-600">
            <span>Atendimento:</span>
            <span className="font-bold text-blue-900">{station.openingHours}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={handleCopy}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                copied
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Endereço Copiado!' : 'Copiar Endereço'}</span>
            </button>

            <button
              type="button"
              onClick={handleWhatsAppShare}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer"
            >
              <Share2 className="w-4 h-4" />
              <span>Compartilhar no WhatsApp</span>
            </button>
          </div>

          <a
            href={routeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-orange-500/20 transition-all cursor-pointer"
          >
            <Navigation className="w-4 h-4" />
            <span>Como Chegar (Traçar Rota no Google Maps)</span>
          </a>
        </div>
      </div>
    </div>
  );
};
