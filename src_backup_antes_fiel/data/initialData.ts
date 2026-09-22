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
  CompanyMilestone
} from '../types';

export const INITIAL_SERVICES: ServiceItem[] = [
  {
    id: 'srv-abastecimento',
    name: 'Abastecimento com Combustíveis Certificados',
    category: 'Pista',
    iconName: 'Fuel',
    shortDescription: 'Gasolina Comum, Aditivada, Etanol e Diesel S-10 com rigoroso controle de pureza e densidade.',
    fullDescription: 'Na Rede RCM, cada gota passa por análises laboratoriais contínuas. Nossos bicos digitais aferidos garantem precisão milimétrica e máxima eficiência para o motor do seu veículo.',
    benefits: [
      'Teste de proveta e densidade disponível a qualquer momento',
      'Filtros de última geração em todas as bombas',
      'Atendimento ágil com frentistas treinados'
    ],
    photo: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'srv-troca-oleo',
    name: 'Troca de Óleo e Lubrificantes Especializada',
    category: 'Mecânica Rápida',
    iconName: 'Wrench',
    shortDescription: 'Lubrificação automotiva especializada para veículos leves, utilitários e linhas pesadas.',
    fullDescription: 'Box estruturado com elevador pneumático ou valeta técnica, equipe capacitada para seguir as especificações exatas do manual do proprietário da montadora.',
    benefits: [
      'Checagem gratuita de 15 itens preventivos',
      'Descarte ecológico e certificado de resíduos',
      'Principais marcas originais do mercado'
    ],
    photo: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'srv-conveniencia',
    name: 'Loja de Conveniência Completa',
    category: 'Conveniência',
    iconName: 'Coffee',
    shortDescription: 'Ambiente climatizado com cafés especiais, lanches frescos, bebidas geladas e bomboniere.',
    fullDescription: 'Um refúgio confortável na sua viagem ou rotina diária. Wi-Fi de alta velocidade, tomadas para recarga e opções gastronômicas rápidas e saborosas.',
    benefits: [
      'Ambiente com ar condicionado e mesas de apoio',
      'Café expresso moído na hora',
      'Mix selecionado de snacks e bebidas'
    ],
    photo: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'srv-calibragem',
    name: 'Calibragem Digital de Pneus',
    category: 'Pista',
    iconName: 'Gauge',
    shortDescription: 'Equipamentos digitais aferidos de alta precisão para veículos leves, motos e caminhões.',
    fullDescription: 'Equipamentos modernos e de uso gratuito que garantem a pressão exata indicada pelo fabricante, promovendo economia de combustível e segurança de rodagem.',
    benefits: [
      'Totalmente gratuito aos clientes da rede',
      'Bicos para motos, carros e pneus de alta pressão',
      'Manômetros com aferição periódica'
    ],
    photo: 'https://images.unsplash.com/photo-1578844251758-2f71da64c96f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'srv-limpeza',
    name: 'Limpeza de Para-brisa e Cortesia',
    category: 'Pista',
    iconName: 'Sparkles',
    shortDescription: 'Higienização dos vidros e checagem de fluidos na pista como padrão de atendimento RCM.',
    fullDescription: 'Nosso time realiza a limpeza técnica do para-brisa frontal e traseiro durante o abastecimento com produtos especiais que não danificam as borrachas e palhetas.',
    benefits: [
      'Cortesia em qualquer abastecimento',
      'Visibilidade segura para continuar sua viagem',
      'Checagem rápida de água do radiador e fluido de freio'
    ],
    photo: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'srv-banheiros',
    name: 'Banheiros Higienizados e Acessíveis',
    category: 'Estrutura',
    iconName: 'ShieldCheck',
    shortDescription: 'Sanitários modernos, limpos com frequência monitorada e total acessibilidade.',
    fullDescription: 'O compromisso de conforto e respeito a motoristas, famílias e viajantes. Banheiros individuais, fraldário e acessibilidade para pessoas com mobilidade reduzida.',
    benefits: [
      'Limpeza e checagem a cada 60 minutos',
      'Acessibilidade completa conforme normas',
      'Espaço família e fraldário'
    ],
    photo: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'srv-estacionamento',
    name: 'Pátio Amplo e Estacionamento Seguro',
    category: 'Estrutura',
    iconName: 'Truck',
    shortDescription: 'Área espaçosa para manobras de carretas, ônibus e parada segura de veículos.',
    fullDescription: 'Pátio pavimentado, iluminação LED de alta potência e monitoramento por câmeras para o descanso tranquilo de caminhoneiros e viajantes.',
    benefits: [
      'Segurança e iluminação 24h',
      'Fácil acesso às rodovias e avenidas principais',
      'Pontos de energia para carretas refrigeradas em unidades selecionadas'
    ],
    photo: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=800&q=80'
  }
];

