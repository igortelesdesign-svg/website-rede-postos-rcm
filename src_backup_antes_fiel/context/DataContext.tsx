import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  StationUnit,
  StationManager,
  Product,
  ServiceItem,
  NewsItem,
  ClassifiedItem,
  ActionItem,
  TransporterData,
  JobOpportunity,
  JobApplication,
  ContactMessage,
  CompanyMilestone
} from '../types';
import {
  INITIAL_STATIONS,
  INITIAL_MANAGERS,
  INITIAL_PRODUCTS,
  INITIAL_SERVICES,
  INITIAL_NEWS,
  INITIAL_ACTIONS,
  INITIAL_CLASSIFIEDS,
  INITIAL_TRANSPORTER,
  INITIAL_JOBS,
  INITIAL_MILESTONES
} from '../data/initialData';

interface DataContextType {
  stations: StationUnit[];
  managers: StationManager[];
  products: Product[];
  services: ServiceItem[];
  news: NewsItem[];
  classifieds: ClassifiedItem[];
  actions: ActionItem[];
  transporter: TransporterData;
  jobs: JobOpportunity[];
  applications: JobApplication[];
  contactMessages: ContactMessage[];
  milestones: CompanyMilestone[];

  // Admin Auth
  isAdminLoggedIn: boolean;
  adminLogin: (u: string, p: string) => boolean;
  adminLogout: () => void;

  // Station Operations
  addStation: (station: Omit<StationUnit, 'id'>) => void;
  updateStation: (id: string, station: Partial<StationUnit>) => void;
  deleteStation: (id: string) => void;

  // Manager Operations
  addManager: (manager: Omit<StationManager, 'id'>) => void;
  updateManager: (id: string, manager: Partial<StationManager>) => void;
  deleteManager: (id: string) => void;

  // Product Operations
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Service Operations
  addService: (service: Omit<ServiceItem, 'id'>) => void;
  updateService: (id: string, service: Partial<ServiceItem>) => void;
  deleteService: (id: string) => void;

  // News Operations
  addNews: (news: Omit<NewsItem, 'id'>) => void;
  updateNews: (id: string, news: Partial<NewsItem>) => void;
  deleteNews: (id: string) => void;

  // Classifieds Operations
  addClassified: (classified: Omit<ClassifiedItem, 'id'>) => void;
  updateClassified: (id: string, classified: Partial<ClassifiedItem>) => void;
  deleteClassified: (id: string) => void;

  // Action Operations
  addAction: (action: Omit<ActionItem, 'id'>) => void;
  updateAction: (id: string, action: Partial<ActionItem>) => void;
  deleteAction: (id: string) => void;

  // Transporter
  updateTransporter: (data: Partial<TransporterData>) => void;

  // Jobs
  addJob: (job: Omit<JobOpportunity, 'id'>) => void;
  updateJob: (id: string, job: Partial<JobOpportunity>) => void;
  deleteJob: (id: string) => void;

  // Job Applications
  submitApplication: (app: Omit<JobApplication, 'id' | 'createdAt' | 'status'>) => void;
  updateApplicationStatus: (id: string, status: JobApplication['status']) => void;
  deleteApplication: (id: string) => void;

