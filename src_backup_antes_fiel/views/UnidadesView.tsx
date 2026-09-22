import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Search,
  Filter,
  Clock,
  Wrench,
  Store,
  Fuel,
  Navigation,
  Sparkles,
  X,
  SlidersHorizontal,
  Check
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { StationUnit } from '../types';
import { StationCard } from '../components/StationCard';
import { GoogleMapEmbed } from '../components/GoogleMapEmbed';
import { RcmMascot } from '../components/RcmMascot';

interface UnidadesViewProps {
  onSelectUnit: (station: StationUnit) => void;
}

export const UnidadesView: React.FC<UnidadesViewProps> = ({ onSelectUnit }) => {
  const { stations, services } = useData();

  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');
  const [selectedState, setSelectedState] = useState('all');
  const [only24h, setOnly24h] = useState(false);
  const [onlyConvenience, setOnlyConvenience] = useState(false);
  const [onlyOilChange, setOnlyOilChange] = useState(false);
  const [selectedServiceFilter, setSelectedServiceFilter] = useState('all');
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');

  const cities = useMemo(() => Array.from(new Set(stations.map(s => s.city))), [stations]);
  const states = useMemo(() => Array.from(new Set(stations.map(s => s.state))), [stations]);

  // Filter logic
  const filteredStations = useMemo(() => {
    return stations.filter(st => {
      // Text search
      const term = searchTerm.toLowerCase().trim();
      const matchesText =
        !term ||
        st.name.toLowerCase().includes(term) ||
        st.address.toLowerCase().includes(term) ||
        st.city.toLowerCase().includes(term) ||
        st.neighborhood.toLowerCase().includes(term);

      // City & State
      const matchesCity = selectedCity === 'all' || st.city === selectedCity;
      const matchesState = selectedState === 'all' || st.state === selectedState;

      // 24 Hours filter
      const matches24h = !only24h || Boolean(st.is24h) || st.openingHours.includes('24h') || st.openingHours.includes('24 Horas');

      // Convenience store filter (check if service 'srv-1' is included or in services)
      const matchesConvenience = !onlyConvenience || st.serviceIds.includes('srv-1');

      // Oil change filter (service 'srv-2')
      const matchesOilChange = !onlyOilChange || st.serviceIds.includes('srv-2');

      // Specific service
      const matchesSpecificService =
        selectedServiceFilter === 'all' || st.serviceIds.includes(selectedServiceFilter);

      return (
        matchesText &&
        matchesCity &&
        matchesState &&
        matches24h &&
        matchesConvenience &&
        matchesOilChange &&
        matchesSpecificService
      );
    });
  }, [
    stations,
    searchTerm,
    selectedCity,
    selectedState,
    only24h,
    onlyConvenience,
    onlyOilChange,
    selectedServiceFilter
  ]);

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedCity('all');
    setSelectedState('all');
    setOnly24h(false);
    setOnlyConvenience(false);
    setOnlyOilChange(false);
    setSelectedServiceFilter('all');
  };

  const hasActiveFilters =
    searchTerm !== '' ||
    selectedCity !== 'all' ||
    selectedState !== 'all' ||
    only24h ||
    onlyConvenience ||
    onlyOilChange ||
    selectedServiceFilter !== 'all';

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20" id="rcm-unidades-view">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl text-center md:text-left">
              <span className="inline-block px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 font-bold text-xs uppercase tracking-wider border border-orange-500/30">
                Capilaridade & Presença
              </span>
              <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight">
                NOSSAS UNIDADES
              </h1>
              <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed">
                Encontre o posto RCM mais próximo de você. Todas as nossas unidades contam com combustíveis certificados, equipe treinada e estrutura completa.
              </p>
            </div>

            {/* Mascot Tip */}
            <div className="shrink-0">
              <RcmMascot
                context="unidades"
                size="sm"
                position="inline"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area with Filters & Listings */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* View Toggle Bar (Grid vs Map) */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm font-semibold text-slate-700">
              Mostrando <span className="text-blue-900 font-bold">{filteredStations.length}</span> unidades disponíveis
            </p>
          </div>

          <div className="flex items-center gap-2 bg-white p-1 rounded-xl border border-slate-200 shadow-xs">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-blue-900'
              }`}
            >
              Lista em Cards
            </button>
            <button
              type="button"
              onClick={() => setViewMode('map')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors cursor-pointer ${
                viewMode === 'map'
                  ? 'bg-blue-900 text-white shadow-xs'
                  : 'text-slate-600 hover:text-blue-900'
              }`}
            >
              Mapa Integrado
            </button>
          </div>
        </div>

        {/* Filter Panel */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md mb-8">
          <div className="space-y-4">
            {/* Top row: search + city + state */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
              <div className="md:col-span-6 relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Buscar por nome da unidade, rua ou bairro..."
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

              <div className="md:col-span-3">
                <select
                  value={selectedState}
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-900 text-xs sm:text-sm text-slate-700 font-medium"
                >
                  <option value="all">Todos os Estados</option>
                  {states.map(st => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quick Filter Chips */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1 flex items-center gap-1">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Filtros Rápidos:
              </span>

              {/* 24h toggle */}
              <button
                type="button"
                onClick={() => setOnly24h(!only24h)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  only24h
                    ? 'bg-orange-500 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Postos 24 Horas</span>
                {only24h && <Check className="w-3 h-3" />}
              </button>

              {/* Loja de Conveniência */}
              <button
                type="button"
                onClick={() => setOnlyConvenience(!onlyConvenience)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  onlyConvenience
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                <span>Com Loja de Conveniência</span>
                {onlyConvenience && <Check className="w-3 h-3" />}
              </button>

              {/* Troca de Óleo */}
              <button
                type="button"
                onClick={() => setOnlyOilChange(!onlyOilChange)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  onlyOilChange
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Wrench className="w-3.5 h-3.5" />
                <span>Com Troca de Óleo RCM</span>
                {onlyOilChange && <Check className="w-3 h-3" />}
              </button>

              {hasActiveFilters && (
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold text-red-600 hover:bg-red-50 transition-colors flex items-center gap-1 ml-auto cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Limpar Filtros</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* View Mode: Map or Grid */}
        {viewMode === 'map' ? (
          <div className="space-y-4 mb-12">
            <GoogleMapEmbed
              stations={filteredStations}
              onSelectStation={onSelectUnit}
              className="h-[500px]"
            />
            <p className="text-xs text-slate-500 text-center">
              Clique nos marcadores do mapa ou na lista inferior para selecionar a unidade e traçar sua rota.
            </p>
          </div>
        ) : (
          <div>
            {filteredStations.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 p-8">
                <MapPin className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h3 className="text-lg font-bold text-slate-800">Nenhuma unidade encontrada</h3>
                <p className="text-sm text-slate-500 mt-1 mb-4">
                  Não encontramos unidades que correspondam aos filtros selecionados.
                </p>
                <button
                  type="button"
                  onClick={clearAllFilters}
                  className="px-4 py-2 rounded-xl bg-blue-900 text-white text-xs font-bold"
                >
                  Limpar Todos os Filtros
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {filteredStations.map(station => (
                  <StationCard
                    key={station.id}
                    station={station}
                    onViewUnit={onSelectUnit}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};