export const INITIAL_MANAGERS: StationManager[] = [
  {
    id: 'mgr-1',
    name: 'Carlos Eduardo Silveira',
    role: 'Chefe de Pista e Líder Operacional',
    photo: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    bio: 'Profissional com ampla experiência em gestão de equipes de pista, excelência em atendimento ao cliente e controle rigoroso de padrões operacionais e de segurança de combustíveis.',
    timeAtCompany: '6 anos de dedicação na Rede RCM',
    phone: '(84) 98800-1122',
    whatsapp: '5584988001122',
    authorizedContact: true
  },
  {
    id: 'mgr-2',
    name: 'Marcos Vinícius Pereira',
    role: 'Chefe de Pista',
    photo: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=80',
    bio: 'Especialista em lubrificação técnica e liderança de pista, focado em agilidade no atendimento e fidelização de frotas e motoristas de aplicativo.',
    timeAtCompany: '4 anos de dedicação na Rede RCM',
    phone: '(84) 98711-2233',
    whatsapp: '5584987112233',
    authorizedContact: true
  },
  {
    id: 'mgr-3',
    name: 'Roberto Antunes Dantas',
    role: 'Chefe de Pista & Coordenador Noturno',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bio: 'Responsável pela operação 24 horas da unidade rodoviária, garantindo a segurança de viajantes e a logística de reabastecimento pontual da pista.',
    timeAtCompany: '5 anos de dedicação na Rede RCM',
    phone: '(84) 99122-3344',
    whatsapp: '5584991223344',
    authorizedContact: true
  }
];

