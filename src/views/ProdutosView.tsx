import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Search,
  Filter,
  MessageCircle,
  Fuel,
  Droplets,
  Wrench,
  Store,
  CheckCircle2,
  ChevronRight,
  Info
} from 'lucide-react';
import { useData } from '../context/DataContext';
import { Product } from '../types';
import { RcmMascot } from '../components/RcmMascot';

export const ProdutosView: React.FC = () => {
  const { products } = useData();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeModalProduct, setActiveModalProduct] = useState<Product | null>(null);

  const categories = [
    { id: 'all', label: 'Todos os Produtos', icon: Sparkles },
    { id: 'Combustíveis', label: 'Combustíveis Certificados', icon: Fuel },
    { id: 'Lubrificantes e Aditivos', label: 'Lubrificantes & Aditivos', icon: Droplets },
    { id: 'Produtos Automotivos', label: 'Acessórios Automotivos', icon: Wrench },
    { id: 'Conveniência', label: 'Loja de Conveniência', icon: Store }
  ];

  const filteredProducts = useMemo(() => {
    return products.filter(prod => {
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !term ||
        prod.name.toLowerCase().includes(term) ||
        prod.description.toLowerCase().includes(term) ||
        prod.brand.toLowerCase().includes(term) ||
        prod.application.toLowerCase().includes(term);

      const matchesCat = selectedCategory === 'all' || prod.category === selectedCategory;

      return matchesSearch && matchesCat;
    });
  }, [products, searchTerm, selectedCategory]);

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20" id="rcm-produtos-view">
      {/* Header Banner */}
      <section className="bg-gradient-to-br from-blue-950 via-blue-900 to-indigo-950 text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <span className="inline-block px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 font-bold text-xs uppercase tracking-wider border border-orange-500/30">
              Padrão de Qualidade Assegurado
            </span>
            <h1 className="text-3xl sm:text-5xl font-display font-extrabold tracking-tight">
              CATÁLOGO DE PRODUTOS
            </h1>
            <p className="text-blue-100/90 text-sm sm:text-base leading-relaxed">
              Combustíveis de alta pureza, lubrificantes homologados e conveniência pensados para o seu bem-estar e o alto rendimento do seu veículo.
            </p>
          </div>

          <div className="shrink-0">
            <RcmMascot
              context="produtos"
              size="sm"
              position="inline"
            />
          </div>
        </div>
      </section>

      {/* Main Container */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Category Pills & Search */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            {/* Search Input */}
            <div className="w-full md:max-w-md relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar por nome do produto, marca ou aplicação..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-900 text-xs sm:text-sm text-slate-800"
              />
            </div>

            {/* Product Count */}
            <p className="text-xs font-semibold text-slate-500">
              Exibindo <span className="font-bold text-blue-900">{filteredProducts.length}</span> itens
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-2 border-t border-slate-100">
            {categories.map(cat => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'bg-blue-900 text-white shadow-sm'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5 text-orange-400" />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => {
            const waUrl = `https://wa.me/5584998765432?text=${encodeURIComponent(
              `Olá! Estou no site da Rede RCM e tenho interesse no produto: *${product.name}* (Marca: ${product.brand}). Poderiam me informar disponibilidade e detalhes?`
            )}`;

            return (
              <div
                key={product.id}
                className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Photo with Category Badge */}
                  <div className="relative h-56 bg-slate-100 overflow-hidden">
                    <img
                      src={product.photo}
                      alt={product.name}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-3 py-1 rounded-full bg-blue-900/90 backdrop-blur-md text-white font-bold text-xs shadow-md">
                        {product.category}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3 bg-white/95 px-2.5 py-1 rounded-lg text-[11px] font-bold text-slate-700 shadow-md">
                      {product.volume}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <span className="text-[11px] font-bold text-orange-600 uppercase tracking-wider block mb-1">
                      {product.brand}
                    </span>
                    <h3 className="text-lg font-display font-bold text-slate-900 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed mb-4">
                      {product.description}
                    </p>

                    {/* Benefícios & Diferenciais */}
                    {product.benefits && product.benefits.length > 0 && (
                      <div className="mb-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                          Diferenciais & Benefícios:
                        </span>
                        <div className="space-y-1">
                          {product.benefits.slice(0, 3).map((b, i) => (
                            <div key={i} className="flex items-center gap-1.5 text-xs text-slate-700">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                              <span>{b}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Aplicação */}
                    <div className="p-3 bg-slate-50 rounded-xl text-xs text-slate-600 mb-2">
                      <span className="font-bold text-blue-900 block mb-0.5">Indicação de Uso:</span>
                      <span>{product.application}</span>
                    </div>
                  </div>
                </div>

                {/* Card Footer with CTA TENHO INTERESSE */}
                <div className="p-6 pt-0">
                  <a
                    href={waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs sm:text-sm shadow-md shadow-orange-500/20 transition-all hover:scale-101"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>TENHO INTERESSE</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
