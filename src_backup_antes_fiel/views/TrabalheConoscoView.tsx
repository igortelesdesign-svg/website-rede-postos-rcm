import React, { useState } from 'react';
import {
  Briefcase,
  Users,
  Upload,
  CheckCircle2,
  Send,
  Sparkles,
  MapPin,
  Clock,
  Award,
  HeartHandshake
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { RcmMascot } from '../components/RcmMascot';

export const TrabalheConoscoView: React.FC = () => {
  const { jobs, submitApplication } = useData();

  // Form State
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState('');
  const [interestArea, setInterestArea] = useState('Pista');
  const [selectedJobId, setSelectedJobId] = useState<string>('');
  const [experience, setExperience] = useState('');
  const [message, setMessage] = useState('');
  const [resumeFileName, setResumeFileName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResumeFileName(e.target.files[0].name);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone || !email || !city) return;

    submitApplication({
      jobId: selectedJobId || undefined,
      jobTitle: selectedJobId ? jobs.find(j => j.id === selectedJobId)?.title : undefined,
      fullName,
      phone,
      whatsapp: whatsapp || phone,
      email,
      city,
      state: 'RN',
      interestArea,
      experience,
      message,
      resumeFileName: resumeFileName || 'curriculo_anexo.pdf',
      resumeFileSize: '340 KB'
    });

    setSubmitted(true);
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20" id="rcm-trabalhe-conosco-view">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <span className="inline-block px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 font-bold text-xs uppercase tracking-wider border border-orange-500/30">
              Gente Que Faz a Diferença
            </span>
            <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight">
              TRABALHE CONOSCO
            </h1>
            <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed">
              Construa sua carreira em uma das redes que mais cresce na região. Valorizamos o respeito, o trabalho em equipe, a dedicação e o crescimento de cada talento.
            </p>
          </div>

          <div className="shrink-0">
            <RcmMascot
              context="trabalhe"
              size="sm"
              position="inline"
            />
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 space-y-16">
        {/* Culture & Growth Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-blue-900 text-white flex items-center justify-center mb-4">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-display font-bold text-slate-900 mb-2">
              Ambiente de Respeito e Cooperação
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Na Rede RCM você é ouvido e respeitado. Estimulamos um clima acolhedor onde todos se ajudam para prestar o melhor serviço.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-orange-500 text-white flex items-center justify-center mb-4">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-display font-bold text-slate-900 mb-2">
              Capacitação & Treinamento Contínuo
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Cursos regulares em atendimento, NR-20, lubrificação, segurança e gestão de pista para impulsionar suas competências.
            </p>
          </div>

          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-blue-950 text-white flex items-center justify-center mb-4">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-display font-bold text-slate-900 mb-2">
              Plano de Carreira e Promoção Interna
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              A grande maioria dos nossos chefes de pista e gerentes de unidade começou na pista como frentistas ou operadores de caixa.
            </p>
          </div>
        </div>

        {/* Depoimento de Colaborador */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-8 rounded-3xl shadow-lg border border-blue-800 flex flex-col md:flex-row items-center gap-6">
          <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-orange-400 shrink-0">
            <img
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80"
              alt="Colaboradora RCM"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 text-center md:text-left">
            <p className="text-sm sm:text-base italic text-blue-100 leading-relaxed mb-2">
              "Comecei na RCM há 3 anos na operação de caixa e logo tive a oportunidade de ser promovida a encarregada de atendimento. A empresa realmente olha para o esforço da gente e dá suporte para crescer!"
            </p>
            <p className="text-xs font-bold text-orange-400">
              Juliana Ribeiro • Encarregada de Unidade RCM
            </p>
          </div>
        </div>

        {/* Vagas Abertas */}
        <div>
          <div className="mb-6">
            <span className="text-xs font-bold uppercase tracking-wider text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
              Oportunidades
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 mt-1">
              Vagas Abertas na Rede RCM
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map(job => (
              <div
                key={job.id}
                className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-blue-900 bg-blue-50 px-2.5 py-1 rounded-lg">
                      {job.department}
                    </span>
                    <span className="text-xs text-slate-400">{job.type}</span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 mb-1">{job.title}</h3>
                  <p className="text-xs text-slate-500 mb-4 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-orange-500" />
                    {job.city} - {job.state}
                  </p>

                  {job.description && (
                    <p className="text-xs text-slate-600 mb-4 leading-relaxed">
                      {job.description}
                    </p>
                  )}

                  <div className="text-xs space-y-1 mb-4">
                    <span className="font-bold text-slate-700 block">Requisitos:</span>
                    {job.requirements.map((req: string, i: number) => (
                      <div key={i} className="flex items-center gap-1 text-slate-600">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span>{req}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedJobId(job.id);
                    setInterestArea(job.department);
                    const formEl = document.getElementById('curriculo-form');
                    formEl?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs transition-colors cursor-pointer"
                >
                  Candidatar-se a esta Vaga
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Formulário Completo de Envio de Currículo */}
        <div id="curriculo-form" className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-md">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1 rounded-full">
                Banco de Talentos
              </span>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-slate-900 mt-2">
                Cadastre Seu Currículo
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Preencha os campos abaixo com atenção. Nosso RH analisa todos os cadastros com sigilo e carinho.
              </p>
            </div>

            {submitted ? (
              <div className="p-8 rounded-3xl bg-emerald-50 border border-emerald-200 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-emerald-950">Currículo Enviado com Sucesso!</h3>
                <p className="text-sm text-emerald-800 max-w-md mx-auto">
                  Recebemos os seus dados. Caso o seu perfil atenda às vagas disponíveis, nossa equipe entrará em contato via WhatsApp ou telefone. Boa sorte!
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-xl bg-emerald-700 text-white font-bold text-xs"
                >
                  Enviar Outro Cadastro
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Nome Completo *
                    </label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Seu nome e sobrenome"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-900 text-sm"
                    />
                  </div>

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
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Telefone / Celular *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="(84) 99999-9999"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-900 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      WhatsApp (se diferente)
                    </label>
                    <input
                      type="tel"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="(84) 99999-9999"
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-900 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Cidade de Interesse *
                    </label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Ex: Natal, Parnamirim..."
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-900 text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Área de Interesse *
                    </label>
                    <select
                      value={interestArea}
                      onChange={(e) => setInterestArea(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-900 text-sm font-medium"
                    >
                      <option value="Pista">Pista (Frentista / Atendente)</option>
                      <option value="Caixa">Caixa / Operações Financeiras</option>
                      <option value="Loja de Conveniência">Loja de Conveniência</option>
                      <option value="Troca de Óleo">Troca de Óleo / Mecânica Rápida</option>
                      <option value="Administrativo">Administrativo / Financeiro</option>
                      <option value="Transporte/Motorista">Transporte / Motorista de Tanque</option>
                      <option value="Gerência">Gerência / Chefia de Pista</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Anexar Currículo (PDF, DOCX)
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
                      />
                      <div className="w-full px-4 py-2.5 rounded-xl bg-slate-50 border border-dashed border-slate-300 flex items-center justify-between text-xs text-slate-600">
                        <span className="truncate">{resumeFileName || 'Selecionar arquivo de currículo...'}</span>
                        <Upload className="w-4 h-4 text-orange-500 shrink-0 ml-2" />
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Experiência Anterior Resumida
                  </label>
                  <textarea
                    rows={2}
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                    placeholder="Conte resumidamente sobre seus últimos empregos e funções..."
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-900 text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">
                    Mensagem Adicional
                  </label>
                  <textarea
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Por que você gostaria de trabalhar na Rede RCM?"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-900 text-sm"
                  />
                </div>

                <div className="pt-4 text-center">
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm sm:text-base shadow-lg shadow-orange-500/25 transition-all cursor-pointer"
                  >
                    Enviar Meu Currículo para a Rede RCM
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