export const INITIAL_STATIONS: StationUnit[] = [
  {
    id: 'unidade-joao-camara',
    slug: 'rcm-joao-camara',
    name: 'Posto RCM João Câmara',
    nome: 'Posto RCM João Câmara',
    brandSubtext: 'Unidade Modelo Rodoviária ao Entardecer & 24H',
    city: 'João Câmara',
    cidade: 'João Câmara',
    state: 'RN',
    estado: 'RN',
    address: 'Rodovia BR-406, Km 74, Centro',
    endereco: 'Rodovia BR-406, Km 74, Centro',
    neighborhood: 'Centro / Polo Rodoviário',
    cep: '59550-000',
    phone: '(84) 3262-2100',
    telefone: '(84) 3262-2100',
    whatsapp: '5584998765432',
    openingHours: '24 Horas (Atendimento Ininterrupto)',
    horario: '24 Horas (Atendimento Ininterrupto)',
    coordinates: {
      lat: -5.5367,
      lng: -35.8197
    },
    latitude: -5.5367,
    longitude: -35.8197,
    googleMapsUrl: 'https://maps.google.com/?q=Rede+de+Postos+RCM+Joao+Camara',
    featured: true,
    photo: '/assets/rcm-joao-camara.jpeg',
    fotoCapa: '/assets/rcm-joao-camara.jpeg',
    gallery: [
      '/assets/rcm-joao-camara.jpeg',
      '/assets/rcm_station_hero.jpg'
    ],
    galeriaFotos: [
      '/assets/rcm-joao-camara.jpeg',
      '/assets/rcm_station_hero.jpg'
    ],
    description: 'Unidade de referência no polo de João Câmara/RN com ampla pista de abastecimento ao entardecer e operação 24 horas, loja de conveniência, troca de óleo especializada e combustíveis com controle rigoroso de densidade e pureza.',
    descricao: 'Unidade de referência no polo de João Câmara/RN com ampla pista de abastecimento ao entardecer e operação 24 horas, loja de conveniência, troca de óleo especializada e combustíveis com controle rigoroso de densidade e pureza.',
    serviceIds: [
      'srv-abastecimento',
      'srv-troca-oleo',
      'srv-conveniencia',
      'srv-calibragem',
      'srv-limpeza',
      'srv-banheiros',
      'srv-estacionamento'
    ],
    servicos: [
      'Abastecimento Certificado',
      'Troca de Óleo',
      'Conveniência Completa',
      'Calibragem Digital',
      'Limpeza de Para-brisa',
      'Sanitários Acessíveis',
      'Pátio Seguro'
    ],
    stationManagerId: 'mgr-1',
    chefePista: 'Carlos Eduardo Silveira'
  },
  {
    id: 'unidade-alcantil',
    slug: 'rcm-alcantil',
    name: 'Posto RCM Alcantil',
    nome: 'Posto RCM Alcantil',
    brandSubtext: 'Operação Noturna 24H com Totem & LED',
    city: 'Alcantil',
    cidade: 'Alcantil',
    state: 'PB',
    estado: 'PB',
    address: 'Rodovia BR-104, Km 182',
    endereco: 'Rodovia BR-104, Km 182',
    neighborhood: 'Entrada da Cidade',
    cep: '58460-000',
    phone: '(83) 3348-1122',
    telefone: '(83) 3348-1122',
    whatsapp: '5583998112233',
    openingHours: '24 Horas',
    horario: '24 Horas',
    coordinates: {
      lat: -7.7431,
      lng: -36.0558
    },
    latitude: -7.7431,
    longitude: -36.0558,
    googleMapsUrl: 'https://maps.google.com/?q=Rede+de+Postos+RCM+Alcantil',
    featured: true,
    photo: '/assets/rcm-alcantil.jpeg',
    fotoCapa: '/assets/rcm-alcantil.jpeg',
    gallery: [
      '/assets/rcm-alcantil.jpeg'
    ],
    galeriaFotos: [
      '/assets/rcm-alcantil.jpeg'
    ],
    description: 'Estrutura moderna e iluminada com balizadores em LED e atendimento noturno 24 Horas na BR-104, oferecendo apoio a frotas, motoristas e viajantes com total segurança e comodidade.',
    descricao: 'Estrutura moderna e iluminada com balizadores em LED e atendimento noturno 24 Horas na BR-104, oferecendo apoio a frotas, motoristas e viajantes com total segurança e comodidade.',
    serviceIds: [
      'srv-abastecimento',
      'srv-troca-oleo',
      'srv-conveniencia',
      'srv-calibragem',
      'srv-banheiros',
      'srv-estacionamento'
    ],
    servicos: [
      'Abastecimento Certificado 24H',
      'Conveniência Noturna',
      'Calibragem Digital',
      'Banheiros Higienizados',
      'Estacionamento Seguro'
    ],
    stationManagerId: 'mgr-3',
    chefePista: 'Roberto Antunes Dantas'
  },
  {
    id: 'unidade-tacima',
    slug: 'rcm-tacima',
    name: 'Posto RCM Tacima',
    nome: 'Posto RCM Tacima',
    brandSubtext: 'Estrutura Diurna Moderna na Rota Turística & Comercial',
    city: 'Tacima',
    cidade: 'Tacima',
    state: 'PB',
    estado: 'PB',
    address: 'Rodovia PB-111, Saída para Araruna',
    endereco: 'Rodovia PB-111, Saída para Araruna',
    neighborhood: 'Centro / Entrada Principal',
    cep: '58240-000',
    phone: '(83) 3378-1090',
    telefone: '(83) 3378-1090',
    whatsapp: '5583997788990',
    openingHours: '05:00 às 23:00',
    horario: '05:00 às 23:00',
    coordinates: {
      lat: -6.4889,
      lng: -35.6389
    },
    latitude: -6.4889,
    longitude: -35.6389,
    googleMapsUrl: 'https://maps.google.com/?q=Rede+de+Postos+RCM+Tacima',
    featured: true,
    photo: '/assets/rcm-tacima.jpeg',
    fotoCapa: '/assets/rcm-tacima.jpeg',
    gallery: [
      '/assets/rcm-tacima.jpeg'
    ],
    galeriaFotos: [
      '/assets/rcm-tacima.jpeg'
    ],
    description: 'Unidade com cobertura ampla em linhas arrojadas, bombas multiprodutos de última geração e pátio pavimentado, projetada para atender a população local e o escoamento regional com combustíveis certificados e cortesia de pista.',
    descricao: 'Unidade com cobertura ampla em linhas arrojadas, bombas multiprodutos de última geração e pátio pavimentado, projetada para atender a população local e o escoamento regional com combustíveis certificados e cortesia de pista.',
    serviceIds: [
      'srv-abastecimento',
      'srv-troca-oleo',
      'srv-calibragem',
      'srv-limpeza',
      'srv-banheiros',
      'srv-estacionamento'
    ],
    servicos: [
      'Abastecimento Certificado',
      'Troca de Óleo Técnica',
      'Calibragem Digital',
      'Limpeza de Para-brisa',
      'Banheiros Higienizados'
    ],
    stationManagerId: 'mgr-2',
    chefePista: 'Marcos Vinícius Pereira'
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-lub-1',
    name: 'Óleo Sintético 5W-30 Premium API SP',
    brand: 'RCM Performance Line',
    category: 'lubrificantes',
    description: 'Lubrificante 100% sintético desenvolvido para motores modernos a gasolina, etanol, flex e GNV. Garante máxima proteção contra o desgaste e economia de combustível.',
    specifications: 'Viscosidade SAE 5W-30 | API SP / ILSAC GF-6A | Acea A5/B5',
    application: 'Motores modernos com injeção direta, turbo e motores flex aspirados.',
    volume: '1 Litro',
    benefits: [
      'Redução do atrito interno e maior economia de combustível',
      'Proteção superior contra pré-ignição em baixas rotações (LSPI)',
      'Excelente partida a frio e limpeza dos pistões'
    ],
    photo: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?auto=format&fit=crop&w=600&q=80',
    featured: true
  },
  {
    id: 'prod-lub-2',
    name: 'Óleo Semissintético 10W-40 Multivalvular',
    brand: 'RCM Performance Line',
    category: 'oleos',
    description: 'Formulação semissintética com bases minerais selecionadas e aditivos de alta performance para veículos com alta quilometragem ou uso severo.',
    specifications: 'Viscosidade SAE 10W-40 | API SN/CF | ACEA A3/B4',
    application: 'Automóveis leves, SUVs e utilitários que solicitam viscosidade 10W-40.',
    volume: '1 Litro',
    benefits: [
      'Controle rigoroso da formação de borras e depósitos',
      'Película protetora estável mesmo sob altas temperaturas do trânsito urbano',
      'Prolonga a vida útil das vedações do motor'
    ],
    photo: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=600&q=80',
    featured: true
  },
  {
    id: 'prod-adit-1',
    name: 'Aditivo Concentrado para Combustível Flex Cleaner',
    brand: 'RCM PowerTech',
    category: 'aditivos',
    description: 'Aditivo com detergentes e dispersantes sintéticos para descarbonização instantânea de bicos injetores e válvulas.',
    specifications: 'Tratamento de até 60 litros de combustível (Etanol ou Gasolina).',
    application: 'Tanque de combustível automotivo antes do abastecimento completo.',
    volume: '200 ml',
    benefits: [
      'Restaura a potência original e a aceleração imediata',
      'Reduz as emissões poluentes e a fumaça de escapamento',
      'Elimina falhas e engasgos na marcha lenta'
    ],
    photo: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=600&q=80',
    featured: true
  },
  {
    id: 'prod-flui-1',
    name: 'Fluido de Arrefecimento Orgânico Concentrado',
    brand: 'RCM Shield Guard',
    category: 'fluidos',
    description: 'Formulação de base monoetilenoglicol com tecnologia orgânica (OAT) para proteção prolongada do radiador contra fervura, congelamento e corrosão galvânica.',
    specifications: 'Norma ABNT NBR 13705 / ASTM D3306',
    application: 'Sistema de arrefecimento de automóveis, utilitários e caminhões.',
    volume: '1 Litro',
    benefits: [
      'Proteção ativa de ligas de alumínio e ferro fundido',
      'Intervalo de troca estendido em até 5 anos ou 150.000 km',
      'Compatível com mangueiras e sensores modernos'
    ],
    photo: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=600&q=80',
    featured: false
  },
  {
    id: 'prod-flui-2',
    name: 'Fluido de Freio Sintético DOT 4 Super',
    brand: 'RCM Safety Drive',
    category: 'fluidos',
    description: 'Fluido sintético de alta estabilidade térmica e alto ponto de ebulição para sistemas hidráulicos de freio a disco e ABS.',
    specifications: 'DOT 4 | Ponto de ebulição seco > 260°C | Ponto úmido > 165°C',
    application: 'Freios e embreagens hidráulicas de automóveis e motos.',
    volume: '500 ml',
    benefits: [
      'Resposta precisa do pedal de freio mesmo em frenagens de emergência',
      'Excelente resistência contra formação de bolhas de vapor d’água',
      'Proteção contra oxidação de pistões e cilindros'
    ],
    photo: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
    featured: false
  },
  {
    id: 'prod-auto-1',
    name: 'Aditivo Limpa Para-brisa Antiembaçante VisioClear',
    brand: 'RCM Auto Care',
    category: 'automotivos',
    description: 'Aditivo especial para o reservatório do esguicho do limpador. Remove insetos, poeira e fuligem com facilidade sem riscar.',
    specifications: 'Diluição: 100 ml para até 3 litros de água limpa.',
    application: 'Reservatório do limpador de para-brisa de qualquer veículo.',
    volume: '100 ml',
    benefits: [
      'Desengordurante com aroma cítrico agradável',
      'Preserva as borrachas das palhetas e evita trepidações',
      'Aumenta a nitidez em noites chuvosas'
    ],
    photo: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=600&q=80',
    featured: true
  }
];

