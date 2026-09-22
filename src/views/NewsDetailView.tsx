import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Share2,
  Check,
  MessageCircle,
  Sparkles,
  Tag
} from 'lucide-react';
import { NewsItem } from '../types';

interface NewsDetailViewProps {
  news: NewsItem;
  onBack: () => void;
}

export const NewsDetailView: React.FC<NewsDetailViewProps> = ({ news, onBack }) => {
  const [copied, setCopied] = useState(false);

  const shareText = `📰 *${news.title}*\n\n${news.summary}\n\nLeia mais no portal oficial da Rede de Postos RCM!`;

  const handleShareWhatsApp = () => {
    const waUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
    window.open(waUrl, '_blank');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 pb-20" id="rcm-news-detail">
      {/* Top sticky return bar */}
      <div className="bg-white border-b border-slate-200 sticky top-20 z-30 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-700 hover:text-blue-900 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Voltar para RCM News</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleShareWhatsApp}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-colors cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>Compartilhar</span>
            </button>
          </div>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-6">
        {/* News Header Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/80 shadow-md">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 rounded-full bg-blue-900 text-white font-bold text-xs">
              {news.category}
            </span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {news.date}
            </span>
            <span className="text-xs text-slate-400">•</span>
            <span className="text-xs text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {news.readTime}
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-display font-bold text-slate-900 leading-tight mb-4">
            {news.title}
          </h1>

          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed pb-6 border-b border-slate-100">
            {news.summary}
          </p>

          {/* Cover Photo */}
          <div className="rounded-2xl overflow-hidden mt-6 mb-8 bg-slate-950">
            <img
              src={news.coverImage}
              alt={news.title}
              className="w-full h-80 sm:h-96 object-cover"
            />
          </div>

          {/* Full Content */}
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4 text-sm sm:text-base">
            {news.content.split('\n\n').map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {/* Photo Gallery if exists */}
          {news.gallery && news.gallery.length > 0 && (
            <div className="mt-10 pt-8 border-t border-slate-100">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
                Galeria de Fotos da Notícia
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {news.gallery.map((imgUrl: string, i: number) => (
                  <div key={i} className="rounded-xl overflow-hidden h-36 bg-slate-100">
                    <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Sharing footer */}
          <div className="mt-10 pt-6 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Gostou da notícia? Compartilhe:
            </span>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleShareWhatsApp}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={handleCopyLink}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
                <span>{copied ? 'Link Copiado!' : 'Copiar Link'}</span>
              </button>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
};
