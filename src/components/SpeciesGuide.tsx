import React from 'react';
import { SPECIES_DETAILS } from '../constants';
import { IrisFeatures } from '../types';

interface SpeciesGuideProps {
  onSelectSample: (features: IrisFeatures) => void;
}

export const SpeciesGuide: React.FC<SpeciesGuideProps> = ({ onSelectSample }) => {
  const speciesList = Object.values(SPECIES_DETAILS);

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-7">
      <div className="pb-4 mb-6 border-b border-slate-100 dark:border-slate-800">
        <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">
          Taxonomia & Botânica
        </span>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5">
          As Três Espécies do Conjunto de Dados Iris
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Coletado pelo botânico Edgar Anderson em 1935 e imortalizado pelo estatístico Ronald Fisher em 1936.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {speciesList.map((species) => {
          return (
            <div
              key={species.name}
              className="rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 overflow-hidden hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 overflow-hidden bg-slate-900">
                  <img
                    src={species.image}
                    alt={species.name}
                    className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-3 left-3 px-2.5 py-1 text-xs font-semibold rounded-full bg-slate-950/80 text-white backdrop-blur-sm">
                    Código #{species.code}
                  </div>
                  <div className="absolute bottom-2 left-3 text-white font-bold text-lg drop-shadow">
                    Iris {species.name}
                  </div>
                </div>

                <div className="p-4 space-y-3">
                  <div className="text-xs text-slate-400 italic">
                    {species.scientificName}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {species.description}
                  </p>

                  <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/50">
                    <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-1.5">
                      Intervalos Típicos:
                    </span>
                    <div className="grid grid-cols-2 gap-1.5 text-[11px] font-mono tabular-nums text-slate-600 dark:text-slate-300">
                      <div>
                        <span className="text-slate-400 block text-[10px]">Sépala Comp.</span>
                        {species.typicalRanges.sepalLength}
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Sépala Larg.</span>
                        {species.typicalRanges.sepalWidth}
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Pétala Comp.</span>
                        {species.typicalRanges.petalLength}
                      </div>
                      <div>
                        <span className="text-slate-400 block text-[10px]">Pétala Larg.</span>
                        {species.typicalRanges.petalWidth}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-3 bg-white dark:bg-slate-800/60 border-t border-slate-200/60 dark:border-slate-700/50">
                <button
                  type="button"
                  onClick={() => {
                    if (species.name === 'Setosa') {
                      onSelectSample({ sepal_length: 5.0, sepal_width: 3.4, petal_length: 1.5, petal_width: 0.2 });
                    } else if (species.name === 'Versicolor') {
                      onSelectSample({ sepal_length: 5.9, sepal_width: 2.8, petal_length: 4.2, petal_width: 1.3 });
                    } else {
                      onSelectSample({ sepal_length: 6.5, sepal_width: 3.0, petal_length: 5.5, petal_width: 2.0 });
                    }
                  }}
                  className="w-full py-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 bg-indigo-50/50 dark:bg-indigo-950/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/40 rounded-lg transition-colors text-center"
                >
                  Carregar Amostra no Formulário
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