export const INITIAL_NEWS: NewsItem[] = [
  {
    id: 'news-1',
    slug: 'expansao-rede-rcm-novas-unidades',
    title: 'Rede de Postos RCM anuncia plano de expansão regional e modernização tecnológica',
    category: 'Expansão',
    date: '15 de Setembro de 2026',
    author: 'Comunicação Institucional RCM',
    readTime: '3 min de leitura',
    summary: 'Com novos investimentos em infraestrutura e serviços de conveniência, a Rede RCM fortalece sua presença com padrão premium de atendimento.',
    content: `A Rede de Postos RCM segue em ritmo acelerado de crescimento e consolidação da sua marca no cenário regional. Com um plano de expansão focado na modernização de pistas, implementação de tecnologia digital de abastecimento e integração com centros de conveniência, a rede reforça o compromisso de estar cada vez mais perto do motorista.

De acordo com a diretoria executiva, cada nova unidade inaugurada carrega os pilares inegociáveis da marca: pureza atestada em cada bico injetor, frentistas capacitados através de programas contínuos de desenvolvimento e espaços desenhados para oferecer aconchego e praticidade ao usuário.

"Nossa meta não é apenas abastecer veículos, mas acolher as pessoas que movem nossa região todos os dias", destaca o comunicado oficial. A previsão para os próximos meses é de integração completa dos canais digitais e expansão do portfólio de serviços.`,
    coverImage: '/assets/expansao-rcm.jpg',
    featured: true,
    relatedStationId: 'unidade-parnamirim'
  },
  {
    id: 'news-2',
    slug: 'controle-qualidade-combustivel-rcm',
    title: 'Como a RCM garante a pureza do combustível do tanque do caminhão até o bico da bomba',
    category: 'Novidades',
    date: '02 de Setembro de 2026',
    author: 'Equipe de Qualidade e Segurança',
    readTime: '4 min de leitura',
    summary: 'Entenda os testes laboratoriais e o processo de tripla filtragem que protegem a vida útil do seu motor.',
    content: `A confiança conquistada pelos postos da Rede RCM tem uma explicação técnica direta: o programa rigoroso de controle de qualidade executado a cada descarregamento de combustível.

Todos os lotes transportados pela frota própria da RCM passam obrigatoriamente pelos seguintes procedimentos antes de entrarem nos tanques subterrâneos:
1. Teste de aspecto e cor para identificação visual de pureza;
2. Teste de densidade com termodensímetro aferido pelo INMETRO;
3. Teste da proveta (teor de etanol anidro na gasolina);
4. Análise de ponto de fulgor e condutividade para Diesel S-10.

Qualquer cliente pode solicitar a realização do teste de proveta gratuitamente e na hora em qualquer unidade da rede, acompanhado pelo chefe de pista.`,
    coverImage: '/assets/novidades-rcm.jpg',
    featured: false,
    relatedStationId: 'unidade-natal-sul'
  },
  {
    id: 'news-3',
    slug: 'programa-desenvolvimento-lideranca-pista',
    title: 'Capacitação e Humanização: RCM realiza nova edição da Trilha de Líderes de Pista',
    category: 'Treinamento',
    date: '20 de Agosto de 2026',
    author: 'Recursos Humanos RCM',
    readTime: '3 min de leitura',
    summary: 'Colaboradores participam de imersão sobre segurança de pista, inteligência emocional e atendimento acolhedor.',
    content: `A Rede RCM concluiu com sucesso mais um módulo do programa contínuo de capacitação dos chefes de pista e gerentes de atendimento. O encontro reuniu profissionais das diversas unidades em um ciclo de oficinas práticas sobre protocolos de segurança contra incêndios, boas práticas ambientais e atendimento focado na satisfação do cliente.

A valorização do ser humano é o motor principal da RCM. Investir em capacitação reflete diretamente no sorriso sincero e na agilidade com que o cliente é recebido na pista.`,
    coverImage: '/assets/treinamento-rcm.jpg',
    featured: false,
    relatedActionId: 'acao-treinamento-1'
  }
];

