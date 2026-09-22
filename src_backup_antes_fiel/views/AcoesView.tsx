import React, { useState } from 'react';
import {
  Sparkles,
  Calendar,
  Users,
  Award,
  ChevronRight,
  HeartHandshake,
  Tag
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { ActionItem } from '../types';

export const AcoesView: React.FC = () => {
  const { actions } = useData();

  const [selectedAction, setSelectedAction] = useState<ActionItem | null>(null);

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20" id="rcm-acoes-view">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-3 text-center max-w-3xl">
          <span className="inline-block px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 font-bold text-xs uppercase tracking-wider border border-orange-500/30">
            Pessoas, Treinamentos & Comunidade
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight">
            AÇÕES RCM
          </h1>
          <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed">
            Conheça as iniciativas que fazem a diferença: capacitação técnica contínua dos nossos colaboradores, campanhas de segurança, solidariedade e celebrações internas.
          </p>
        </div>
      </section>

      {/* Main Actions Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {actions.map(act => (
            <div
              key={act.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="relative h-60 bg-slate-100 overflow-hidden">
                  <img
                    src={act.coverImage}
                    alt={act.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full bg-orange-500 text-white font-bold text-xs shadow-md">
                      {act.category || act.type}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-xs text-slate-400 mb-2">
                    <Calendar className="w-3.5 h-3.5 text-orange-500" />
                    <span>{act.date}</span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-slate-900 mb-2">
                    {act.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-4">
                    {act.description}
                  </p>

                  {/* Highlights / Bullets */}
                  {act.highlights && act.highlights.length > 0 && (
                    <div className="space-y-1.5 pt-3 border-t border-slate-100">
                      {act.highlights.map((h: string, i: number) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-900" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {act.gallery && act.gallery.length > 0 && (
                <div className="p-6 pt-0">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Fotos do Evento:
                  </span>
                  <div className="flex gap-2">
                    {act.gallery.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt=""
                        className="w-14 h-14 rounded-xl object-cover border border-slate-200"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
