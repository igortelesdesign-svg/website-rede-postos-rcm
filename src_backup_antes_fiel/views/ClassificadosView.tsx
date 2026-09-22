import React, { useState, useMemo } from 'react';
import {
  Store,
  MapPin,
  Maximize2,
  Tag,
  MessageCircle,
  Search,
  Filter,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Building
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { ClassifiedItem } from '../types';
import { RcmMascot } from '../components/RcmMascot';

export const ClassificadosView: React.FC = () => {
  const { classifieds, stations } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedVocation, setSelectedVocation] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  const cities = useMemo(() => {
    return Array.from(new Set(classifieds.map(c => c.city)));
  }, [classifieds]);

  const vocations = useMemo(() => {
    return Array.from(new Set(classifieds.map(c => c.vocationCategory || c.type || 'Comercial')));
  }, [classifieds]);

  const filteredClassifieds = useMemo(() => {
    return classifieds.filter(item => {
      const term = searchTerm.toLowerCase().trim();
      const vocationText = item.vocation || item.type || '';
      const matchesSearch =
        !term ||
        item.title.toLowerCase().includes(term) ||
        item.stationUnitName.toLowerCase().includes(term) ||
        item.city.toLowerCase().includes(term) ||
        item.description.toLowerCase().includes(term) ||
        vocationText.toLowerCase().includes(term);

      const matchesCity = selectedCity === 'all' || item.city === selectedCity;
      const matchesVocation = selectedVocation === 'all' || (item.vocationCategory || item.type) === selectedVocation;
      const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;

      return matchesSearch && matchesCity && matchesVocation && matchesStatus;
    });
  }, [classifieds, searchTerm, selectedCity, selectedVocation, selectedStatus]);

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20" id="rcm-classificados-view">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <span className="inline-block px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 font-bold text-xs uppercase tracking-wider border border-orange-500/30">
              Oportunidades Comerciais
            </span>
            <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight">
              CLASSIFICADOS & ESPAÇOS COMERCIAIS
            </h1>
            <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed">
              Traga o seu empreendimento para a Rede RCM. Lojas, quiosques e pontos estratégicos com fluxo garantido de centenas de motoristas por dia.
            </p>
          </div>

          <div className="shrink-0">
            <RcmMascot
              context="classificados"
              size="sm"
              position="inline"
            />
          </div>
        </div>
      </section>

      {/* Main Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Search & Filters */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md mb-10 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="md:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por tipo de ponto, unidade ou atividade..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-900 text-xs sm:text-sm text-slate-800"
              />
            </div>

            <div className="md:col-span-3">
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-900 text-xs sm:text-sm text-slate-700 font-medium"
              >
                <option value="all">Todas as Cidades</option>
                {cities.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <select
                value={selectedVocation}
                onChange={(e) => setSelectedVocation(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-900 text-xs sm:text-sm text-slate-700 font-medium"
              >
                <option value="all">Tipo de Negócio</option>
                {vocations.map(v => (
                  <option key={v} value={v}>{v}</option>
                ))}
              </select>
            </div>

            <div className="md:col-span-2">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="w-full py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-900 text-xs sm:text-sm text-slate-700 font-medium"
              >
                <option value="all">Todos os Status</option>
                <option value="DISPONÍVEL">Disponíveis</option>
                <option value="EM NEGOCIAÇÃO">Em Negociação</option>
                <option value="ALUGADO">Alugados</option>
              </select>
            </div>
          </div>
        </div>

        {/* Classifieds Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredClassifieds.map(item => {
            const isAvailable = item.status === 'DISPONÍVEL';
            const statusBg = isAvailable
              ? 'bg-emerald-600'
              : item.status === 'EM NEGOCIAÇÃO'
              ? 'bg-amber-600'
              : 'bg-slate-600';

            const waMessage = `Olá! Vi o anúncio de locação de espaço comercial na Rede RCM: *${item.title}* no *${item.stationUnitName}* (${item.city}-${item.state}). Gostaria de saber valores e condições para locação.`;
            const waUrl = `https://wa.me/${item.contactWhatsapp}?text=${encodeURIComponent(waMessage)}`;

            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-56 bg-slate-100 overflow-hidden">
                    <img
                      src={item.photos[0]}
                      alt={item.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-white font-bold text-xs shadow-md ${statusBg}`}>
                      {item.status}
                    </span>
                    <span className="absolute bottom-3 right-3 bg-white/95 px-2.5 py-1 rounded-lg text-xs font-bold text-slate-800 shadow-md flex items-center gap-1">
                      <Maximize2 className="w-3.5 h-3.5 text-orange-500" />
                      {item.areaM2 || `${item.area} m²`}
                    </span>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-1.5 text-xs text-orange-600 font-bold mb-1">
                      <Store className="w-3.5 h-3.5" />
                      <span>{item.stationUnitName}</span>
                    </div>

                    <h3 className="text-lg font-display font-bold text-slate-900 mb-2">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-500 flex items-center gap-1 mb-3">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {item.city} - {item.state}
                    </p>

                    <div className="p-3 bg-blue-50/70 rounded-xl text-xs text-blue-950 font-medium mb-3 border border-blue-100">
                      <span className="font-bold block mb-0.5 text-blue-900">Vocação do Ponto:</span>
                      <span>{item.vocation || item.type || 'Ponto Comercial'}</span>
                    </div>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-md transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>TENHO INTERESSE NESTE ESPAÇO</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