export const INITIAL_ACTIONS: ActionItem[] = [
  {
    id: 'acao-treinamento-1',
    title: 'Trilha de Excelência Operacional e Liderança RCM',
    type: 'Treinamentos',
    date: 'Agosto de 2026',
    location: 'Centro de Capacitação Integrado RCM - Parnamirim/RN',
    coverImage: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Imersão profissional reunindo mais de 60 colaboradores da linha de frente. Foco em padronização de procedimentos operacionais, segurança do trabalho (NR-20), empatia no atendimento ao cliente e dinâmicas de equipe.',
    relatedNewsId: 'news-3',
    relatedStationId: 'unidade-parnamirim'
  },
  {
    id: 'acao-social-1',
    title: 'Campanha RCM Solidária: Aqueça com Amor',
    type: 'Ações Sociais',
    date: 'Julho de 2026',
    location: 'Todas as unidades da Rede RCM',
    coverImage: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Arrecadação de agasalhos, cobertores e alimentos não perecíveis nos postos da rede, com distribuição direta para instituições de acolhimento e comunidades vulneráveis no entorno das nossas unidades.',
    relatedStationId: 'unidade-natal-sul'
  },
  {
    id: 'acao-sipat-1',
    title: 'Semana Interna de Prevenção de Acidentes no Trabalho (SIPAT)',
    type: 'SIPAT',
    date: 'Junho de 2026',
    location: 'Auditório Operacional e Pistas de Abastecimento',
    coverImage: 'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1577495508048-b635879837f1?auto=format&fit=crop&w=800&q=80'
    ],
    description: 'Palestras de ergonomia, prevenção e combate a princípios de incêndio, saúde mental do motorista e cuidados com a audição e respiração no ambiente de pista e oficina.'
  }
];

