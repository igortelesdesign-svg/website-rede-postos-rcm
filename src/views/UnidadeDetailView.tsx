import React, { useState } from 'react';
import {
  MapPin,
  Clock,
  Phone,
  MessageCircle,
  Navigation,
  ArrowLeft,
  Share2,
  Copy,
  Check,
  CreditCard,
  Wrench,
  ShieldCheck,
  User,
  Sparkles,
  ExternalLink,
  Info
} from 'lucide-react';
import { StationUnit } from '../types';
import { useData } from '../context/DataContext';
import { GoogleMapEmbed } from '../components/GoogleMapEmbed';
import { ShareAddressModal } from '../components/ShareAddressModal';
import { RcmMascot } from '../components/RcmMascot';

interface UnidadeDetailViewProps {
  station: StationUnit;
  onBack: () => void;
  onSelectOtherStation?: (station: StationUnit) => void;
}

export const UnidadeDetailView: React.FC<UnidadeDetailViewProps> = ({
  station,
  onBack,
  onSelectOtherStation
}) => {
  const { stations, services, managers, products } = useData();

  const otherStations = stations.filter(s => s.id !== station.id);

  const mainPhoto = station.fotoCapa || station.photo || '/assets/rcm-joao-camara.jpeg';
  const [selectedPhoto, setSelectedPhoto] = useState<string>(mainPhoto);
  const [shareModalOpen, setShareModalOpen] = useState(false);
  const [copiedAddress, setCopiedAddress] = useState(false);

  // Find manager
  const manager = managers.find(m => m.id === (station.managerId || station.stationManagerId));

  // Find services for this unit
  const unitServices = services.filter(srv => (station.serviceIds || []).includes(srv.id));

  // Find featured products for this unit
  const unitProducts = products.filter(p => station.featuredProductIds ? station.featuredProductIds.includes(p.id) : p.featured);

  const unitName = station.nome || station.name;
  const unitCity = station.cidade || station.city;
  const unitState = station.estado || station.state;
  const unitAddress = station.endereco || station.address;

  const fullAddress = `${unitAddress}, ${station.neighborhood || ''}, ${unitCity} - ${unitState}, CEP ${station.cep || ''}`;
  const routeUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${unitName}, ${unitAddress}, ${unitCity} ${unitState}`
  )}`;

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(fullAddress);
      setCopiedAddress(true);
      setTimeout(() => setCopiedAddress(false), 2500);
    } catch {
      // Fallback
    }
  };

  const rawGallery = (station.galeriaFotos && station.galeriaFotos.length > 0)
    ? station.galeriaFotos
    : ((station.gallery && station.gallery.length > 0) ? station.gallery : []);
  const allPhotos = Array.from(new Set([mainPhoto, ...rawGallery]));

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20" id="rcm-unidade-detail">
      {/* Top back navigation bar */}
      <div className="bg-white border-b border-slate-200/80 sticky top-20 z-30 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-blue-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para todas as unidades</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShareModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Compartilhar Unidade</span>
            </button>

            <a
              href={routeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold shadow-xs transition-colors"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Traçar Rota</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-8">
        {/* Unit Title and Highlight Strip */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-blue-900 text-white text-xs font-bold uppercase tracking-wider">
                  {station.city} • {station.state}
                </span>
                {station.is24h && (
                  <span className="px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    Atendimento 24h
                  </span>
                )}
                {station.brandSubtext && (
                  <span className="text-xs font-semibold text-orange-600 uppercase tracking-wider">
                    {station.brandSubtext}
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-4xl font-display font-black text-slate-900 tracking-tight">
                {station.name}
              </h1>

              <p className="text-sm sm:text-base text-slate-600 flex items-center gap-2 mt-2">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0" />
                <span>{fullAddress}</span>
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {station.whatsapp && (
                <a
                  href={`https://wa.me/${station.whatsapp}?text=${encodeURIComponent(
                    `Olá! Estou vendo a página do ${station.name} no site da Rede RCM e gostaria de atendimento.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp da Unidade</span>
                </a>
              )}

              {station.phone && (
                <a
                  href={`tel:${station.phone.replace(/[^0-9]/g, '')}`}
                  className="flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm transition-colors"
                >
                  <Phone className="w-4 h-4 text-blue-900" />
                  <span>{station.phone}</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* 1. PHOTO GALLERY (Main image + Thumbnails) */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-4">
          <div className="relative h-80 sm:h-[450px] rounded-2xl overflow-hidden bg-slate-950">
            <img
              src={selectedPhoto}
              alt={station.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
            <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl text-white text-xs font-semibold">
              Galeria de Estrutura Oficial RCM
            </div>
          </div>

          {allPhotos.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-2">
              {allPhotos.map((photoUrl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSelectedPhoto(photoUrl)}
                  className={`relative shrink-0 w-24 h-18 rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedPhoto === photoUrl
                      ? 'border-orange-500 scale-105 shadow-md'
                      : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={photoUrl} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 2. CARD VISUAL DE LOCALIZAÇÃO (MANDATORY FROM PROMPT SPEC) */}
        <div className="bg-gradient-to-r from-blue-950 via-blue-900 to-indigo-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-blue-800">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 rounded-2xl bg-orange-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-orange-500/30">
                <MapPin className="w-7 h-7" />
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-orange-400">
                  Card de Localização RCM
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white">
                  {station.name}
                </h3>
                <p className="text-sm text-blue-100/90 mt-1 leading-relaxed max-w-xl">
                  {fullAddress}
                </p>
                <p className="text-xs text-blue-200/80 mt-1">
                  Horário de Atendimento: <strong>{station.openingHours}</strong>
                </p>
              </div>
            </div>

            {/* Visual Action Buttons */}
            <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
              <button
                type="button"
                onClick={handleCopyAddress}
                className={`flex-1 md:flex-initial flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-bold text-xs transition-all cursor-pointer ${
                  copiedAddress
                    ? 'bg-emerald-500 text-white'
                    : 'bg-white/10 hover:bg-white/20 text-white border border-white/20'
                }`}
              >
                {copiedAddress ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                <span>{copiedAddress ? 'Endereço Copiado!' : 'COPIAR ENDEREÇO'}</span>
              </button>

              <button
                type="button"
                onClick={() => setShareModalOpen(true)}
                className="flex-1 md:flex-initial flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-md shadow-orange-500/25 transition-all cursor-pointer"
              >
                <Share2 className="w-4 h-4" />
                <span>COMPARTILHAR</span>
              </button>

              <a
                href={routeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full md:w-auto flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-white text-blue-950 hover:bg-blue-50 font-extrabold text-xs shadow-md transition-all"
              >
                <Navigation className="w-4 h-4 text-orange-600" />
                <span>COMO CHEGAR</span>
              </a>
            </div>
          </div>

          {/* Interactive Google Map integrated into the detail page */}
          <div className="rounded-2xl overflow-hidden border border-white/10">
            <GoogleMapEmbed
              stations={[station]}
              selectedStationId={station.id}
              singleUnitMode={true}
              className="h-80"
            />
          </div>
        </div>

        {/* 3. GERENTE DA UNIDADE & INFORMAÇÕES COMPLETAS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Gerente da Unidade Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md flex flex-col justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1 rounded-full inline-block mb-4">
                Gestão & Liderança
              </span>
              <h3 className="text-xl font-display font-bold text-slate-900 mb-2">
                Gerente da Unidade
              </h3>
              <p className="text-xs text-slate-500 mb-6">
                Profissional responsável pela qualidade das operações e pelo atendimento nesta unidade.
              </p>

              {manager ? (
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-6">
                  <img
                    src={manager.photo}
                    alt={manager.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-white shadow-md"
                  />
                  <div>
                    <h4 className="font-bold text-slate-900 text-base">{manager.name}</h4>
                    <p className="text-xs text-orange-600 font-semibold">{manager.role}</p>
                    <p className="text-xs text-slate-500 mt-1">{manager.stationUnitName}</p>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 mb-6 flex items-center gap-3">
                  <User className="w-10 h-10 text-slate-400" />
                  <div>
                    <p className="font-bold text-slate-800 text-sm">Equipe Gerencial RCM</p>
                    <p className="text-xs text-slate-500">Plantão de Atendimento Presencial</p>
                  </div>
                </div>
              )}
            </div>

            {manager?.whatsapp && (
              <a
                href={`https://wa.me/${manager.whatsapp}?text=${encodeURIComponent(
                  `Olá ${manager.name}! Estou no site da Rede RCM e gostaria de falar com a gerência do ${station.name}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contato Comercial com a Gerência</span>
              </a>
            )}
          </div>

          {/* Histórico e Detalhes da Unidade */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full inline-block mb-3">
                História & Estrutura
              </span>
              <h3 className="text-xl font-display font-bold text-slate-900 mb-3">
                Sobre esta Unidade
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {station.history || `${station.name} foi incorporado à Rede RCM com o objetivo de oferecer uma parada de máxima segurança, conveniência e pontualidade na região de ${station.city}.`}
              </p>
            </div>

            {/* Formas de Pagamento Aceitas */}
            <div className="pt-4 border-t border-slate-100">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-blue-900" />
                <span>Formas de Pagamento Aceitas</span>
              </h4>
              <div className="flex flex-wrap gap-2">
                {(station.paymentMethods || ['Dinheiro', 'PIX', 'Cartão Débito/Crédito']).map((pm: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold border border-slate-200"
                  >
                    {pm}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* 4. SERVIÇOS DISPONÍVEIS COM ÍCONES EXPLICATIVOS */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md">
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1 rounded-full inline-block mb-2">
              Comodidades
            </span>
            <h3 className="text-2xl font-display font-bold text-slate-900">
              Serviços Disponíveis no {station.name}
            </h3>
            <p className="text-slate-500 text-sm mt-1">
              Confira os serviços que você encontra prontos para lhe atender nesta unidade.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {unitServices.map(srv => (
              <div
                key={srv.id}
                className="p-5 rounded-2xl bg-slate-50 border border-slate-200 hover:border-orange-500/50 transition-colors"
              >
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-blue-900/10 text-blue-900 flex items-center justify-center">
                    <Wrench className="w-5 h-5 text-orange-500" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">{srv.name}</h4>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {srv.shortDescription}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 5. PRODUTOS EM DESTAQUE NA UNIDADE */}
        {unitProducts.length > 0 && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full inline-block mb-2">
                  Vitrine da Loja
                </span>
                <h3 className="text-2xl font-display font-bold text-slate-900">
                  Produtos em Destaque nesta Unidade
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {unitProducts.map(prod => (
                <div
                  key={prod.id}
                  className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col justify-between"
                >
                  <div>
                    <img
                      src={prod.photo}
                      alt={prod.name}
                      className="w-full h-36 object-cover rounded-xl mb-3"
                    />
                    <span className="text-[10px] font-bold text-orange-600 uppercase">
                      {prod.brand}
                    </span>
                    <h5 className="font-bold text-slate-900 text-xs sm:text-sm line-clamp-2">
                      {prod.name}
                    </h5>
                  </div>
                  <a
                    href={`https://wa.me/${station.whatsapp || '5584998765432'}?text=${encodeURIComponent(
                      `Olá! Gostaria de saber sobre o produto ${prod.name} disponível na unidade ${station.name}.`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 block text-center py-2 px-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs"
                  >
                    Consultar Disponibilidade
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}
        {/* Outras Unidades RCM */}
        {otherStations.length > 0 && onSelectOtherStation && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md">
            <div className="flex items-center justify-between mb-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                  Rede em Expansão
                </span>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 mt-2">
                  Conheça Também Outras Unidades RCM
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {otherStations.slice(0, 3).map((other) => (
                <button
                  key={other.id}
                  type="button"
                  onClick={() => {
                    onSelectOtherStation(other);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="p-4 rounded-2xl border border-slate-200 hover:border-orange-500 hover:shadow-md transition-all text-left group cursor-pointer bg-slate-50/50 hover:bg-white"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={other.photo}
                      alt={other.name}
                      className="w-16 h-16 rounded-xl object-cover"
                    />
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-900">
                        {other.city} • {other.state}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm group-hover:text-orange-600 transition-colors">
                        {other.name}
                      </h4>
                      <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                        {other.address}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Share Address Modal */}
      <ShareAddressModal
        station={station}
        isOpen={shareModalOpen}
        onClose={() => setShareModalOpen(false)}
      />
    </div>
  );
};
