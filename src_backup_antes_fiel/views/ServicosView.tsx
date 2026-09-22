import React from 'react';
import {
  Wrench,
  Fuel,
  ShieldCheck,
  Droplets,
  Store,
  Sparkles,
  MapPin,
  Truck,
  CheckCircle2,
  ChevronRight,
  Clock,
  Compass
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { RcmMascot } from '../components/RcmMascot';
import { ViewTab } from '../components/Navbar';

interface ServicosViewProps {
  setActiveTab: (tab: ViewTab) => void;
}

export const ServicosView: React.FC<ServicosViewProps> = ({ setActiveTab }) => {
  const { services, stations } = useData();

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20" id="rcm-servicos-view">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <span className="inline-block px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 font-bold text-xs uppercase tracking-wider border border-orange-500/30">
              Comodidade & Excelência em Pista
            </span>
            <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight">
              SERVIÇOS DA REDE RCM
            </h1>
            <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed">
              Infraestrutura de ponta, equipamentos modernos e profissionais treinados para garantir sua tranquilidade, do cuidado com o veículo ao conforto da sua parada.
            </p>
          </div>

          <div className="shrink-0">
            <RcmMascot
              context="servicos"
              size="sm"
              position="inline"
            />
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map(srv => {
            // Find which stations offer this service
            const offeringStations = stations.filter(st => st.serviceIds.includes(srv.id));

            return (
              <div
                key={srv.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md hover:shadow-xl transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-900 to-blue-800 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-900/20">
                      <Wrench className="w-7 h-7 text-orange-400" />
                    </div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-100 px-3 py-1 rounded-full">
                      Disponível em {offeringStations.length} postos
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-slate-900 mb-2">
                    {srv.name}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6">
                    {srv.fullDescription}
                  </p>

                  {/* Benefícios */}
                  <div className="mb-6">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Vantagens para Você:
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {srv.benefits.map((benefit, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2 rounded-xl">
                          <CheckCircle2 className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Unidades que oferecem */}
                  <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-100 mb-6">
                    <span className="text-xs font-bold text-blue-950 block mb-1.5 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-orange-600" />
                      Postos RCM com este serviço:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {offeringStations.map(st => (
                        <span
                          key={st.id}
                          className="px-2.5 py-1 rounded-lg bg-white text-blue-900 font-semibold text-[11px] border border-blue-200/80 shadow-2xs"
                        >
                          {st.name} ({st.city})
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CTA Button */}
                <button
                  type="button"
                  onClick={() => setActiveTab('unidades')}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-xs sm:text-sm transition-all cursor-pointer"
                >
                  <MapPin className="w-4 h-4 text-orange-400" />
                  <span>ENCONTRE UMA UNIDADE COM ESTE SERVIÇO</span>
                </button>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