export const INITIAL_CLASSIFIEDS: ClassifiedItem[] = [
  {
    id: 'classif-1',
    title: 'Ponto Comercial Estratégico para Loja de Conveniência ou Cafeteria',
    stationUnitId: 'unidade-parnamirim',
    stationUnitName: 'Posto RCM Parnamirim',
    city: 'Parnamirim',
    state: 'RN',
    address: 'Av. Brigadeiro Everaldo Breves, 1420',
    type: 'Loja de Conveniência',
    area: 95,
    description: 'Excelente ponto comercial com vitrine de vidro voltada diretamente para o fluxo da pista de abastecimento e calçada principal. Piso em porcelanato de alto tráfego, banheiros privativos prontos, preparação para ar condicionado split e trifásico.',
    status: 'DISPONÍVEL',
    photos: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80'
    ],
    contactPhone: '(84) 3645-1200',
    contactWhatsapp: '5584998765432',
    features: [
      'Área de 95 m² privativos',
      'Alta visibilidade e fluxo de veículos garantido',
      'Vagas de estacionamento dedicadas na frente',
      'Ponto hidráulico e elétrico para cafeteria ou lanchonete',
      'Segurança e iluminação 24 horas'
    ],
    priceInfo: 'Sob Consulta Comercial'
  },
  {
    id: 'classif-2',
    title: 'Box Estruturado para Lava-Jato a Seco ou Estética Automotiva',
    stationUnitId: 'unidade-natal-sul',
    stationUnitName: 'Posto RCM Natal Sul',
    city: 'Natal',
    state: 'RN',
    address: 'Rodovia BR-101 Sul, Km 98',
    type: 'Box Automotivo / Lava-Jato',
    area: 120,
    description: 'Espaço com piso drenante, rampa de acesso, separador de água e óleo homologado e cobertura termoacústica. Ideal para empreendedores de estética automotiva, lavagem detalhada ou envelopamento.',
    status: 'EM NEGOCIAÇÃO',
    photos: [
      'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&w=800&q=80'
    ],
    contactPhone: '(84) 3218-4500',
    contactWhatsapp: '5584988112244',
    features: [
      'Área de 120 m² com cobertura completa',
      'Caixa separadora de efluentes regularizada',
      'Fluxo diário de centenas de motoristas de aplicativo e frotas',
      'Apoio de vestiário e banheiro de funcionários'
    ],
    priceInfo: 'Sob Consulta Comercial'
  },
  {
    id: 'classif-3',
    title: 'Sala Comercial no Mezanino para Escritório de Logística ou Despachante',
    stationUnitId: 'unidade-macaiba',
    stationUnitName: 'Posto RCM Macaíba',
    city: 'Macaíba',
    state: 'RN',
    address: 'BR-304, Acesso Industrial',
    type: 'Sala Comercial',
    area: 45,
    description: 'Sala no 1º piso com vista ampla para o pátio de carretas. Ideal para empresas de transporte, seguradoras de carga, cooperativas ou despachantes veiculares.',
    status: 'DISPONÍVEL',
    photos: [
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80'
    ],
    contactPhone: '(84) 3271-8890',
    contactWhatsapp: '5584994556677',
    features: [
      'Área de 45 m² climatizada',
      'Interfone e acesso seguro',
      'Localização estratégica para transporte de cargas'
    ],
    priceInfo: 'Sob Consulta Comercial'
  }
];

