import React from 'react';
import { Sparkles, Flower2, ExternalLink } from 'lucide-react';
import { API_ENDPOINT } from '../constants';

interface TopNavProps {
  onQuickSample: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
}

export const TopNav: React.FC<TopNavProps> = ({ onQuickSample, activeSection, setActiveSection }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-violet-600 to-indigo-500 flex items-center justify-center text-white shadow-sm">
            <Flower2 className="w-5 h-5" />
          </div>
          <a
            href="/"
            className="text-lg font-bold tracking-tight text-slate-900 dark:text-white whitespace-nowrap hover:opacity-90 transition-opacity"
          >
            Iris Classifier ML
          </a>
        </div>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600 dark:text-slate-300">
          <button
            onClick={() => setActiveSection('predict')}
            className={`whitespace-nowrap transition-colors hover:text-slate-900 dark:hover:text-white ${
              activeSection === 'predict'
                ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                : ''
            }`}
          >
            Predição & Teste
          </button>
          <button
            onClick={() => setActiveSection('anatomy')}
            className={`whitespace-nowrap transition-colors hover:text-slate-900 dark:hover:text-white ${
              activeSection === 'anatomy'
                ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                : ''
            }`}
          >
            Anatomia Floral
          </button>
          <button
            onClick={() => setActiveSection('species')}
            className={`whitespace-nowrap transition-colors hover:text-slate-900 dark:hover:text-white ${
              activeSection === 'species'
                ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                : ''
            }`}
          >
            Espécies Iris
          </button>
          <button
            onClick={() => setActiveSection('history')}
            className={`whitespace-nowrap transition-colors hover:text-slate-900 dark:hover:text-white ${
              activeSection === 'history'
                ? 'text-indigo-600 dark:text-indigo-400 font-semibold'
                : ''
            }`}
          >
            Histórico
          </button>
        </nav>

        {/* Zone 3: 1 Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onQuickSample}
            type="button"
            className="px-3.5 py-1.5 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-95 rounded-lg shadow-sm transition-all flex items-center gap-1.5 whitespace-nowrap shrink-0"
            title="Preencher com os dados do exemplo solicitado"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Amostra Padrão</span>
          </button>
          <a
            href={API_ENDPOINT}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors whitespace-nowrap"
            title="Acessar endpoint REST da API"
          >
            <span>API</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </header>
  );
};
