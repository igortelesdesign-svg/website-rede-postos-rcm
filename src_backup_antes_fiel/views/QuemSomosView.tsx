import React from 'react';
import {
  ShieldCheck,
  HeartHandshake,
  TrendingUp,
  Award,
  Users,
  CheckCircle2,
  Calendar,
  Sparkles,
  MapPin,
  ChevronRight
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { RcmMascot } from '../components/RcmMascot';
import { ViewTab } from '../components/Navbar';

interface QuemSomosViewProps {
  setActiveTab: (tab: ViewTab) => void;
}

export const QuemSomosView: React.FC<QuemSomosViewProps> = ({ setActiveTab }) => {
  const { milestones } = useData();

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20" id="rcm-quem-somos-view">
      {/* Header Banner */}
      <section className="relative bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 text-white py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-20">
          <img
            src="/assets/rcm_station_hero.jpg"
            alt="Rede RCM Banner"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider border border-orange-500/30">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Nossa Trajetória Institucional</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight">
            QUEM SOMOS: A FORÇA DA REDE RCM
          </h1>
          <p className="text-base sm:text-xl text-blue-100/90 font-light max-w-3xl mx-auto leading-relaxed">
            Uma história construída com integridade, combustíveis de alta pureza, inovação constante e relacionamento verdadeiro com clientes, parceiros e colaboradores.
          </p>
        </div>
      </section>

      {/* Main Narrative with Photo */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 tracking-tight leading-tight">
              Mais do que postos de combustível: somos pontos de conexão humana e segurança na estrada
            </h2>
            <p className="text-slate-700 leading-relaxed">
              Fundada com o propósito de redefinir o padrão de atendimento e credibilidade no mercado de combustíveis, a <strong>Rede de Postos RCM</strong> expandiu-se com base em um princípio inegociável: <em>o respeito irrestrito a quem confia no nosso trabalho</em>.
            </p>
            <p className="text-slate-600 leading-relaxed text-sm">
              Cada unidade da nossa rede é planejada e mantida como um porto seguro para o motorista particular, o trabalhador de aplicativo, as famílias em viagem e as frotas corporativas. Nossas pistas oferecem o teste de qualidade aberto e na hora, demonstrando nossa transparência absoluta.
            </p>
            <p className="text-slate-600 leading-relaxed text-sm">
              Com frota própria através da nossa transportadora e centros integrados de conveniência e serviços mecânicos rápidos, entregamos um ecossistema completo de mobilidade e bem-estar regional.
            </p>

            <div className="pt-2 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <p className="text-2xl font-bold font-display text-blue-900">100%</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Combustíveis Certificados</p>
              </div>
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-xs">
                <p className="text-2xl font-bold font-display text-orange-600">Zero</p>
                <p className="text-xs text-slate-500 font-medium mt-0.5">Tolerância a Adulterações</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-4">
            <div className="rounded-3xl overflow-hidden shadow-xl border border-slate-200 relative group">
              <img
                src="/assets/rcm_station_hero.jpg"
                alt="Posto RCM Flagship"
                className="w-full h-80 sm:h-96 object-cover group-hover:scale-103 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-950/75 via-transparent to-transparent flex items-end p-6 text-white">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-orange-400">Infraestrutura Modelo</span>
                  <p className="font-display font-bold text-lg">Padrão RCM em Cada Unidade</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Missão, Visão e Valores */}
      <section className="bg-white py-16 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1 rounded-full">
              Pilares Estratégicos
            </span>
            <h2 className="text-3xl font-display font-bold text-slate-900 mt-2">
              MISSÃO, VISÃO E NOSSOS VALORES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:border-blue-900/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-blue-900 text-white flex items-center justify-center mb-6 shadow-md shadow-blue-900/20">
                  <ShieldCheck className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-display font-bold text-blue-900 mb-3">
                  Nossa Missão
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Garantir mobilidade segura e confiável fornecendo combustíveis de máxima pureza, serviços de alta conveniência e atendimento humano que faz cada cliente se sentir em casa.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:border-orange-500/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-orange-500 text-white flex items-center justify-center mb-6 shadow-md shadow-orange-500/20">
                  <TrendingUp className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-display font-bold text-slate-900 mb-3">
                  Nossa Visão
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Consolidar a Rede RCM como a marca mais respeitada e preferida do segmento na região, expandindo com rentabilidade sustentável, inovação tecnológica e valorização das pessoas.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200 hover:border-blue-900/40 transition-all flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-blue-950 text-white flex items-center justify-center mb-6 shadow-md shadow-blue-950/20">
                  <HeartHandshake className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-display font-bold text-blue-950 mb-3">
                  Nossos Valores
                </h3>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                    <span><strong>Confiança Inegociável:</strong> Transparência e pureza.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                    <span><strong>Qualidade Rigorosa:</strong> Do transporte à bomba.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                    <span><strong>Proximidade Humana:</strong> Sorriso e respeito na pista.</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" />
                    <span><strong>Segurança Operacional:</strong> Prevenção contínua e zelo ambiental.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* LINHA DO TEMPO DA EVOLUÇÃO DA EMPRESA */}
      <section className="py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
            Evolução Histórica
          </span>
          <h2 className="text-3xl font-display font-bold text-slate-900 mt-2">
            NOSSA LINHA DO TEMPO
          </h2>
          <p className="text-slate-600 text-sm mt-1">
            Marcos fundamentais que moldaram o crescimento e a identidade da Rede RCM.
          </p>
        </div>

        <div className="relative border-l-2 border-orange-500/40 ml-4 md:ml-32 space-y-12">
          {milestones.map((m, idx) => (
            <div key={idx} className="relative pl-8 sm:pl-10 group">
              {/* Dot icon */}
              <div className="absolute -left-3.5 top-0 w-7 h-7 rounded-full bg-white border-4 border-orange-500 shadow-md group-hover:scale-125 transition-transform flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-900" />
              </div>

              {/* Year label */}
              <div className="md:absolute md:-left-28 md:top-0 md:text-right mb-1 md:mb-0">
                <span className="text-xl font-display font-black text-blue-900">
                  {m.year}
                </span>
              </div>

              {/* Card content */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs group-hover:shadow-md transition-shadow">
                <span className="inline-block px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-900 text-xs font-bold mb-2">
                  {m.tag}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  {m.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {m.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Mascote Card */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <RcmMascot
          context="home"
          customTitle="O Mascote RCM e o Nosso Time"
          customMessage="Nosso mascote representa a energia e a simpatia que cada um de nossos frentistas, chefes de pista e motoristas leva aos nossos clientes todos os dias. Venha nos visitar!"
          position="card"
          ctaText="Encontre um Posto RCM Próximo"
          onCtaClick={() => setActiveTab('unidades')}
        />
      </section>
    </div>
  );
};