export const INITIAL_TRANSPORTER: TransporterData = {
  title: 'Logística RCM: A Força que Abastece Nossas Unidades',
  subtitle: 'Frota moderna, segurança química rigorosa e rastreamento telemetrado 24 horas por dia.',
  description: 'A operação de transporte da Rede RCM é o coração da nossa garantia de pontualidade e procedência. Com caminhões-tanque de última geração, compartimentos selados e motoristas treinados com certificação MOPE (Movimentação Operacional de Produtos Perigosos), garantimos que o combustível saia das bases de distribuição direto para nossas unidades sem nenhum intermediário.',
  fleetCount: 28,
  citiesServed: 14,
  monthlyVolumeLiters: '6.5 Milhões de Litros',
  punctualityRate: '99.8%',
  certifications: [
    'Certificação MOPE para 100% dos condutores',
    'Licenciamento Ambiental e ANP atualizados',
    'Telemetria e controle de velocidade em tempo real',
    'Manutenção preventiva rigorosa de válvulas e tanques'
  ],
  features: [
    {
      title: 'Lacres Eletrônicos Rastreados',
      description: 'Cada bocal e válvula do caminhão possui lacre eletrônico inviolável com monitoramento de abertura via satélite.',
      icon: 'ShieldCheck'
    },
    {
      title: 'Rastreamento por Telemetria 24/7',
      description: 'Central de controle operacional monitora rotas, curvas, velocidade e paradas não programadas em tempo real.',
      icon: 'MapPin'
    },
    {
      title: 'Segurança e Sustentabilidade',
      description: 'Caminhões com tecnologia Euro 6 de baixíssima emissão de particulados e kits de contenção emergencial em todas as carretas.',
      icon: 'Truck'
    }
  ],
  gallery: [
    '/assets/rcm_transportadora.jpg',
    'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1000&q=80',
    'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80'
  ]
};

