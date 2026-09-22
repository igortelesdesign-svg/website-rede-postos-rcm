import React, { useState, useMemo } from 'react';
import {
  Search,
  Calendar,
  Clock,
  ChevronRight,
  Share2,
  Sparkles,
  Tag
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { NewsItem } from '../types';

interface NewsViewProps {
  onSelectNews: (news: NewsItem) => void;
}

export const NewsView: React.FC<NewsViewProps> = ({ onSelectNews }) => {
  const { news } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = useMemo(() => {
    return ['all', ...Array.from(new Set(news.map(n => n.category)))];
  }, [news]);

  const filteredNews = useMemo(() => {
    return news.filter(item => {
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !term ||
        item.title.toLowerCase().includes(term) ||
        item.summary.toLowerCase().includes(term) ||
        item.content.toLowerCase().includes(term);

      const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [news, searchTerm, selectedCategory]);

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20" id="rcm-news-view">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-3 text-center max-w-3xl">
          <span className="inline-block px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 font-bold text-xs uppercase tracking-wider border border-orange-500/30">
            Comunicação & Conteúdo
          </span>
          <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight">
            RCM NEWS
          </h1>
          <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed">
            Acompanhe inaugurações de novos postos, dicas automotivas de manutenção preventiva, ações com a comunidade e novidades da Rede RCM.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Search & Category Filter */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md mb-10 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="w-full md:max-w-md relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar notícias, dicas ou comunicados..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-900 text-xs sm:text-sm text-slate-800"
              />
            </div>

            <p className="text-xs font-semibold text-slate-500">
              {filteredNews.length} publicações encontradas
            </p>
          </div>

          {/* Category Badges */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 border-t border-slate-100">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-blue-900 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                {cat === 'all' ? 'Todas as Categorias' : cat}
              </button>
            ))}
          </div>
        </div>

        {/* News Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredNews.map(item => (
            <article
              key={item.id}
              onClick={() => onSelectNews(item)}
              className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              <div>
                <div className="relative h-56 bg-slate-100 overflow-hidden">
                  <img
                    src={item.coverImage}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-blue-900/90 text-white font-bold text-xs shadow-md">
                    {item.category}
                  </span>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-3 text-xs text-slate-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {item.readTime}
                    </span>
                  </div>

                  <h3 className="text-lg font-display font-bold text-slate-900 group-hover:text-blue-900 transition-colors mb-2 line-clamp-2">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                    {item.summary}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-slate-50 flex items-center justify-between text-xs font-bold text-orange-600">
                <span className="group-hover:translate-x-1 transition-transform flex items-center gap-1">
                  Ler Notícia Completa
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};
