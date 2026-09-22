import React, { useState, useEffect } from 'react';
import { DataProvider, useData } from './context/DataContext';
import { Navbar, ViewTab } from './components/Navbar';
import { Footer } from './components/Footer';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { CookieConsentModal } from './components/CookieConsentModal';

// Views
import { HomeView } from './views/HomeView';
import { QuemSomosView } from './views/QuemSomosView';
import { UnidadesView } from './views/UnidadesView';
import { UnidadeDetailView } from './views/UnidadeDetailView';
import { ProdutosView } from './views/ProdutosView';
import { ServicosView } from './views/ServicosView';
import { NewsView } from './views/NewsView';
import { NewsDetailView } from './views/NewsDetailView';
import { AcoesView } from './views/AcoesView';
import { TransportadoraView } from './views/TransportadoraView';
import { TrabalheConoscoView } from './views/TrabalheConoscoView';
import { ContatoView } from './views/ContatoView';
import { ClassificadosView } from './views/ClassificadosView';
import { AdminPanel } from './views/AdminPanel';

import { StationUnit, NewsItem } from './types';

const AppContent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ViewTab>('home');
  const [selectedStation, setSelectedStation] = useState<StationUnit | null>(null);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  // Scroll to top whenever activeTab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab, selectedStation, selectedNews]);

  const handleSelectStation = (station: StationUnit) => {
    setSelectedStation(station);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectNews = (newsItem: NewsItem) => {
    setSelectedNews(newsItem);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleTabChange = (tab: ViewTab) => {
    setActiveTab(tab);
    // Clear details when navigating via navbar tabs
    setSelectedStation(null);
    setSelectedNews(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-orange-500 selection:text-white">
      {/* Navigation Header */}
      <Navbar activeTab={activeTab} setActiveTab={handleTabChange} />

      {/* Main View Router */}
      <main className="flex-1">
        {/* If a station is selected, show detail view */}
        {selectedStation ? (
          <UnidadeDetailView
            station={selectedStation}
            onBack={() => setSelectedStation(null)}
            onSelectOtherStation={handleSelectStation}
          />
        ) : selectedNews ? (
          <NewsDetailView
            news={selectedNews}
            onBack={() => setSelectedNews(null)}
          />
        ) : (
          <>
            {activeTab === 'home' && (
              <HomeView
                setActiveTab={handleTabChange}
                onSelectUnit={handleSelectStation}
                onSelectNews={handleSelectNews}
              />
            )}
            {activeTab === 'quem-somos' && <QuemSomosView setActiveTab={handleTabChange} />}
            {activeTab === 'unidades' && (
              <UnidadesView
                onSelectUnit={handleSelectStation}
              />
            )}
            {activeTab === 'produtos' && <ProdutosView />}
            {activeTab === 'servicos' && <ServicosView setActiveTab={handleTabChange} />}
            {activeTab === 'rcm-news' && <NewsView onSelectNews={handleSelectNews} />}
            {activeTab === 'acoes' && <AcoesView />}
            {activeTab === 'transportadora' && <TransportadoraView />}
            {activeTab === 'trabalhe-conosco' && <TrabalheConoscoView />}
            {activeTab === 'contato' && <ContatoView />}
            {activeTab === 'classificados' && <ClassificadosView />}
            {activeTab === 'admin' && <AdminPanel />}
          </>
        )}
      </main>

      {/* Footer (hidden when on Admin dashboard to maximize workspace) */}
      {activeTab !== 'admin' && (
        <Footer setActiveTab={handleTabChange} />
      )}

      {/* Global Interactive Floating Elements */}
      <WhatsAppFloatingButton />
      <CookieConsentModal />
    </div>
  );
};

export default function App() {
  return (
    <DataProvider>
      <AppContent />
    </DataProvider>
  );
}