export const INITIAL_JOBS: JobOpportunity[] = [
  {
    id: 'job-1',
    title: 'Frentista Atendente de Pista',
    department: 'Operações de Pista',
    city: 'Parnamirim',
    state: 'RN',
    type: 'Efetivo (CLT)',
    requirements: [
      'Ensino Médio completo',
      'Boa comunicação interpessoal e simpatia no atendimento',
      'Disponibilidade para trabalhar em escala de revezamento (inclui finais de semana)',
      'Experiência prévia em atendimento ao público é um diferencial'
    ],
    benefits: [
      'Salário compatível com a categoria + Adicional de Periculosidade (30%)',
      'Vale Alimentação / Refeição',
      'Plano de Saúde e Odontológico coparticipativo',
      'Treinamento remunerado e certificação NR-20'
    ],
    status: 'Aberta'
  },
  {
    id: 'job-2',
    title: 'Técnico de Troca de Óleo e Lubrificação',
    department: 'Mecânica Rápida',
    city: 'Natal',
    state: 'RN',
    type: 'Efetivo (CLT)',
    requirements: [
      'Ensino Médio completo com curso na área automotiva',
      'Conhecimento prático de filtros de óleo, ar, combustível e cabine',
      'Atenção às normas técnicas e especificações de montadoras',
      'Organização e cuidado com ferramentas e descarte ecológico'
    ],
    benefits: [
      'Salário base + comissão por metas de lubrificação',
      'Adicional de insalubridade',
      'Vale Transporte e Refeição no local',
      'Uniformes e EPIs completos fornecidos pela empresa'
    ],
    status: 'Aberta'
  },
  {
    id: 'job-3',
    title: 'Operador(a) de Caixa - Loja de Conveniência',
    department: 'Conveniência',
    city: 'Parnamirim',
    state: 'RN',
    type: 'Efetivo (CLT)',
    requirements: [
      'Ensino Médio completo',
      'Agilidade com fechamento de caixa e meios de pagamento digitais',
      'Organização e reposição de mercadorias nas gôndolas e geladeiras',
      'Pontualidade e espírito de equipe'
    ],
    benefits: [
      'Salário fixo + quebra de caixa',
      'Vale Alimentação',
      'Convênio farmácia',
      'Oportunidade real de crescimento para gerência de loja'
    ],
    status: 'Aberta'
  },
  {
    id: 'job-4',
    title: 'Motorista Carreteiro de Combustíveis (Cat. E)',
    department: 'Nossa Transportadora',
    city: 'Região Metropolitana',
    state: 'RN',
    type: 'Efetivo (CLT)',
    requirements: [
      'CNH Categoria E ativa com EAR (Exerce Atividade Remunerada)',
      'Curso MOPE atualizado na CNH',
      'Experiência mínima comprovada em carteira com transporte de carga perigosa líquida',
      'Histórico de direção defensiva e responsabilidade'
    ],
    benefits: [
      'Salário da categoria + Diárias de viagem',
      'Seguro de vida em grupo especial',
      'Caminhões modernos com ar condicionado e cabine leito',
      'Plano de saúde para o titular e dependentes'
    ],
    status: 'Aberta'
  }
];

export const INITIAL_MILESTONES: CompanyMilestone[] = [
  {
    year: '2012',
    title: 'A Fundação do Primeiro Posto RCM',
    description: 'Inauguração da primeira unidade com o compromisso inegociável de combustível puro e atendimento acolhedor na pista.',
    tag: 'O Começo'
  },
  {
    year: '2016',
    title: 'Nascimento da Transportadora Própria',
    description: 'Aquisição da primeira frota de caminhões-tanque para garantir autonomia logística e controle de qualidade desde as bases distribuidoras.',
    tag: 'Autonomia & Qualidade'
  },
  {
    year: '2020',
    title: 'Criação do Conceito de Conveniência Integrada',
    description: 'Transformação dos postos em pontos de conveniência, serviços rápidos e gastronomia para a família e o motorista.',
    tag: 'Experiência do Cliente'
  },
  {
    year: '2024',
    title: 'Lançamento do Mascote Oficial e Nova Identidade Visual',
    description: 'Apresentação do mascote RCM e da assinatura corporativa em azul e laranja, simbolizando calor humano, inovação e proximidade.',
    tag: 'Identidade & Reconhecimento'
  },
  {
    year: '2026',
    title: 'Plano de Expansão e Ecossistema Digital RCM',
    description: 'Lançamento da nova plataforma tecnológica institucional, consolidação do portal de notícias RCM News e abertura de novos espaços comerciais.',
    tag: 'Expansão & Futuro'
  }
];
