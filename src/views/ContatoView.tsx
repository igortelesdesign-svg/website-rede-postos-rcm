import React, { useState } from 'react';
import {
  Mail,
  Phone,
  MessageCircle,
  MapPin,
  Instagram,
  Clock,
  Send,
  CheckCircle2,
  Building,
  Users
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { RcmMascot } from '../components/RcmMascot';

export const ContatoView: React.FC = () => {
  const { submitContactMessage } = useData();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Abastecimento / Dúvidas');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    submitContactMessage({
      name,
      email,
      phone,
      subject,
      message,
      sourceContext: 'Formulário Contato Geral'
    });

    setSubmitted(true);
  };

  const getWhatsAppMessage = () => {
    return `Olá! Estou entrando em contato pelo site da Rede RCM sobre: *${subject}*. Mensagem: ${message || 'Gostaria de atendimento.'}`;
  };

  const directWhatsAppUrl = `https://wa.me/5584998765432?text=${encodeURIComponent(getWhatsAppMessage())}`;

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20" id="rcm-contato-view">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <span className="inline-block px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 font-bold text-xs uppercase tracking-wider border border-orange-500/30">
              Relacionamento & Proximidade
            </span>
            <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight">
              FALE COM A REDE RCM
            </h1>
            <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed">
              Estamos sempre à disposição para ouvir você. Tire dúvidas, solicite propostas comerciais para abastecimento de frota ou envie sua mensagem.
            </p>
          </div>

          <div className="shrink-0">
            <RcmMascot
              context="contato"
              size="sm"
              position="inline"
            />
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-12">
        {/* Fast Action WhatsApp Banner */}
        <div className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white rounded-3xl p-6 sm:p-8 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-14 h-14 rounded-2xl bg-white/20 text-white flex items-center justify-center shrink-0">
              <MessageCircle className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-xl font-display font-bold">Atendimento Imediato pelo WhatsApp</h3>
              <p className="text-emerald-100 text-xs sm:text-sm mt-0.5">
                Converse em tempo real com nossa equipe comercial e de atendimento ao cliente.
              </p>
            </div>
          </div>

          <a
            href="https://wa.me/5584998765432?text=Ol%C3%A1!%20Gostaria%20de%20informa%C3%A7%C3%B5es%20sobre%20a%20Rede%20de%20Postos%20RCM."
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3.5 rounded-xl bg-white text-emerald-800 hover:bg-emerald-50 font-extrabold text-sm shadow-md transition-all shrink-0 cursor-pointer"
          >
            Chamar no WhatsApp (84) 99876-5432
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1 rounded-full">
                Formulário Digital
              </span>
              <h2 className="text-2xl font-display font-bold text-slate-900 mt-2">
                Envie Sua Mensagem
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Responderemos o mais breve possível no seu e-mail ou WhatsApp.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-3xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-emerald-950">Mensagem Enviada com Sucesso!</h3>
                <p className="text-sm text-emerald-800 max-w-md mx-auto">
                  Agradecemos o seu contato. Nossa equipe de relacionamento já recebeu sua mensagem e retornará em breve.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-xs"
                >
                  Enviar Outra Mensagem
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Nome Completo *
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Seu nome completo"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-900 text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="seuemail@exemplo.com"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-900 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Telefone / WhatsApp
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(84) 99999-9999"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-900 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Assunto do Contato *
                  </label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-900 text-sm font-medium"
                  >
                    <option value="Abastecimento / Dúvidas">Abastecimento / Dúvidas Gerais</option>
                    <option value="Proposta Comercial / Frotas">Proposta Comercial / Gestão de Frotas</option>
                    <option value="Elogios e Sugestões">Elogios e Sugestões</option>
                    <option value="Fornecedores / Parcerias">Fornecedores / Parcerias Comerciais</option>
                    <option value="Locação de Espaço Comercial">Locação de Espaço Comercial (Classificados)</option>
                    <option value="Outros assuntos">Outros Assuntos</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mensagem Detalhada *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Escreva sua mensagem aqui..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-900 text-sm"
                  />
                </div>

                <div className="pt-3 flex flex-wrap items-center gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-3.5 px-6 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
                  >
                    Enviar Mensagem pelo Site
                  </button>

                  <a
                    href={directWhatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="py-3.5 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-md transition-all flex items-center gap-2"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Enviar Direto no WhatsApp</span>
                  </a>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Institutional Contacts by Department */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md space-y-6">
              <h3 className="text-xl font-display font-bold text-slate-900 pb-3 border-b border-slate-100">
                Canais por Departamento
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="p-3 bg-slate-50 rounded-2xl">
                  <span className="font-bold text-blue-900 block text-xs uppercase tracking-wider">
                    Comercial & Frotas Corporativas
                  </span>
                  <p className="text-slate-600 text-xs mt-0.5">comercial@postorcm.com.br</p>
                  <p className="text-slate-800 font-bold mt-1">(84) 99876-5432</p>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl">
                  <span className="font-bold text-blue-900 block text-xs uppercase tracking-wider">
                    Recursos Humanos & Vagas
                  </span>
                  <p className="text-slate-600 text-xs mt-0.5">rh@postorcm.com.br</p>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl">
                  <span className="font-bold text-blue-900 block text-xs uppercase tracking-wider">
                    Financeiro & Fornecedores
                  </span>
                  <p className="text-slate-600 text-xs mt-0.5">financeiro@postorcm.com.br</p>
                </div>

                <div className="p-3 bg-slate-50 rounded-2xl">
                  <span className="font-bold text-blue-900 block text-xs uppercase tracking-wider">
                    Transportadora & Logística
                  </span>
                  <p className="text-slate-600 text-xs mt-0.5">transportadora@postorcm.com.br</p>
                </div>
              </div>
            </div>

            {/* Sede e Horários */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md space-y-4">
              <h3 className="text-xl font-display font-bold text-slate-900 pb-2 border-b border-slate-100">
                Sede Administrativa
              </h3>

              <div className="space-y-3 text-xs sm:text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-orange-500 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-900">Escritório Central Rede RCM</p>
                    <p>Av. Principal RCM, 1000 - Centro Empresarial</p>
                    <p>Parnamirim / Natal - RN, CEP 59140-000</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Clock className="w-5 h-5 text-blue-900 shrink-0" />
                  <div>
                    <p className="font-bold text-slate-900">Atendimento Administrativo:</p>
                    <p>Segunda a Sexta: 07h30 às 18h00</p>
                    <p className="text-emerald-600 font-semibold">Postos e Pistas: 24 Horas</p>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Instagram className="w-5 h-5 text-pink-600 shrink-0" />
                  <div>
                    <p className="font-bold text-slate-900">Instagram Oficial:</p>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-900 hover:text-orange-600 font-semibold"
                    >
                      @postorcm_oficial
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
