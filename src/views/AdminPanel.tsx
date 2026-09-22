import React, { useState } from 'react';
import {
  Lock,
  LogOut,
  Plus,
  Trash2,
  Edit2,
  Check,
  AlertCircle,
  MapPin,
  Fuel,
  Wrench,
  Newspaper,
  Calendar,
  Store,
  Briefcase,
  Users,
  MessageSquare,
  Truck,
  Download,
  Upload,
  RefreshCw,
  Eye,
  CheckCircle2,
  X
} from 'lucide-react';
import { useData } from '../context/DataContext';
import {
  StationUnit,
  Product,
  ServiceItem,
  NewsItem,
  ClassifiedItem,
  ActionItem,
  JobOpportunity,
  StationManager
} from '../types';

type AdminTab =
  | 'unidades'
  | 'produtos'
  | 'servicos'
  | 'noticias'
  | 'classificados'
  | 'acoes'
  | 'vagas'
  | 'curriculos'
  | 'mensagens'
  | 'transportadora'
  | 'gerentes'
  | 'backup';

export const AdminPanel: React.FC = () => {
  const {
    isAdminLoggedIn,
    adminLogin,
    adminLogout,
    stations,
    addStation,
    updateStation,
    deleteStation,
    managers,
    addManager,
    updateManager,
    deleteManager,
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    services,
    addService,
    updateService,
    deleteService,
    news,
    addNews,
    updateNews,
    deleteNews,
    classifieds,
    addClassified,
    updateClassified,
    deleteClassified,
    actions,
    addAction,
    updateAction,
    deleteAction,
    transporter,
    updateTransporter,
    jobs,
    addJob,
    updateJob,
    deleteJob,
    applications,
    updateApplicationStatus,
    deleteApplication,
    contactMessages,
    updateContactMessageStatus,
    deleteContactMessage,
    resetToFactoryDefaults,
    exportBackupJson,
    importBackupJson
  } = useData();

  // Login form state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Active Admin Tab
  const [currentTab, setCurrentTab] = useState<AdminTab>('unidades');
  const [feedbackMessage, setFeedbackMessage] = useState<string | null>(null);

  // Modal / Form state for additions or edits
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newGalleryPhoto, setNewGalleryPhoto] = useState('');

  // Form states
  const [stationForm, setStationForm] = useState<Partial<StationUnit>>({
    name: '',
    nome: '',
    slug: '',
    city: '',
    cidade: '',
    state: 'RN',
    estado: 'RN',
    address: '',
    endereco: '',
    neighborhood: '',
    cep: '',
    photo: '/assets/rcm-joao-camara.jpeg',
    fotoCapa: '/assets/rcm-joao-camara.jpeg',
    gallery: [],
    galeriaFotos: [],
    openingHours: '24 Horas',
    horario: '24 Horas',
    phone: '(84) 3645-1200',
    telefone: '(84) 3645-1200',
    whatsapp: '5584998765432',
    latitude: -5.5312,
    longitude: -35.8175,
    chefePista: 'Carlos Medeiros',
    descricao: 'Unidade moderna da Rede de Postos RCM com infraestrutura completa e controle rigoroso de qualidade.',
    servicos: ['Abastecimento Certificado', 'Troca de Óleo Lubrax', 'Conveniência', 'Calibragem Digital'],
    is24h: true,
    featured: true,
    serviceIds: ['srv-1', 'srv-2', 'srv-3'],
    paymentMethods: ['Dinheiro', 'PIX', 'Cartão Débito/Crédito'],
    featuredProductIds: ['prod-1', 'prod-2']
  });

  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: '',
    category: 'Combustíveis',
    brand: 'Rede RCM',
    description: '',
    benefits: ['Alta pureza', 'Economia de combustível'],
    application: 'Veículos leves e pesados',
    photo: 'https://images.unsplash.com/photo-1527018601619-a508a2be00cd?w=600&auto=format&fit=crop&q=80',
    volume: 'Por Litro',
    featured: true
  });

  const [serviceForm, setServiceForm] = useState<Partial<ServiceItem>>({
    name: '',
    shortDescription: '',
    fullDescription: '',
    benefits: ['Rapidez no atendimento', 'Segurança comprovada'],
    icon: 'wrench'
  });

  const [newsForm, setNewsForm] = useState<Partial<NewsItem>>({
    title: '',
    summary: '',
    content: '',
    category: 'Institucional',
    date: new Date().toLocaleDateString('pt-BR'),
    readTime: '3 min',
    coverImage: '/assets/rcm_station_hero.jpg'
  });

  const [classifiedForm, setClassifiedForm] = useState<Partial<ClassifiedItem>>({
    title: '',
    stationUnitName: 'Posto RCM 01 - Flagship Natal',
    city: 'Natal',
    state: 'RN',
    areaM2: '45 m²',
    vocation: 'Ideal para franquia de conveniência ou cafeteria',
    vocationCategory: 'Conveniência',
    description: '',
    status: 'DISPONÍVEL',
    photos: ['https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80'],
    contactWhatsapp: '5584998765432'
  });

  const [jobForm, setJobForm] = useState<Partial<JobOpportunity>>({
    title: '',
    department: 'Pista',
    city: 'Natal',
    state: 'RN',
    type: 'Efetivo CLT',
    description: '',
    requirements: ['Ensino Médio completo', 'Boa comunicação', 'Disponibilidade de horário'],
    benefits: ['Salário compatível', 'Vale alimentação', 'Plano de saúde', 'Treinamento RCM'],
    isActive: true
  });

  const triggerFeedback = (msg: string) => {
    setFeedbackMessage(msg);
    setTimeout(() => setFeedbackMessage(null), 3500);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = adminLogin(loginEmail, loginPass);
    if (!success) {
      setLoginError(true);
    } else {
      setLoginError(false);
      triggerFeedback('Login administrativo realizado com sucesso!');
    }
  };

  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4" id="rcm-admin-login">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border border-slate-700 space-y-6">
          <div className="text-center space-y-2">
            <div className="w-16 h-16 rounded-2xl bg-blue-900 text-white flex items-center justify-center mx-auto shadow-lg">
              <Lock className="w-8 h-8 text-orange-400" />
            </div>
            <h2 className="text-2xl font-display font-bold text-slate-900">
              Painel Administrativo RCM
            </h2>
            <p className="text-xs text-slate-500">
              Acesso restrito para gestão de conteúdo da Rede de Postos RCM
            </p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-50 text-red-700 text-xs rounded-xl flex items-center gap-2 border border-red-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Credenciais incorretas. Tente novamente.</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                E-mail ou Usuário
              </label>
              <input
                type="text"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="admin@postorcm.com.br"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-900 text-sm text-slate-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Senha de Acesso
              </label>
              <input
                type="password"
                required
                value={loginPass}
                onChange={(e) => setLoginPass(e.target.value)}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:ring-2 focus:ring-blue-900 text-sm text-slate-800"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-blue-900 to-indigo-950 hover:from-blue-800 hover:to-indigo-900 text-white font-bold text-sm shadow-md transition-all cursor-pointer"
            >
              Entrar no Painel RCM
            </button>
          </form>

          <div className="p-3 bg-slate-50 rounded-xl text-[11px] text-slate-500 border border-slate-200 text-center">
            <span className="font-semibold text-slate-700">Acesso Padrão:</span> admin@postorcm.com.br / senha: rcm2026 (ou usuário "admin")
          </div>
        </div>
      </div>
    );
  }

  // Station Save Handler
  const handleSaveStation = (e: React.FormEvent) => {
    e.preventDefault();
    const stationName = stationForm.nome || stationForm.name;
    const stationCity = stationForm.cidade || stationForm.city;
    const stationAddress = stationForm.endereco || stationForm.address;
    if (!stationName || !stationCity || !stationAddress) return;

    const coverPhoto = stationForm.fotoCapa || stationForm.photo || '/assets/rcm-joao-camara.jpeg';
    const galleryPhotos = stationForm.galeriaFotos || stationForm.gallery || [];
    const openingHrs = stationForm.horario || stationForm.openingHours || '24 Horas';
    const stState = stationForm.estado || stationForm.state || 'RN';
    const stPhone = stationForm.telefone || stationForm.phone || '(84) 3645-1200';

    const payload: Partial<StationUnit> = {
      ...stationForm,
      name: stationName,
      nome: stationName,
      slug: stationForm.slug || stationName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-'),
      city: stationCity,
      cidade: stationCity,
      state: stState,
      estado: stState,
      address: stationAddress,
      endereco: stationAddress,
      photo: coverPhoto,
      fotoCapa: coverPhoto,
      gallery: galleryPhotos,
      galeriaFotos: galleryPhotos,
      openingHours: openingHrs,
      horario: openingHrs,
      phone: stPhone,
      telefone: stPhone,
      whatsapp: stationForm.whatsapp || '5584998765432',
      latitude: Number(stationForm.latitude) || -5.5312,
      longitude: Number(stationForm.longitude) || -35.8175,
      chefePista: stationForm.chefePista || 'Chefe de Pista RCM',
      descricao: stationForm.descricao || 'Unidade moderna da Rede de Postos RCM com infraestrutura completa e combustível certificado.',
      servicos: stationForm.servicos && stationForm.servicos.length > 0 ? stationForm.servicos : ['Abastecimento Certificado', 'Conveniência', 'Calibragem Digital']
    };

    if (editingId) {
      updateStation(editingId, payload);
      triggerFeedback(`Unidade "${stationName}" atualizada com sucesso!`);
    } else {
      addStation(payload as Omit<StationUnit, 'id'>);
      triggerFeedback(`Nova unidade "${stationName}" cadastrada!`);
    }
    setIsModalOpen(false);
    setEditingId(null);
    setNewGalleryPhoto('');
  };

  // Product Save Handler
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!productForm.name || !productForm.brand) return;

    if (editingId) {
      updateProduct(editingId, productForm);
      triggerFeedback(`Produto "${productForm.name}" atualizado!`);
    } else {
      addProduct(productForm as Omit<Product, 'id'>);
      triggerFeedback(`Produto "${productForm.name}" cadastrado!`);
    }
    setIsModalOpen(false);
    setEditingId(null);
  };

  // News Save Handler
  const handleSaveNews = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsForm.title || !newsForm.summary) return;

    if (editingId) {
      updateNews(editingId, newsForm);
      triggerFeedback(`Notícia "${newsForm.title}" atualizada!`);
    } else {
      addNews(newsForm as Omit<NewsItem, 'id'>);
      triggerFeedback(`Notícia "${newsForm.title}" publicada!`);
    }
    setIsModalOpen(false);
    setEditingId(null);
  };

  // Classified Save Handler
  const handleSaveClassified = (e: React.FormEvent) => {
    e.preventDefault();
    if (!classifiedForm.title || !classifiedForm.city) return;

    if (editingId) {
      updateClassified(editingId, classifiedForm);
      triggerFeedback(`Espaço "${classifiedForm.title}" atualizado!`);
    } else {
      addClassified(classifiedForm as Omit<ClassifiedItem, 'id'>);
      triggerFeedback(`Espaço comercial cadastrado com sucesso!`);
    }
    setIsModalOpen(false);
    setEditingId(null);
  };

  // Job Save Handler
  const handleSaveJob = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobForm.title || !jobForm.city) return;

    if (editingId) {
      updateJob(editingId, jobForm);
      triggerFeedback(`Vaga "${jobForm.title}" atualizada!`);
    } else {
      addJob(jobForm as Omit<JobOpportunity, 'id'>);
      triggerFeedback(`Nova vaga "${jobForm.title}" cadastrada!`);
    }
    setIsModalOpen(false);
    setEditingId(null);
  };

  const navItems: { id: AdminTab; label: string; count?: number; icon: any }[] = [
    { id: 'unidades', label: 'Unidades', count: stations.length, icon: MapPin },
    { id: 'produtos', label: 'Produtos', count: products.length, icon: Fuel },
    { id: 'servicos', label: 'Serviços', count: services.length, icon: Wrench },
    { id: 'noticias', label: 'RCM News', count: news.length, icon: Newspaper },
    { id: 'classificados', label: 'Classificados', count: classifieds.length, icon: Store },
    { id: 'acoes', label: 'Ações RCM', count: actions.length, icon: Calendar },
    { id: 'vagas', label: 'Vagas de Emprego', count: jobs.length, icon: Briefcase },
    { id: 'curriculos', label: 'Currículos', count: applications.length, icon: Users },
    { id: 'mensagens', label: 'Mensagens Contato', count: contactMessages.length, icon: MessageSquare },
    { id: 'transportadora', label: 'Transportadora', icon: Truck },
    { id: 'backup', label: 'Backup & Restauração', icon: Download }
  ];

  return (
    <div className="bg-slate-100 min-h-screen text-slate-900 pb-20" id="rcm-admin-dashboard">
      {/* Top Header */}
      <header className="bg-slate-900 text-white px-6 py-4 border-b border-slate-800 sticky top-0 z-30 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-500 text-white flex items-center justify-center font-bold">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white leading-none">
                Painel Administrativo • Rede RCM
              </h1>
              <span className="text-[11px] text-emerald-400 font-semibold">
                Sessão Segura Ativa (Gerenciamento Total)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={adminLogout}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sair do Painel</span>
            </button>
          </div>
        </div>
      </header>

      {/* Visual Feedback Banner */}
      {feedbackMessage && (
        <div className="max-w-7xl mx-auto px-6 pt-4 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="p-4 rounded-2xl bg-emerald-600 text-white text-xs sm:text-sm font-bold flex items-center justify-between shadow-lg">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5" />
              <span>{feedbackMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => setFeedbackMessage(null)}
              className="text-emerald-100 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Admin Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Admin Navigation Sidebar */}
          <div className="lg:col-span-3 space-y-1">
            <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-sm space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block px-3 py-2">
                Módulos Gerenciáveis
              </span>
              {navItems.map(item => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setCurrentTab(item.id);
                      setIsModalOpen(false);
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-bold transition-colors cursor-pointer text-left ${
                      isActive
                        ? 'bg-blue-900 text-white shadow-xs'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-orange-400' : 'text-slate-400'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.count !== undefined && (
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          isActive
                            ? 'bg-blue-800 text-white'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {item.count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Admin Content Area */}
          <div className="lg:col-span-9 space-y-6">
            {/* 1. MÓDULO UNIDADES */}
            {currentTab === 'unidades' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 mb-6">
                  <div>
                    <h2 className="text-xl font-display font-bold text-slate-900">
                      Unidades de Postos ({stations.length})
                    </h2>
                    <p className="text-xs text-slate-500">
                      Gerencie endereços, fotos, gerentes e serviços de cada posto da rede.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setStationForm({
                        name: '',
                        nome: '',
                        slug: '',
                        city: '',
                        cidade: '',
                        state: 'RN',
                        estado: 'RN',
                        address: '',
                        endereco: '',
                        neighborhood: '',
                        cep: '',
                        photo: '/assets/rcm-joao-camara.jpeg',
                        fotoCapa: '/assets/rcm-joao-camara.jpeg',
                        gallery: ['/assets/rcm-alcantil.jpeg', '/assets/rcm-tacima.jpeg'],
                        galeriaFotos: ['/assets/rcm-alcantil.jpeg', '/assets/rcm-tacima.jpeg'],
                        openingHours: '24 Horas',
                        horario: '24 Horas',
                        phone: '(84) 3645-1200',
                        telefone: '(84) 3645-1200',
                        whatsapp: '5584998765432',
                        latitude: -5.5312,
                        longitude: -35.8175,
                        chefePista: 'Carlos Medeiros',
                        descricao: 'Unidade moderna da Rede de Postos RCM com infraestrutura completa e controle rigoroso de qualidade.',
                        servicos: ['Abastecimento Certificado', 'Troca de Óleo Lubrax', 'Conveniência', 'Calibragem Digital'],
                        is24h: true,
                        featured: true,
                        serviceIds: ['srv-1', 'srv-2', 'srv-3'],
                        paymentMethods: ['Dinheiro', 'PIX', 'Cartões Débito/Crédito'],
                        featuredProductIds: ['prod-1', 'prod-2']
                      });
                      setIsModalOpen(true);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Cadastrar Nova Unidade</span>
                  </button>
                </div>

                <div className="space-y-4">
                  {stations.map(st => (
                    <div
                      key={st.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={st.fotoCapa || st.photo || '/assets/rcm-joao-camara.jpeg'}
                          alt={st.nome || st.name}
                          className="w-20 h-16 rounded-xl object-cover shrink-0 border border-slate-200 shadow-xs"
                        />
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h4 className="font-bold text-slate-900 text-sm">{st.nome || st.name}</h4>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-900 font-bold">
                              {st.cidade || st.city} - {st.estado || st.state}
                            </span>
                            {st.galeriaFotos && st.galeriaFotos.length > 0 && (
                              <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 font-semibold">
                                {st.galeriaFotos.length} fotos na galeria
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">{st.endereco || st.address}</p>
                          <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1 flex-wrap">
                            <span>Horário: <strong className="text-slate-700">{st.horario || st.openingHours}</strong></span>
                            {st.chefePista && <span>Chefe de Pista: <strong className="text-slate-700">{st.chefePista}</strong></span>}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingId(st.id);
                            setStationForm({
                              ...st,
                              name: st.nome || st.name,
                              nome: st.nome || st.name,
                              city: st.cidade || st.city,
                              cidade: st.cidade || st.city,
                              state: st.estado || st.state,
                              estado: st.estado || st.state,
                              address: st.endereco || st.address,
                              endereco: st.endereco || st.address,
                              photo: st.fotoCapa || st.photo || '/assets/rcm-joao-camara.jpeg',
                              fotoCapa: st.fotoCapa || st.photo || '/assets/rcm-joao-camara.jpeg',
                              gallery: st.galeriaFotos || st.gallery || [],
                              galeriaFotos: st.galeriaFotos || st.gallery || [],
                              openingHours: st.horario || st.openingHours || '24 Horas',
                              horario: st.horario || st.openingHours || '24 Horas',
                              phone: st.telefone || st.phone || '(84) 3645-1200',
                              telefone: st.telefone || st.phone || '(84) 3645-1200'
                            });
                            setIsModalOpen(true);
                          }}
                          className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-bold transition-colors cursor-pointer"
                          title="Editar unidade"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Deseja realmente remover a unidade ${st.nome || st.name}?`)) {
                              deleteStation(st.id);
                              triggerFeedback(`Unidade ${st.nome || st.name} removida.`);
                            }
                          }}
                          className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs font-bold transition-colors cursor-pointer"
                          title="Excluir unidade"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Modal Form for Station */}
                {isModalOpen && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
                    <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-3xl w-full max-h-[92vh] overflow-y-auto border border-slate-200 shadow-2xl">
                      <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
                        <div>
                          <h3 className="text-lg font-bold text-slate-900">
                            {editingId ? 'Editar Unidade RCM' : 'Nova Unidade RCM'}
                          </h3>
                          <p className="text-xs text-slate-500">
                            Preencha os dados estruturais, fotos oficiais e serviços da unidade.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsModalOpen(false)}
                          className="text-slate-400 hover:text-slate-600 p-1 rounded-lg hover:bg-slate-100"
                        >
                          <X className="w-5 h-5" />
                        </button>
                      </div>

                      <form onSubmit={handleSaveStation} className="space-y-5 text-xs">
                        {/* 1. Identificação Básica */}
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
                          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-blue-900">
                            1. Identificação & Localização
                          </h4>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block font-bold text-slate-700 mb-1">Nome da Unidade (Ex: Posto RCM Tacima) *</label>
                              <input
                                type="text"
                                required
                                value={stationForm.name || stationForm.nome || ''}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setStationForm({
                                    ...stationForm,
                                    name: val,
                                    nome: val,
                                    slug: stationForm.slug || val.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-')
                                  });
                                }}
                                placeholder="Posto RCM João Câmara"
                                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                              />
                            </div>

                            <div>
                              <label className="block font-bold text-slate-700 mb-1">Slug / Identificador URL</label>
                              <input
                                type="text"
                                value={stationForm.slug || ''}
                                onChange={(e) => setStationForm({ ...stationForm, slug: e.target.value })}
                                placeholder="posto-rcm-joao-camara"
                                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-mono"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <label className="block font-bold text-slate-700 mb-1">Cidade *</label>
                              <input
                                type="text"
                                required
                                value={stationForm.city || stationForm.cidade || ''}
                                onChange={(e) => setStationForm({ ...stationForm, city: e.target.value, cidade: e.target.value })}
                                placeholder="João Câmara"
                                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                              />
                            </div>

                            <div>
                              <label className="block font-bold text-slate-700 mb-1">Estado</label>
                              <select
                                value={stationForm.state || stationForm.estado || 'RN'}
                                onChange={(e) => setStationForm({ ...stationForm, state: e.target.value, estado: e.target.value })}
                                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-medium"
                              >
                                <option value="RN">RN - Rio Grande do Norte</option>
                                <option value="PB">PB - Paraíba</option>
                                <option value="PE">PE - Pernambuco</option>
                                <option value="CE">CE - Ceará</option>
                              </select>
                            </div>

                            <div>
                              <label className="block font-bold text-slate-700 mb-1">Bairro</label>
                              <input
                                type="text"
                                value={stationForm.neighborhood || ''}
                                onChange={(e) => setStationForm({ ...stationForm, neighborhood: e.target.value })}
                                placeholder="Centro / Rodovia"
                                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div className="sm:col-span-2">
                              <label className="block font-bold text-slate-700 mb-1">Endereço Completo *</label>
                              <input
                                type="text"
                                required
                                value={stationForm.address || stationForm.endereco || ''}
                                onChange={(e) => setStationForm({ ...stationForm, address: e.target.value, endereco: e.target.value })}
                                placeholder="Rodovia BR-406, Km 75"
                                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                              />
                            </div>

                            <div>
                              <label className="block font-bold text-slate-700 mb-1">CEP</label>
                              <input
                                type="text"
                                value={stationForm.cep || ''}
                                onChange={(e) => setStationForm({ ...stationForm, cep: e.target.value })}
                                placeholder="59550-000"
                                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block font-bold text-slate-700 mb-1">Latitude (Mapa)</label>
                              <input
                                type="number"
                                step="any"
                                value={stationForm.latitude || ''}
                                onChange={(e) => setStationForm({ ...stationForm, latitude: parseFloat(e.target.value) || 0 })}
                                placeholder="-5.5312"
                                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-mono"
                              />
                            </div>
                            <div>
                              <label className="block font-bold text-slate-700 mb-1">Longitude (Mapa)</label>
                              <input
                                type="number"
                                step="any"
                                value={stationForm.longitude || ''}
                                onChange={(e) => setStationForm({ ...stationForm, longitude: parseFloat(e.target.value) || 0 })}
                                placeholder="-35.8175"
                                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-mono"
                              />
                            </div>
                          </div>
                        </div>

                        {/* 2. FOTO DE CAPA E GALERIA */}
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-4">
                          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-orange-600">
                            2. Fotografia de Capa & Galeria de Imagens
                          </h4>

                          {/* Foto de Capa */}
                          <div>
                            <label className="block font-bold text-slate-700 mb-1">
                              Foto de Capa Principal (fotoCapa) *
                            </label>
                            <input
                              type="text"
                              required
                              value={stationForm.fotoCapa || stationForm.photo || ''}
                              onChange={(e) => setStationForm({ ...stationForm, photo: e.target.value, fotoCapa: e.target.value })}
                              placeholder="/assets/rcm-joao-camara.jpeg"
                              className="w-full p-2.5 rounded-xl border border-slate-200 bg-white font-mono text-[11px]"
                            />

                            {/* Quick selection pills for real station assets */}
                            <div className="mt-2 flex items-center gap-2 flex-wrap">
                              <span className="text-[11px] text-slate-500 font-semibold">Fotos Reais RCM:</span>
                              <button
                                type="button"
                                onClick={() => setStationForm({
                                  ...stationForm,
                                  photo: '/assets/rcm-joao-camara.jpeg',
                                  fotoCapa: '/assets/rcm-joao-camara.jpeg'
                                })}
                                className="px-2.5 py-1 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-900 font-semibold text-[10px] transition-colors cursor-pointer"
                              >
                                📸 João Câmara
                              </button>
                              <button
                                type="button"
                                onClick={() => setStationForm({
                                  ...stationForm,
                                  photo: '/assets/rcm-alcantil.jpeg',
                                  fotoCapa: '/assets/rcm-alcantil.jpeg'
                                })}
                                className="px-2.5 py-1 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-900 font-semibold text-[10px] transition-colors cursor-pointer"
                              >
                                📸 Alcantil
                              </button>
                              <button
                                type="button"
                                onClick={() => setStationForm({
                                  ...stationForm,
                                  photo: '/assets/rcm-tacima.jpeg',
                                  fotoCapa: '/assets/rcm-tacima.jpeg'
                                })}
                                className="px-2.5 py-1 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-900 font-semibold text-[10px] transition-colors cursor-pointer"
                              >
                                📸 Tacima
                              </button>
                            </div>

                            {/* Preview Foto Capa */}
                            {(stationForm.fotoCapa || stationForm.photo) && (
                              <div className="mt-3 relative rounded-xl overflow-hidden h-36 border border-slate-200 shadow-inner bg-slate-900">
                                <img
                                  src={stationForm.fotoCapa || stationForm.photo}
                                  alt="Preview da Capa"
                                  className="w-full h-full object-cover"
                                />
                                <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded-md bg-black/60 text-white text-[10px] font-bold backdrop-blur-xs">
                                  Preview da Capa
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Galeria de Fotos */}
                          <div className="border-t border-slate-200 pt-3">
                            <div className="flex items-center justify-between mb-2">
                              <label className="font-bold text-slate-700">
                                Galeria de Fotos da Unidade ({stationForm.galeriaFotos?.length || 0})
                              </label>
                              <span className="text-[10px] text-slate-500">
                                Fotos adicionais para a página detalhada da unidade
                              </span>
                            </div>

                            {/* Add new photo to gallery */}
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={newGalleryPhoto}
                                onChange={(e) => setNewGalleryPhoto(e.target.value)}
                                placeholder="URL da foto (ex: /assets/rcm-alcantil.jpeg)"
                                className="flex-1 p-2.5 rounded-xl border border-slate-200 bg-white font-mono text-[11px]"
                              />
                              <button
                                type="button"
                                onClick={() => {
                                  if (!newGalleryPhoto.trim()) return;
                                  const currentGallery = stationForm.galeriaFotos || stationForm.gallery || [];
                                  if (!currentGallery.includes(newGalleryPhoto.trim())) {
                                    const updated = [...currentGallery, newGalleryPhoto.trim()];
                                    setStationForm({
                                      ...stationForm,
                                      galeriaFotos: updated,
                                      gallery: updated
                                    });
                                  }
                                  setNewGalleryPhoto('');
                                }}
                                className="px-4 py-2 bg-blue-900 hover:bg-blue-800 text-white rounded-xl font-bold cursor-pointer transition-colors"
                              >
                                Adicionar
                              </button>
                            </div>

                            {/* Quick add real station assets to gallery */}
                            <div className="mt-2 flex items-center gap-2 flex-wrap">
                              <span className="text-[10px] text-slate-500">Adicionar atalho:</span>
                              {['/assets/rcm-joao-camara.jpeg', '/assets/rcm-alcantil.jpeg', '/assets/rcm-tacima.jpeg'].map(assetPath => (
                                <button
                                  key={assetPath}
                                  type="button"
                                  onClick={() => {
                                    const currentGallery = stationForm.galeriaFotos || stationForm.gallery || [];
                                    if (!currentGallery.includes(assetPath)) {
                                      const updated = [...currentGallery, assetPath];
                                      setStationForm({
                                        ...stationForm,
                                        galeriaFotos: updated,
                                        gallery: updated
                                      });
                                    }
                                  }}
                                  className="px-2 py-0.5 rounded-md bg-slate-200 hover:bg-slate-300 text-slate-700 text-[10px] transition-colors cursor-pointer"
                                >
                                  + {assetPath.replace('/assets/imagem ', '').replace('.jpeg', '')}
                                </button>
                              ))}
                            </div>

                            {/* Thumbnails of gallery photos */}
                            {stationForm.galeriaFotos && stationForm.galeriaFotos.length > 0 ? (
                              <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
                                {stationForm.galeriaFotos.map((picUrl, idx) => (
                                  <div
                                    key={idx}
                                    className="relative rounded-xl overflow-hidden h-20 border border-slate-200 group bg-slate-800"
                                  >
                                    <img
                                      src={picUrl}
                                      alt={`Foto Galeria ${idx + 1}`}
                                      className="w-full h-full object-cover"
                                    />
                                    <button
                                      type="button"
                                      onClick={() => {
                                        const updated = (stationForm.galeriaFotos || []).filter((_, i) => i !== idx);
                                        setStationForm({
                                          ...stationForm,
                                          galeriaFotos: updated,
                                          gallery: updated
                                        });
                                      }}
                                      className="absolute top-1 right-1 p-1 rounded-md bg-red-600 text-white opacity-80 hover:opacity-100 transition-opacity cursor-pointer"
                                      title="Remover foto da galeria"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <p className="mt-2 text-[11px] text-slate-400 italic">
                                Nenhuma foto adicional na galeria ainda.
                              </p>
                            )}
                          </div>
                        </div>

                        {/* 3. Operação, Contato e Responsáveis */}
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200/80 space-y-3">
                          <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider text-blue-900">
                            3. Operação & Atendimento
                          </h4>

                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            <div>
                              <label className="block font-bold text-slate-700 mb-1">Horário de Funcionamento</label>
                              <input
                                type="text"
                                value={stationForm.horario || stationForm.openingHours || '24 Horas'}
                                onChange={(e) => setStationForm({ ...stationForm, openingHours: e.target.value, horario: e.target.value })}
                                placeholder="24 Horas ou 06h às 22h"
                                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                              />
                            </div>

                            <div>
                              <label className="block font-bold text-slate-700 mb-1">Telefone Fixo</label>
                              <input
                                type="text"
                                value={stationForm.telefone || stationForm.phone || ''}
                                onChange={(e) => setStationForm({ ...stationForm, phone: e.target.value, telefone: e.target.value })}
                                placeholder="(84) 3645-1200"
                                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                              />
                            </div>

                            <div>
                              <label className="block font-bold text-slate-700 mb-1">WhatsApp de Contato</label>
                              <input
                                type="text"
                                value={stationForm.whatsapp || ''}
                                onChange={(e) => setStationForm({ ...stationForm, whatsapp: e.target.value })}
                                placeholder="5584998765432"
                                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                              />
                            </div>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <div>
                              <label className="block font-bold text-slate-700 mb-1">Chefe de Pista Responsável</label>
                              <input
                                type="text"
                                value={stationForm.chefePista || ''}
                                onChange={(e) => setStationForm({ ...stationForm, chefePista: e.target.value })}
                                placeholder="Carlos Medeiros"
                                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                              />
                            </div>

                            <div>
                              <label className="block font-bold text-slate-700 mb-1">Descrição Curta da Unidade</label>
                              <input
                                type="text"
                                value={stationForm.descricao || ''}
                                onChange={(e) => setStationForm({ ...stationForm, descricao: e.target.value })}
                                placeholder="Unidade completa com atendimento rodoviário 24h e combustíveis certificados."
                                className="w-full p-2.5 rounded-xl border border-slate-200 bg-white"
                              />
                            </div>
                          </div>

                          {/* Serviços da Unidade */}
                          <div>
                            <label className="block font-bold text-slate-700 mb-1.5">
                              Serviços Disponíveis nesta Unidade (Clique para alternar)
                            </label>
                            <div className="flex flex-wrap gap-1.5">
                              {[
                                'Abastecimento Certificado',
                                'Troca de Óleo Lubrax',
                                'Conveniência',
                                'Calibragem Digital',
                                'Lavagem Rápida',
                                'Estacionamento de Carretas',
                                'Chuveiro para Caminhoneiros',
                                'Restaurante / Lanchonete',
                                'Wi-Fi Gratuito',
                                'Borracharia',
                                'Atendimento a Frotas'
                              ].map(srvName => {
                                const currentServicos = stationForm.servicos || [];
                                const isSelected = currentServicos.includes(srvName);
                                return (
                                  <button
                                    key={srvName}
                                    type="button"
                                    onClick={() => {
                                      const nextServicos = isSelected
                                        ? currentServicos.filter(s => s !== srvName)
                                        : [...currentServicos, srvName];
                                      setStationForm({
                                        ...stationForm,
                                        servicos: nextServicos
                                      });
                                    }}
                                    className={`px-2.5 py-1 rounded-lg text-[11px] font-medium transition-colors cursor-pointer border ${
                                      isSelected
                                        ? 'bg-blue-900 border-blue-900 text-white'
                                        : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-100'
                                    }`}
                                  >
                                    {isSelected ? '✓ ' : '+ '}
                                    {srvName}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 flex justify-end gap-2 border-t border-slate-100">
                          <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold transition-colors cursor-pointer"
                          >
                            Cancelar
                          </button>
                          <button
                            type="submit"
                            className="px-6 py-2.5 rounded-xl bg-blue-900 hover:bg-blue-800 text-white font-bold transition-colors cursor-pointer shadow-md"
                          >
                            Salvar Unidade RCM
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 2. MÓDULO PRODUTOS */}
            {currentTab === 'produtos' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 mb-6">
                  <div>
                    <h2 className="text-xl font-display font-bold text-slate-900">
                      Catálogo de Produtos ({products.length})
                    </h2>
                    <p className="text-xs text-slate-500">
                      Cadastre e edite combustíveis, óleos lubrificantes e itens automotivos.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setProductForm({
                        name: '',
                        category: 'Combustíveis',
                        brand: 'Rede RCM',
                        description: '',
                        benefits: ['Alta pureza'],
                        application: 'Uso automotivo',
                        photo: 'https://images.unsplash.com/photo-1527018601619-a508a2be00cd?w=600&auto=format&fit=crop&q=80',
                        volume: 'Por Litro',
                        featured: true
                      });
                      setIsModalOpen(true);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs shadow-xs cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Cadastrar Novo Produto</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {products.map(prod => (
                    <div
                      key={prod.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={prod.photo}
                          alt={prod.name}
                          className="w-14 h-14 rounded-xl object-cover shrink-0"
                        />
                        <div>
                          <span className="text-[10px] font-bold text-orange-600 uppercase">
                            {prod.category} • {prod.brand}
                          </span>
                          <h4 className="font-bold text-slate-900 text-sm">{prod.name}</h4>
                          <p className="text-xs text-slate-500 line-clamp-1">{prod.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingId(prod.id);
                            setProductForm(prod);
                            setIsModalOpen(true);
                          }}
                          className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Excluir produto ${prod.name}?`)) {
                              deleteProduct(prod.id);
                              triggerFeedback(`Produto ${prod.name} excluído.`);
                            }
                          }}
                          className="p-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {isModalOpen && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
                    <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-slate-200 shadow-2xl">
                      <h3 className="text-lg font-bold text-slate-900 mb-4">
                        {editingId ? 'Editar Produto' : 'Novo Produto'}
                      </h3>
                      <form onSubmit={handleSaveProduct} className="space-y-3 text-xs">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Nome do Produto *</label>
                          <input
                            type="text"
                            required
                            value={productForm.name || ''}
                            onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                            className="w-full p-2.5 rounded-xl border border-slate-200"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Categoria</label>
                            <select
                              value={productForm.category || 'Combustíveis'}
                              onChange={(e) => setProductForm({ ...productForm, category: e.target.value as any })}
                              className="w-full p-2.5 rounded-xl border border-slate-200"
                            >
                              <option value="Combustíveis">Combustíveis</option>
                              <option value="Lubrificantes e Aditivos">Lubrificantes e Aditivos</option>
                              <option value="Produtos Automotivos">Produtos Automotivos</option>
                              <option value="Conveniência">Conveniência</option>
                            </select>
                          </div>

                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Marca</label>
                            <input
                              type="text"
                              value={productForm.brand || ''}
                              onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                              className="w-full p-2.5 rounded-xl border border-slate-200"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Descrição</label>
                          <textarea
                            rows={2}
                            value={productForm.description || ''}
                            onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                            className="w-full p-2.5 rounded-xl border border-slate-200"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Indicação de Uso</label>
                          <input
                            type="text"
                            value={productForm.application || ''}
                            onChange={(e) => setProductForm({ ...productForm, application: e.target.value })}
                            className="w-full p-2.5 rounded-xl border border-slate-200"
                          />
                        </div>

                        <div className="pt-4 flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 rounded-xl bg-slate-100 font-bold"
                          >
                            Cancelar
                          </button>
                          <button
                            type="submit"
                            className="px-5 py-2 rounded-xl bg-blue-900 text-white font-bold"
                          >
                            Salvar Produto
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 3. MÓDULO RCM NEWS */}
            {currentTab === 'noticias' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 mb-6">
                  <div>
                    <h2 className="text-xl font-display font-bold text-slate-900">
                      Notícias e Conteúdos (RCM News)
                    </h2>
                    <p className="text-xs text-slate-500">
                      Publique comunicados, dicas para motoristas e novidades de expansão.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setNewsForm({
                        title: '',
                        summary: '',
                        content: '',
                        category: 'Institucional',
                        date: new Date().toLocaleDateString('pt-BR'),
                        readTime: '3 min',
                        coverImage: '/assets/rcm_station_hero.jpg'
                      });
                      setIsModalOpen(true);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 text-white font-bold text-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Nova Notícia</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {news.map(item => (
                    <div
                      key={item.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4"
                    >
                      <div>
                        <span className="text-[10px] font-bold text-blue-900 uppercase">
                          {item.category} • {item.date}
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm">{item.title}</h4>
                        <p className="text-xs text-slate-500 line-clamp-1">{item.summary}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingId(item.id);
                            setNewsForm(item);
                            setIsModalOpen(true);
                          }}
                          className="p-2 rounded-xl bg-white border border-slate-200"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Excluir notícia "${item.title}"?`)) {
                              deleteNews(item.id);
                              triggerFeedback('Notícia excluída.');
                            }
                          }}
                          className="p-2 rounded-xl bg-red-50 text-red-600 border border-red-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {isModalOpen && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
                    <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full border border-slate-200 shadow-2xl">
                      <h3 className="text-lg font-bold text-slate-900 mb-4">
                        {editingId ? 'Editar Notícia' : 'Nova Notícia'}
                      </h3>
                      <form onSubmit={handleSaveNews} className="space-y-3 text-xs">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Título da Notícia *</label>
                          <input
                            type="text"
                            required
                            value={newsForm.title || ''}
                            onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                            className="w-full p-2.5 rounded-xl border border-slate-200"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Categoria</label>
                            <input
                              type="text"
                              value={newsForm.category || 'Institucional'}
                              onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}
                              className="w-full p-2.5 rounded-xl border border-slate-200"
                            />
                          </div>

                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Data</label>
                            <input
                              type="text"
                              value={newsForm.date || ''}
                              onChange={(e) => setNewsForm({ ...newsForm, date: e.target.value })}
                              className="w-full p-2.5 rounded-xl border border-slate-200"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Resumo *</label>
                          <textarea
                            rows={2}
                            required
                            value={newsForm.summary || ''}
                            onChange={(e) => setNewsForm({ ...newsForm, summary: e.target.value })}
                            className="w-full p-2.5 rounded-xl border border-slate-200"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Conteúdo Completo</label>
                          <textarea
                            rows={4}
                            value={newsForm.content || ''}
                            onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                            className="w-full p-2.5 rounded-xl border border-slate-200"
                          />
                        </div>

                        <div className="pt-4 flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 rounded-xl bg-slate-100 font-bold"
                          >
                            Cancelar
                          </button>
                          <button
                            type="submit"
                            className="px-5 py-2 rounded-xl bg-blue-900 text-white font-bold"
                          >
                            Salvar Notícia
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 4. MÓDULO CLASSIFICADOS */}
            {currentTab === 'classificados' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 mb-6">
                  <div>
                    <h2 className="text-xl font-display font-bold text-slate-900">
                      Espaços para Locação (Classificados)
                    </h2>
                    <p className="text-xs text-slate-500">
                      Gerencie lojas, boxes e quiosques comerciais disponíveis nos postos.
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(null);
                      setClassifiedForm({
                        title: '',
                        stationUnitName: stations[0]?.name || 'Posto RCM',
                        city: 'Natal',
                        state: 'RN',
                        areaM2: '35 m²',
                        vocation: 'Ideal para franquia ou conveniência',
                        vocationCategory: 'Conveniência',
                        description: '',
                        status: 'DISPONÍVEL',
                        photos: ['https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&auto=format&fit=crop&q=80'],
                        contactWhatsapp: '5584998765432'
                      });
                      setIsModalOpen(true);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-500 text-white font-bold text-xs"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Cadastrar Espaço</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {classifieds.map(c => (
                    <div
                      key={c.id}
                      className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between gap-4"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900 text-sm">{c.title}</h4>
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded-full text-white font-bold ${
                              c.status === 'DISPONÍVEL'
                                ? 'bg-emerald-600'
                                : c.status === 'EM NEGOCIAÇÃO'
                                ? 'bg-amber-600'
                                : 'bg-slate-600'
                            }`}
                          >
                            {c.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500">{c.stationUnitName} • {c.areaM2}</p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            const nextStatus: ClassifiedItem['status'] =
                              c.status === 'DISPONÍVEL'
                                ? 'EM NEGOCIAÇÃO'
                                : c.status === 'EM NEGOCIAÇÃO'
                                ? 'ALUGADO'
                                : 'DISPONÍVEL';
                            updateClassified(c.id, { status: nextStatus });
                            triggerFeedback(`Status alterado para ${nextStatus}`);
                          }}
                          className="px-2.5 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-semibold"
                        >
                          Mudar Status
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setEditingId(c.id);
                            setClassifiedForm(c);
                            setIsModalOpen(true);
                          }}
                          className="p-2 rounded-xl bg-white border border-slate-200"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm(`Excluir anúncio ${c.title}?`)) {
                              deleteClassified(c.id);
                              triggerFeedback('Espaço excluído.');
                            }
                          }}
                          className="p-2 rounded-xl bg-red-50 text-red-600 border border-red-200"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {isModalOpen && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
                    <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-slate-200 shadow-2xl">
                      <h3 className="text-lg font-bold text-slate-900 mb-4">
                        {editingId ? 'Editar Espaço Comercial' : 'Novo Espaço Comercial'}
                      </h3>
                      <form onSubmit={handleSaveClassified} className="space-y-3 text-xs">
                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Título do Ponto *</label>
                          <input
                            type="text"
                            required
                            value={classifiedForm.title || ''}
                            onChange={(e) => setClassifiedForm({ ...classifiedForm, title: e.target.value })}
                            className="w-full p-2.5 rounded-xl border border-slate-200"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Unidade RCM</label>
                            <input
                              type="text"
                              value={classifiedForm.stationUnitName || ''}
                              onChange={(e) => setClassifiedForm({ ...classifiedForm, stationUnitName: e.target.value })}
                              className="w-full p-2.5 rounded-xl border border-slate-200"
                            />
                          </div>

                          <div>
                            <label className="block font-bold text-slate-700 mb-1">Metragem (m²)</label>
                            <input
                              type="text"
                              value={classifiedForm.areaM2 || ''}
                              onChange={(e) => setClassifiedForm({ ...classifiedForm, areaM2: e.target.value })}
                              className="w-full p-2.5 rounded-xl border border-slate-200"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Vocação / Indicação</label>
                          <input
                            type="text"
                            value={classifiedForm.vocation || ''}
                            onChange={(e) => setClassifiedForm({ ...classifiedForm, vocation: e.target.value })}
                            className="w-full p-2.5 rounded-xl border border-slate-200"
                          />
                        </div>

                        <div>
                          <label className="block font-bold text-slate-700 mb-1">Status</label>
                          <select
                            value={classifiedForm.status || 'DISPONÍVEL'}
                            onChange={(e) => setClassifiedForm({ ...classifiedForm, status: e.target.value as any })}
                            className="w-full p-2.5 rounded-xl border border-slate-200"
                          >
                            <option value="DISPONÍVEL">DISPONÍVEL</option>
                            <option value="EM NEGOCIAÇÃO">EM NEGOCIAÇÃO</option>
                            <option value="ALUGADO">ALUGADO</option>
                          </select>
                        </div>

                        <div className="pt-4 flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="px-4 py-2 rounded-xl bg-slate-100 font-bold"
                          >
                            Cancelar
                          </button>
                          <button
                            type="submit"
                            className="px-5 py-2 rounded-xl bg-blue-900 text-white font-bold"
                          >
                            Salvar Espaço
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 5. MÓDULO CURRÍCULOS RECEBIDOS */}
            {currentTab === 'curriculos' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                <div className="pb-6 border-b border-slate-100 mb-6">
                  <h2 className="text-xl font-display font-bold text-slate-900">
                    Currículos Recebidos ({applications.length})
                  </h2>
                  <p className="text-xs text-slate-500">
                    Candidatos inscritos pelo formulário de Trabalhe Conosco do website.
                  </p>
                </div>

                {applications.length === 0 ? (
                  <p className="text-sm text-slate-500 text-center py-8">Nenhum currículo recebido até o momento.</p>
                ) : (
                  <div className="space-y-4">
                    {applications.map(app => (
                      <div
                        key={app.id}
                        className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-bold text-orange-600 uppercase">
                              {app.interestArea} • Inscrito em {app.createdAt}
                            </span>
                            <h4 className="font-bold text-slate-900 text-base">{app.fullName}</h4>
                            <p className="text-xs text-slate-500">
                              {app.city} - {app.state} • E-mail: {app.email} • Tel: {app.phone}
                            </p>
                          </div>

                          <span
                            className={`text-xs px-3 py-1 rounded-full font-bold self-start ${
                              app.status === 'Contratado'
                                ? 'bg-emerald-100 text-emerald-800'
                                : app.status === 'Em Análise'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-slate-200 text-slate-700'
                            }`}
                          >
                            {app.status}
                          </span>
                        </div>

                        {app.experience && (
                          <div className="p-3 bg-white rounded-xl text-xs text-slate-600 border border-slate-200">
                            <strong className="text-slate-800 block mb-0.5">Experiência:</strong>
                            {app.experience}
                          </div>
                        )}

                        {app.message && (
                          <div className="p-3 bg-white rounded-xl text-xs text-slate-600 border border-slate-200">
                            <strong className="text-slate-800 block mb-0.5">Mensagem:</strong>
                            {app.message}
                          </div>
                        )}

                        <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200/60">
                          <a
                            href={`https://wa.me/${app.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                              `Olá ${app.fullName}! Entramos em contato da Rede RCM referente ao seu currículo enviado pelo nosso site.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-bold text-emerald-700 hover:text-emerald-800"
                          >
                            Chamar no WhatsApp
                          </a>

                          <div className="flex items-center gap-2">
                            <select
                              value={app.status}
                              onChange={(e) => updateApplicationStatus(app.id, e.target.value as any)}
                              className="text-xs py-1 px-2 rounded-lg bg-white border border-slate-300"
                            >
                              <option value="Recebido">Recebido</option>
                              <option value="Em Análise">Em Análise</option>
                              <option value="Entrevista Agendada">Entrevista Agendada</option>
                              <option value="Contratado">Contratado</option>
                              <option value="Banco de Talentos">Banco de Talentos</option>
                            </select>

                            <button
                              type="button"
                              onClick={() => {
                                if (window.confirm('Excluir este currículo?')) {
                                  deleteApplication(app.id);
                                }
                              }}
                              className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 6. MÓDULO MENSAGENS DE CONTATO */}
            {currentTab === 'mensagens' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
                <div className="pb-6 border-b border-slate-100 mb-6">
                  <h2 className="text-xl font-display font-bold text-slate-900">
                    Mensagens de Contato ({contactMessages.length})
                  </h2>
                  <p className="text-xs text-slate-500">
                    Mensagens enviadas por clientes e parceiros pelo formulário de Contato.
                  </p>
                </div>

                {contactMessages.length === 0 ? (
                  <p className="text-sm text-slate-500 text-center py-8">Nenhuma mensagem registrada.</p>
                ) : (
                  <div className="space-y-4">
                    {contactMessages.map(msg => (
                      <div
                        key={msg.id}
                        className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-2"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[10px] font-bold text-blue-900 uppercase">
                              {msg.subject} • {msg.createdAt}
                            </span>
                            <h4 className="font-bold text-slate-900 text-sm">{msg.name}</h4>
                            <p className="text-xs text-slate-500">
                              E-mail: {msg.email} {msg.phone ? `• Tel: ${msg.phone}` : ''}
                            </p>
                          </div>

                          <select
                            value={msg.status}
                            onChange={(e) => updateContactMessageStatus(msg.id, e.target.value as any)}
                            className="text-xs py-1 px-2 rounded-lg bg-white border border-slate-300"
                          >
                            <option value="Não lida">Não lida</option>
                            <option value="Em Atendimento">Em Atendimento</option>
                            <option value="Respondida">Respondida</option>
                          </select>
                        </div>

                        <div className="p-3 bg-white rounded-xl text-xs text-slate-700 border border-slate-200">
                          {msg.message}
                        </div>

                        <div className="flex justify-end pt-1">
                          <button
                            type="button"
                            onClick={() => {
                              if (window.confirm('Excluir mensagem?')) {
                                deleteContactMessage(msg.id);
                              }
                            }}
                            className="text-xs text-red-600 hover:underline flex items-center gap-1"
                          >
                            <Trash2 className="w-3 h-3" />
                            Excluir mensagem
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 7. MÓDULO TRANSPORTADORA */}
            {currentTab === 'transportadora' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div className="pb-4 border-b border-slate-100">
                  <h2 className="text-xl font-display font-bold text-slate-900">
                    Dados da Transportadora RCM
                  </h2>
                  <p className="text-xs text-slate-500">
                    Atualize métricas, texto institucional e capacidade logística da frota própria.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Total de Carretas / Frota</label>
                    <input
                      type="text"
                      value={transporter.fleetCount}
                      onChange={(e) => updateTransporter({ fleetCount: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Índice de Pontualidade</label>
                    <input
                      type="text"
                      value={transporter.punctualityRate}
                      onChange={(e) => updateTransporter({ punctualityRate: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 mb-1">Classificação de Segurança</label>
                    <input
                      type="text"
                      value={transporter.securityRating}
                      onChange={(e) => updateTransporter({ securityRating: e.target.value })}
                      className="w-full p-2.5 rounded-xl border border-slate-200"
                    />
                  </div>
                </div>

                <div className="text-xs">
                  <label className="block font-bold text-slate-700 mb-1">Texto Institucional da Transportadora</label>
                  <textarea
                    rows={4}
                    value={transporter.history}
                    onChange={(e) => updateTransporter({ history: e.target.value })}
                    className="w-full p-3 rounded-xl border border-slate-200"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => triggerFeedback('Dados da transportadora atualizados com sucesso!')}
                  className="px-6 py-2.5 rounded-xl bg-blue-900 text-white font-bold text-xs"
                >
                  Salvar Alterações da Transportadora
                </button>
              </div>
            )}

            {/* 8. MÓDULO BACKUP & RESTAURAÇÃO */}
            {currentTab === 'backup' && (
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
                <div className="pb-4 border-b border-slate-100">
                  <h2 className="text-xl font-display font-bold text-slate-900">
                    Backup, Restauração e Dados de Fábrica
                  </h2>
                  <p className="text-xs text-slate-500">
                    Exporte todo o banco de dados do site em formato JSON ou restaure os dados originais.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                      <Download className="w-4 h-4 text-blue-900" />
                      Exportar Backup JSON
                    </h4>
                    <p className="text-xs text-slate-600">
                      Faça o download de todos os dados cadastrados (unidades, produtos, notícias, classificados).
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        const json = exportBackupJson();
                        const blob = new Blob([json], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `backup_rede_rcm_${new Date().toISOString().slice(0, 10)}.json`;
                        a.click();
                        triggerFeedback('Backup baixado com sucesso!');
                      }}
                      className="px-4 py-2 rounded-xl bg-blue-900 text-white text-xs font-bold"
                    >
                      Baixar Arquivo JSON
                    </button>
                  </div>

                  <div className="p-5 rounded-2xl bg-red-50/50 border border-red-200 space-y-3">
                    <h4 className="font-bold text-red-900 text-sm flex items-center gap-2">
                      <RefreshCw className="w-4 h-4 text-red-600" />
                      Restaurar Padrão de Fábrica
                    </h4>
                    <p className="text-xs text-red-700">
                      Restaura todos os postos, produtos e notícias oficiais iniciais da Rede RCM.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        if (window.confirm('Tem certeza? Isso restaurará o banco de dados para os dados oficiais iniciais da Rede RCM.')) {
                          resetToFactoryDefaults();
                          triggerFeedback('Banco de dados restaurado aos padrões oficiais da Rede RCM.');
                        }
                      }}
                      className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold"
                    >
                      Restaurar Dados Originais
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
