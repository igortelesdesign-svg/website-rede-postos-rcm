import React from 'react';
import { MapPin, Navigation, Clock, ChevronRight, Phone, MessageCircle, Sparkles } from 'lucide-react';
import { StationUnit } from '../types';
import { useData } from '../context/DataContext';

interface StationCardProps {
  station: StationUnit;
  onViewUnit: (station: StationUnit) => void;
}

export const StationCard: React.FC<StationCardProps> = ({ station, onViewUnit }) => {
  const { services } = useData();

  const stationServices = services.filter(srv => (station.serviceIds || []).includes(srv.id));
  const photoSrc = station.fotoCapa || station.photo || '/assets/rcm-joao-camara.jpeg';
  const unitName = station.nome || station.name;
  const unitCity = station.cidade || station.city;
  const unitState = station.estado || station.state;
  const unitAddress = station.endereco || station.address;
  const unitHours = station.horario || station.openingHours || '24 Horas';

  const routeUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
    `${unitName}, ${unitAddress}, ${unitCity} ${unitState}`
  )}`;

  return (
    <div
      id={`station-card-${station.id}`}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col hover:-translate-y-1"
    >
      {/* FOTO REAL with City Badge */}
      <div className="relative h-52 sm:h-56 overflow-hidden bg-blue-950">
        <img
          src={photoSrc}
          alt={unitName}
          className="absolute inset-0 w-full h-full object-cover z-0 transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Filtro azul sobre a fotografia */}
        <div className="absolute inset-0 z-10 bg-blue-950/55 pointer-events-none" />
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-blue-950/90 via-blue-950/35 to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute z-20 top-3 left-3 flex items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-blue-900/90 backdrop-blur-md text-white font-bold text-xs shadow-md">
            {unitCity} • {unitState}
          </span>
          {station.featured && (
            <span className="px-2.5 py-1 rounded-full bg-orange-500 text-white font-bold text-[11px] shadow-md flex items-center gap-1">
              <Sparkles className="w-3 h-3" />
              Unidade Real
            </span>
          )}
        </div>

        {/* Opening hours badge */}
        <div className="absolute z-20 bottom-3 left-3 flex items-center gap-1.5 text-xs font-semibold text-white/95 drop-shadow-md">
          <Clock className="w-3.5 h-3.5 text-orange-400" />
          <span>{unitHours}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="mb-2">
            <h3 className="text-lg sm:text-xl font-display font-bold text-slate-900 group-hover:text-blue-900 transition-colors">
              {unitName}
            </h3>
            {station.brandSubtext && (
              <p className="text-xs font-medium text-orange-600 uppercase tracking-wider">
                {station.brandSubtext}
              </p>
            )}
          </div>

          <p className="text-xs sm:text-sm text-slate-600 flex items-start gap-1.5 mb-4 leading-relaxed">
            <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
            <span>{unitAddress}</span>
          </p>

          {/* Key Services Preview */}
          <div className="mb-5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Serviços Principais
            </span>
            <div className="flex flex-wrap gap-1.5">
              {stationServices.length > 0 ? (
                stationServices.slice(0, 3).map(srv => (
                  <span
                    key={srv.id}
                    className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-900 text-xs font-medium border border-blue-100"
                  >
                    {srv.name.split(' ')[0]} {srv.name.split(' ')[1] || ''}
                  </span>
                ))
              ) : (
                (station.servicos || ['Abastecimento Certificado', 'Conveniência', 'Calibragem']).slice(0, 3).map((srv, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-900 text-xs font-medium border border-blue-100"
                  >
                    {srv}
                  </span>
                ))
              )}
              {stationServices.length > 3 && (
                <span className="px-2 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-semibold">
                  +{stationServices.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Action Buttons: Ver unidade & Como chegar */}
        <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => onViewUnit(station)}
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs transition-colors cursor-pointer"
          >
            <span>Ver Unidade</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          <a
            href={routeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-orange-50 hover:bg-orange-100 text-orange-700 font-bold text-xs border border-orange-200 transition-colors"
          >
            <Navigation className="w-3.5 h-3.5 text-orange-600" />
            <span>Como Chegar</span>
          </a>
        </div>
      </div>
    </div>
  );
};
