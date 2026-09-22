import React, { useState } from 'react';
import { MapPin, Navigation, ExternalLink, ZoomIn, ZoomOut, Layers } from 'lucide-react';
import { StationUnit } from '../types';

interface GoogleMapEmbedProps {
  stations: StationUnit[];
  selectedStationId?: string;
  onSelectStation?: (station: StationUnit) => void;
  singleUnitMode?: boolean;
  className?: string;
}

export const GoogleMapEmbed: React.FC<GoogleMapEmbedProps> = ({
  stations,
  selectedStationId,
  onSelectStation,
  singleUnitMode = false,
  className = ''
}) => {
  const [activeStation, setActiveStation] = useState<StationUnit | undefined>(() => {
    if (selectedStationId) {
      return stations.find(s => s.id === selectedStationId);
    }
    return stations[0];
  });

  const [mapType, setMapType] = useState<'roadmap' | 'satellite'>('roadmap');

  const current = stations.find(s => s.id === selectedStationId) || activeStation || stations[0];

  const handleMarkerClick = (st: StationUnit) => {
    setActiveStation(st);
    if (onSelectStation) {
      onSelectStation(st);
    }
  };

  const getEmbedUrl = () => {
    if (!current) return '';
    const query = encodeURIComponent(`${current.name}, ${current.address}, ${current.city} - ${current.state}`);
    const t = mapType === 'satellite' ? 'k' : 'm';
    return `https://maps.google.com/maps?q=${query}&t=${t}&z=15&ie=UTF8&iwloc=&output=embed`;
  };

  return (
    <div className={`relative overflow-hidden rounded-2xl bg-slate-900 border border-slate-200/80 shadow-md ${className}`}>
      {/* Map Header / Controls Overlay */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2">
        <div className="bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl shadow-md border border-slate-200/60 text-xs font-bold text-blue-950 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-orange-500" />
          <span>{singleUnitMode ? current?.name : `Unidades RCM no Mapa (${stations.length})`}</span>
        </div>

        <button
          type="button"
          onClick={() => setMapType(mapType === 'roadmap' ? 'satellite' : 'roadmap')}
          className="bg-white/90 hover:bg-white px-2.5 py-1.5 rounded-xl shadow-md text-xs font-semibold text-slate-700 hover:text-blue-900 flex items-center gap-1.5 transition-colors cursor-pointer"
          title="Alternar Satélite / Mapa"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>{mapType === 'roadmap' ? 'Satélite' : 'Mapa'}</span>
        </button>
      </div>

      {/* Floating Station Selector Pills when in multi-station view */}
      {!singleUnitMode && stations.length > 1 && (
        <div className="absolute bottom-4 left-4 right-4 z-20 overflow-x-auto pb-1 flex items-center gap-2 pointer-events-auto">
          {stations.map(st => {
            const isSelected = st.id === current?.id;
            return (
              <button
                key={st.id}
                type="button"
                onClick={() => handleMarkerClick(st)}
                className={`shrink-0 px-3 py-2 rounded-xl text-xs font-bold transition-all shadow-lg flex items-center gap-2 cursor-pointer ${
                  isSelected
                    ? 'bg-blue-900 text-white ring-2 ring-orange-500 scale-102'
                    : 'bg-white/95 text-slate-800 hover:bg-white hover:text-blue-900'
                }`}
              >
                <div className={`w-2 h-2 rounded-full ${isSelected ? 'bg-orange-500' : 'bg-slate-400'}`} />
                <span>{st.name}</span>
                <span className="text-[10px] opacity-75 font-normal">({st.city})</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Real Interactive Google Maps Iframe */}
      <div className="w-full h-80 sm:h-96 md:h-[450px]">
        {current && (
          <iframe
            title={`Mapa ${current.name}`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={getEmbedUrl()}
            className="w-full h-full grayscale-[15%] contrast-[105%]"
          />
        )}
      </div>

      {/* Top right direct navigation button */}
      {current && (
        <div className="absolute top-4 right-4 z-20">
          <a
            href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
              `${current.name}, ${current.address}, ${current.city} ${current.state}`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-lg shadow-orange-500/30 transition-all hover:scale-105 cursor-pointer"
          >
            <Navigation className="w-4 h-4" />
            <span>Como Chegar</span>
          </a>
        </div>
      )}
    </div>
  );
};
