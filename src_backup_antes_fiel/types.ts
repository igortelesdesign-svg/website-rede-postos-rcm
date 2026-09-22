export interface StationUnit {
  id: string;
  slug: string;
  name: string;
  nome?: string;
  brandSubtext?: string;
  city: string;
  cidade?: string;
  state: string;
  estado?: string;
  address: string;
  endereco?: string;
  neighborhood: string;
  cep: string;
  phone: string;
  telefone?: string;
  whatsapp: string;
  openingHours: string;
  horario?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  latitude?: number;
  longitude?: number;
  googleMapsUrl: string;
  streetViewUrl?: string;
  featured: boolean;
  photo: string;
  fotoCapa?: string;
  gallery: string[];
  galeriaFotos?: string[];
  description: string;
  descricao?: string;
  serviceIds: string[];
  servicos?: string[];
  stationManagerId?: string;
  managerId?: string;
  chefePista?: string;
  is24h?: boolean;
  history?: string;
  paymentMethods?: string[];
  featuredProductIds?: string[];
  provisional?: boolean;
}

export interface StationManager {
  id: string;
  name: string;
  role: string;
  photo: string;
  bio: string;
  timeAtCompany: string;
  phone?: string;
  whatsapp?: string;
  authorizedContact: boolean;
  stationUnitName?: string;
}

export type ProductCategory =
  | 'Combustíveis'
  | 'Lubrificantes e Aditivos'
  | 'Produtos Automotivos'
  | 'Conveniência'
  | 'lubrificantes'
  | 'oleos'
  | 'aditivos'
  | 'fluidos'
  | 'automotivos'
  | 'acessorios'
  | 'outros';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: ProductCategory | string;
  description: string;
  specifications?: string;
  application: string;
  volume: string;
  benefits: string[];
  photo: string;
  featured: boolean;
}

export interface ServiceItem {
  id: string;
  name: string;
  category?: string;
  iconName?: string;
  icon?: string;
  shortDescription: string;
  fullDescription: string;
  benefits: string[];
  photo?: string;
}

export type NewsCategory =
  | 'Expansão'
  | 'Novidades'
  | 'Treinamento'
  | 'Ações Sociais'
  | 'Comunicado'
  | 'Dicas Automotivas'
  | 'Institucional'
  | string;

export interface NewsItem {
  id: string;
  slug?: string;
  title: string;
  category: NewsCategory;
  date: string;
  author?: string;
  readTime: string;
  summary: string;
  content: string;
  coverImage: string;
  featured?: boolean;
  gallery?: string[];
  relatedStationId?: string;
  relatedActionId?: string;
}

export type ClassifiedStatus = 'DISPONÍVEL' | 'EM NEGOCIAÇÃO' | 'LOCADO' | 'ALUGADO';

export interface ClassifiedItem {
  id: string;
  title: string;
  stationUnitId?: string;
  stationUnitName: string;
  city: string;
  state: string;
  address?: string;
  type?: string;
  area?: number;
  areaM2?: string;
  vocation?: string;
  vocationCategory?: string;
  description: string;
  status: ClassifiedStatus;
  photos: string[];
  contactPhone?: string;
  contactWhatsapp: string;
  features?: string[];
  priceInfo?: string;
  provisional?: boolean;
}

export interface ActionItem {
  id: string;
  title: string;
  type?: 'Trilhas' | 'Treinamentos' | 'Ações Internas' | 'Campanhas' | 'Ações Sociais' | 'Projetos Especiais' | 'SIPAT' | string;
  category?: string;
  date: string;
  location?: string;
  coverImage: string;
  gallery: string[];
  description: string;
  highlights?: string[];
  videoUrl?: string;
  relatedNewsId?: string;
  relatedStationId?: string;
}

export interface TransporterData {
  title?: string;
  subtitle?: string;
  description?: string;
  fleetCount: number | string;
  citiesServed?: number;
  monthlyVolumeLiters?: string;
  punctualityRate: string;
  securityRating?: string;
  history?: string;
  certifications?: string[];
  features?: {
    title: string;
    description: string;
    icon: string;
  }[];
  gallery?: string[];
  fleetPhotos?: string[];
}

export interface JobOpportunity {
  id: string;
  title: string;
  department: string;
  city: string;
  state: string;
  type: 'Efetivo (CLT)' | 'Efetivo CLT' | 'Estágio' | 'Temporário' | string;
  description?: string;
  requirements: string[];
  benefits: string[];
  status?: 'Aberta' | 'Em Seleção' | 'Encerrada' | string;
  isActive?: boolean;
}

export interface JobApplication {
  id: string;
  jobId?: string;
  jobTitle?: string;
  fullName: string;
  phone: string;
  whatsapp: string;
  email: string;
  city: string;
  state: string;
  interestArea: string;
  experience: string;
  message: string;
  resumeFileName: string;
  resumeFileSize?: string;
  createdAt: string;
  status: 'Recebido' | 'Em Análise' | 'Contatado' | 'Descartado' | 'Contratado' | 'Entrevista Agendada' | 'Banco de Talentos' | string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  sourceContext?: string;
  createdAt: string;
  status: 'Não lida' | 'Respondida' | 'Arquivada';
}

export interface CompanyMilestone {
  year: string;
  title: string;
  description: string;
  tag: string;
}