  // Contact Messages
  submitContactMessage: (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => void;
  updateContactMessageStatus: (id: string, status: ContactMessage['status']) => void;
  deleteContactMessage: (id: string) => void;

  // Backup & Restore
  resetToFactoryDefaults: () => void;
  exportBackupJson: () => string;
  importBackupJson: (jsonString: string) => boolean;
}

const STORAGE_KEY = 'rcm_postos_db_v3';
const AUTH_KEY = 'rcm_admin_session_v3';

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load saved or seed data
  const [stations, setStations] = useState<StationUnit[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_stations`);
    return saved ? JSON.parse(saved) : INITIAL_STATIONS;
  });

  const [managers, setManagers] = useState<StationManager[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_managers`);
    return saved ? JSON.parse(saved) : INITIAL_MANAGERS;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_products`);
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [services, setServices] = useState<ServiceItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_services`);
    return saved ? JSON.parse(saved) : INITIAL_SERVICES;
  });

  const [news, setNews] = useState<NewsItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_news`);
    return saved ? JSON.parse(saved) : INITIAL_NEWS;
  });

  const [classifieds, setClassifieds] = useState<ClassifiedItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_classifieds`);
    return saved ? JSON.parse(saved) : INITIAL_CLASSIFIEDS;
  });

  const [actions, setActions] = useState<ActionItem[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_actions`);
    return saved ? JSON.parse(saved) : INITIAL_ACTIONS;
  });

  const [transporter, setTransporter] = useState<TransporterData>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_transporter`);
    return saved ? JSON.parse(saved) : INITIAL_TRANSPORTER;
  });

  const [jobs, setJobs] = useState<JobOpportunity[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_jobs`);
    return saved ? JSON.parse(saved) : INITIAL_JOBS;
  });

  const [applications, setApplications] = useState<JobApplication[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_applications`);
    return saved ? JSON.parse(saved) : [
      {
        id: 'app-initial-1',
        jobId: 'job-1',
        jobTitle: 'Frentista Atendente de Pista',
        fullName: 'Lucas Fernandes de Oliveira',
        phone: '(84) 98765-4321',
        whatsapp: '5584987654321',
        email: 'lucas.fernandes@email.com',
        city: 'Parnamirim',
        state: 'RN',
        interestArea: 'Operações de Pista',
        experience: '2 anos de experiência em atendimento ao público e caixa em comércio varejista.',
        message: 'Tenho grande interesse em me juntar à equipe da Rede RCM pelo padrão de qualidade e oportunidade de crescimento.',
        resumeFileName: 'curriculo_lucas_oliveira.pdf',
        resumeFileSize: '280 KB',
        createdAt: new Date().toLocaleDateString('pt-BR'),
        status: 'Recebido'
      }
    ];
  });

  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(() => {
    const saved = localStorage.getItem(`${STORAGE_KEY}_contact_msgs`);
    return saved ? JSON.parse(saved) : [
      {
        id: 'msg-initial-1',
        name: 'Ana Cláudia Martins',
        email: 'ana.martins@empresa.com.br',
        phone: '(84) 99888-7766',
        subject: 'Abastecimento para Frota Corporativa',
        message: 'Gostaria de solicitar uma proposta comercial para abastecimento mensal de 15 veículos da nossa frota com cartão combustível RCM.',
        sourceContext: 'Contato Institucional',
        createdAt: new Date().toLocaleDateString('pt-BR'),
        status: 'Não lida'
      }
    ];
  });

  const [milestones] = useState<CompanyMilestone[]>(INITIAL_MILESTONES);

  // Authentication State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem(AUTH_KEY) === 'true';
  });

  // Persist states
  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_stations`, JSON.stringify(stations));
  }, [stations]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_managers`, JSON.stringify(managers));
  }, [managers]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_products`, JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_services`, JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_news`, JSON.stringify(news));
  }, [news]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_classifieds`, JSON.stringify(classifieds));
  }, [classifieds]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_actions`, JSON.stringify(actions));
  }, [actions]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_transporter`, JSON.stringify(transporter));
  }, [transporter]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_jobs`, JSON.stringify(jobs));
  }, [jobs]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_applications`, JSON.stringify(applications));
  }, [applications]);

  useEffect(() => {
    localStorage.setItem(`${STORAGE_KEY}_contact_msgs`, JSON.stringify(contactMessages));
  }, [contactMessages]);

  const adminLogin = (user: string, pass: string): boolean => {
    // Standard master credentials: admin@postorcm.com.br / rcm2026 or admin / rcm123
    const validUser = user.trim().toLowerCase();
    const validPass = pass.trim();
    if (
      (validUser === 'admin@postorcm.com.br' && validPass === 'rcm2026') ||
      (validUser === 'admin' && (validPass === 'rcm2026' || validPass === 'rcm123'))
    ) {
      setIsAdminLoggedIn(true);
      localStorage.setItem(AUTH_KEY, 'true');
      return true;
    }
    return false;
  };

  const adminLogout = () => {
    setIsAdminLoggedIn(false);
    localStorage.removeItem(AUTH_KEY);
  };

  // Station CRUD
  const addStation = (data: Omit<StationUnit, 'id'>) => {
    const id = `unidade-${Date.now()}`;
    const newStation: StationUnit = { ...data, id };
    setStations(prev => [newStation, ...prev]);
  };

  const updateStation = (id: string, updated: Partial<StationUnit>) => {
    setStations(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
  };

  const deleteStation = (id: string) => {
    setStations(prev => prev.filter(s => s.id !== id));
  };

  // Manager CRUD
  const addManager = (data: Omit<StationManager, 'id'>) => {
    const id = `mgr-${Date.now()}`;
    const newMgr: StationManager = { ...data, id };
    setManagers(prev => [...prev, newMgr]);
  };

  const updateManager = (id: string, updated: Partial<StationManager>) => {
    setManagers(prev => prev.map(m => m.id === id ? { ...m, ...updated } : m));
  };

  const deleteManager = (id: string) => {
    setManagers(prev => prev.filter(m => m.id !== id));
  };

  // Product CRUD
  const addProduct = (data: Omit<Product, 'id'>) => {
    const id = `prod-${Date.now()}`;
    const newProd: Product = { ...data, id };
    setProducts(prev => [newProd, ...prev]);
  };

  const updateProduct = (id: string, updated: Partial<Product>) => {
    setProducts(prev => prev.map(p => p.id === id ? { ...p, ...updated } : p));
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  // Service CRUD
  const addService = (data: Omit<ServiceItem, 'id'>) => {
    const id = `srv-${Date.now()}`;
    const newSrv: ServiceItem = { ...data, id };
    setServices(prev => [...prev, newSrv]);
  };

  const updateService = (id: string, updated: Partial<ServiceItem>) => {
    setServices(prev => prev.map(s => s.id === id ? { ...s, ...updated } : s));
  };

  const deleteService = (id: string) => {
    setServices(prev => prev.filter(s => s.id !== id));
  };

  // News CRUD
  const addNews = (data: Omit<NewsItem, 'id'>) => {
    const id = `news-${Date.now()}`;
    const newItem: NewsItem = { ...data, id };
    setNews(prev => [newItem, ...prev]);
  };

  const updateNews = (id: string, updated: Partial<NewsItem>) => {
    setNews(prev => prev.map(n => n.id === id ? { ...n, ...updated } : n));
  };

  const deleteNews = (id: string) => {
    setNews(prev => prev.filter(n => n.id !== id));
  };

  // Classifieds CRUD
  const addClassified = (data: Omit<ClassifiedItem, 'id'>) => {
    const id = `classif-${Date.now()}`;
    const newItem: ClassifiedItem = { ...data, id };
    setClassifieds(prev => [newItem, ...prev]);
  };

  const updateClassified = (id: string, updated: Partial<ClassifiedItem>) => {
    setClassifieds(prev => prev.map(c => c.id === id ? { ...c, ...updated } : c));
  };

  const deleteClassified = (id: string) => {
    setClassifieds(prev => prev.filter(c => c.id !== id));
  };

  // Action CRUD
  const addAction = (data: Omit<ActionItem, 'id'>) => {
    const id = `action-${Date.now()}`;
    const newItem: ActionItem = { ...data, id };
    setActions(prev => [newItem, ...prev]);
  };

  const updateAction = (id: string, updated: Partial<ActionItem>) => {
    setActions(prev => prev.map(a => a.id === id ? { ...a, ...updated } : a));
  };

  const deleteAction = (id: string) => {
    setActions(prev => prev.filter(a => a.id !== id));
  };

  // Transporter
  const updateTransporter = (data: Partial<TransporterData>) => {
    setTransporter(prev => ({ ...prev, ...data }));
  };

  // Jobs
  const addJob = (data: Omit<JobOpportunity, 'id'>) => {
    const id = `job-${Date.now()}`;
    const newJob: JobOpportunity = { ...data, id };
    setJobs(prev => [newJob, ...prev]);
  };

  const updateJob = (id: string, updated: Partial<JobOpportunity>) => {
    setJobs(prev => prev.map(j => j.id === id ? { ...j, ...updated } : j));
  };

  const deleteJob = (id: string) => {
    setJobs(prev => prev.filter(j => j.id !== id));
  };

  // Job Applications
  const submitApplication = (app: Omit<JobApplication, 'id' | 'createdAt' | 'status'>) => {
    const newApp: JobApplication = {
      ...app,
      id: `app-${Date.now()}`,
      createdAt: new Date().toLocaleDateString('pt-BR'),
      status: 'Recebido'
    };
    setApplications(prev => [newApp, ...prev]);
  };

  const updateApplicationStatus = (id: string, status: JobApplication['status']) => {
    setApplications(prev => prev.map(a => a.id === id ? { ...a, status } : a));
  };

  const deleteApplication = (id: string) => {
    setApplications(prev => prev.filter(a => a.id !== id));
  };

  // Contact Messages
  const submitContactMessage = (msg: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => {
    const newMsg: ContactMessage = {
      ...msg,
      id: `msg-${Date.now()}`,
      createdAt: new Date().toLocaleDateString('pt-BR'),
      status: 'Não lida'
    };
    setContactMessages(prev => [newMsg, ...prev]);
  };

  const updateContactMessageStatus = (id: string, status: ContactMessage['status']) => {
    setContactMessages(prev => prev.map(m => m.id === id ? { ...m, status } : m));
  };

  const deleteContactMessage = (id: string) => {
    setContactMessages(prev => prev.filter(m => m.id !== id));
  };

  // Factory reset
  const resetToFactoryDefaults = () => {
    setStations(INITIAL_STATIONS);
    setManagers(INITIAL_MANAGERS);
    setProducts(INITIAL_PRODUCTS);
    setServices(INITIAL_SERVICES);
    setNews(INITIAL_NEWS);
    setActions(INITIAL_ACTIONS);
    setClassifieds(INITIAL_CLASSIFIEDS);
    setTransporter(INITIAL_TRANSPORTER);
    setJobs(INITIAL_JOBS);
    localStorage.removeItem(`${STORAGE_KEY}_stations`);
    localStorage.removeItem(`${STORAGE_KEY}_managers`);
    localStorage.removeItem(`${STORAGE_KEY}_products`);
    localStorage.removeItem(`${STORAGE_KEY}_services`);
    localStorage.removeItem(`${STORAGE_KEY}_news`);
    localStorage.removeItem(`${STORAGE_KEY}_classifieds`);
    localStorage.removeItem(`${STORAGE_KEY}_actions`);
    localStorage.removeItem(`${STORAGE_KEY}_transporter`);
    localStorage.removeItem(`${STORAGE_KEY}_jobs`);
  };

  const exportBackupJson = (): string => {
    const dump = {
      stations,
      managers,
      products,
      services,
      news,
      classifieds,
      actions,
      transporter,
      jobs,
      exportedAt: new Date().toISOString(),
      app: 'Rede de Postos RCM'
    };
    return JSON.stringify(dump, null, 2);
  };

  const importBackupJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.stations && Array.isArray(parsed.stations)) setStations(parsed.stations);
      if (parsed.managers && Array.isArray(parsed.managers)) setManagers(parsed.managers);
      if (parsed.products && Array.isArray(parsed.products)) setProducts(parsed.products);
      if (parsed.services && Array.isArray(parsed.services)) setServices(parsed.services);
      if (parsed.news && Array.isArray(parsed.news)) setNews(parsed.news);
      if (parsed.classifieds && Array.isArray(parsed.classifieds)) setClassifieds(parsed.classifieds);
      if (parsed.actions && Array.isArray(parsed.actions)) setActions(parsed.actions);
      if (parsed.transporter) setTransporter(parsed.transporter);
      if (parsed.jobs && Array.isArray(parsed.jobs)) setJobs(parsed.jobs);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <DataContext.Provider
      value={{
        stations,
        managers,
        products,
        services,
        news,
        classifieds,
        actions,
        transporter,
        jobs,
        applications,
        contactMessages,
        milestones,
        isAdminLoggedIn,
        adminLogin,
        adminLogout,
        addStation,
        updateStation,
        deleteStation,
        addManager,
        updateManager,
        deleteManager,
        addProduct,
        updateProduct,
        deleteProduct,
        addService,
        updateService,
        deleteService,
        addNews,
        updateNews,
        deleteNews,
        addClassified,
        updateClassified,
        deleteClassified,
        addAction,
        updateAction,
        deleteAction,
        updateTransporter,
        addJob,
        updateJob,
        deleteJob,
        submitApplication,
        updateApplicationStatus,
        deleteApplication,
        submitContactMessage,
        updateContactMessageStatus,
        deleteContactMessage,
        resetToFactoryDefaults,
        exportBackupJson,
        importBackupJson
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
