import React from 'react';
import { FLOWER_IMAGES } from '../constants';
import { Info, HelpCircle } from 'lucide-react';

export const FloralAnatomyCard: React.FC = () => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden p-6 sm:p-7">
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">
            Morfologia Botânica
          </span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
            Anatomia Floral da Flor Iris
          </h2>
        </div>
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg">
          <Info className="w-3.5 h-3.5" />
          <span>Guia de Medição</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Anatomy Image */}
        <div className="lg:col-span-5 relative rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 shadow-inner group">
          <img
            src={FLOWER_IMAGES.anatomy}
            alt="Diagrama Anatômico da Flor Iris"
            className="w-full h-auto object-cover transform group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          <div className="absolute bottom-2 left-2 right-2 bg-slate-900/80 backdrop-blur-sm text-[11px] text-slate-200 px-2.5 py-1 rounded-md text-center">
            Morfologia de Sépala (Falls) e Pétala (Standards)
          </div>
        </div>

        {/* Morphological Descriptions */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
              <span>Sépalas (Sepals / Falls)</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
              As peças florais externas que geralmente se recurvam para baixo. No dataset, são mensuradas por <strong>sepal_length</strong> (comprimento) e <strong>sepal_width</strong> (largura).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-700/60">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-violet-500" />
              <span>Pétalas (Petals / Standards)</span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
              As pétalas internas eretas. Medidas por <strong>petal_length</strong> e <strong>petal_width</strong>. Na classificação de Machine Learning, estas são as variáveis de <em>maior poder discriminatório</em> para separar as espécies.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-800/60 text-xs text-emerald-900 dark:text-emerald-300">
            <div className="font-semibold mb-0.5">Regra Prática de Classificação:</div>
            <div className="leading-relaxed">
              Pétalas com comprimento &lt; 2.5 cm são quase invariavelmente <strong>Setosa</strong>. Pétalas intermediárias (3.0 a 5.0 cm) com largura até 1.7 cm indicam <strong>Versicolor</strong>, enquanto pétalas superiores a 5.0 cm com largura expressiva caracterizam <strong>Virginica</strong>.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
