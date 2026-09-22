import React from 'react';
import {
  Truck,
  ShieldCheck,
  Navigation,
  CheckCircle2,
  Clock,
  Award,
  Phone,
  MessageCircle,
  ExternalLink,
  Cpu
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { RcmMascot } from '../components/RcmMascot';

export const TransportadoraView: React.FC = () => {
  const { transporter } = useData();

  const waUrl = `https://wa.me/5584998765432?text=${encodeURIComponent(
    'Olá! Gostaria de falar com o departamento operacional da Transportadora RCM sobre parcerias e logística.'
  )}`;

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20" id="rcm-transportadora-view">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="/assets/rcm_transportadora.jpg"
            alt="Transportadora RCM"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <span className="inline-block px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 font-bold text-xs uppercase tracking-wider border border-orange-500/30">
              Autonomia Logística & Rastreabilidade
            </span>
            <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight">
              NOSSA TRANSPORTADORA
            </h1>
            <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed">
              O maior diferencial competitivo da Rede RCM: frota própria com telemetria avançada, lacres eletrônicos e controle de pureza desde a refinaria até as bombas dos nossos postos.
            </p>
          </div>

          <div className="shrink-0">
            <RcmMascot
              context="transportadora"
              size="sm"
              position="inline"
            />
          </div>
        </div>
      </section>

      {/* Main Narrative & Fleet Metrics */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        {/* Metrics Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm text-center">
            <Truck className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <p className="text-3xl font-display font-black text-blue-900">{transporter.fleetCount}</p>
            <p className="text-xs text-slate-500 uppercase tracking-wider mt-1">Carretas Tanque Ativas</p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm text-center">
            <ShieldCheck className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
            <p className="text-3xl font-display font-black text-blue-900">{transporter.securityRating || '100%'}</p>
            <p className="text-xs text-slate-500 uppercase tracking-wider mt-1">Rastreabilidade Satelital</p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm text-center">
            <Clock className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <p className="text-3xl font-display font-black text-blue-900">{transporter.punctualityRate}</p>
            <p className="text-xs text-slate-500 uppercase tracking-wider mt-1">Índice de Pontualidade</p>
          </div>

          <div className="p-6 rounded-3xl bg-white border border-slate-200 shadow-sm text-center">
            <Award className="w-8 h-8 text-blue-900 mx-auto mb-2" />
            <p className="text-3xl font-display font-black text-blue-900">100%</p>
            <p className="text-xs text-slate-500 uppercase tracking-wider mt-1">Motoristas Certificados MOPE</p>
          </div>
        </div>

        {/* Narrative Block with Big Photo */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/80 shadow-md">
          <div className="lg:col-span-6 space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1 rounded-full">
              Origem Garantida
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900">
              O Rigor que Começa na Base de Distribuição
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {transporter.history || 'A transportadora própria da Rede RCM nasceu da determinação inegociável de garantir a procedência absoluta de cada gota de combustível entregue em nossas unidades.'}
            </p>
            <p className="text-slate-600 text-sm leading-relaxed">
              Ao não terceirizar o transporte, a <strong>Rede de Postos RCM</strong> anula qualquer risco de desvio de padrão ou adulteração em trânsito. Nossos tanques são lacrados digitalmente logo após o carregamento na base e inspecionados rigorosamente antes do descarregamento em cada posto.
            </p>

            <div className="pt-2">
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Contato Operacional / Parcerias de Transporte</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-slate-100 relative group">
              <img
                src="/assets/rcm_transportadora.jpg"
                alt="Caminhão Tanque RCM"
                className="w-full h-80 sm:h-96 object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute bottom-4 left-4 right-4 bg-blue-950/85 backdrop-blur-md p-3.5 rounded-2xl text-white text-xs">
                <span className="font-bold text-orange-400 block mb-0.5">Segurança em Primeiro Lugar</span>
                <span>Veículos equipados com telemetria, corte de combustível de emergência e válvulas de fundo pneumáticas.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Pilares Tecnológicos e Procedimentos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-blue-900 text-white flex items-center justify-center mb-4">
              <Cpu className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-display font-bold text-slate-900 mb-2">
              Telemetria & Rastreamento 24h
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Nossa central de tráfego acompanha em tempo real a velocidade, temperatura da carga, rotas autorizadas e paradas de cada composição com alertas automatizados.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-display font-bold text-slate-900 mb-2">
              Conformidade Ambiental & Cargas Perigosas
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Licenciamentos ambientais rigorosamente em dia, tanques isotérmicos de alumínio com certificação INMETRO e kit completo de mitigação para emergências.
            </p>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-blue-950 text-white flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-display font-bold text-slate-900 mb-2">
              Motoristas Certificados & Treinados
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Todos os condutores realizam reciclagem periódica em Direção Defensiva, NR-20, Primeiros Socorros e procedimentos de descarga segura sem vapores.
            </p>
          </div>
        </div>

        {/* Galeria da Frota */}
        <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Galeria da Frota
            </span>
            <h3 className="text-2xl font-display font-bold text-slate-900 mt-1">
              Nossa Frota em Operação nas Estradas
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {(transporter.fleetPhotos || transporter.gallery || ['/assets/rcm_transportadora.jpg']).map((img: string, idx: number) => (
              <div key={idx} className="rounded-2xl overflow-hidden h-64 bg-slate-100">
                <img src={img} alt="Frota RCM" className="w-full h-full object-cover hover:scale-102 transition-transform" />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
