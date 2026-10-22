import React from 'react';
import { Send, RotateCcw, Shuffle, Sparkles, AlertCircle, Info } from 'lucide-react';
import { IrisFeatures } from '../types';
import { SAMPLE_PRESETS } from '../constants';

interface PredictionFormProps {
  features: IrisFeatures;
  onChange: (features: IrisFeatures) => void;
  onSubmit: (e?: React.FormEvent) => void;
  isLoading: boolean;
  onReset: () => void;
  onSelectPreset: (presetFeatures: IrisFeatures) => void;
  onRandomSample: () => void;
}

interface FieldConfig {
  key: keyof IrisFeatures;
  label: string;
  part: 'Sépala' | 'Pétala';
  dimension: 'Comprimento' | 'Largura';
  min: number;
  max: number;
  step: number;
  unit: string;
  typicalInfo: string;
  colorClass: string;
}

const FIELDS: FieldConfig[] = [
  {
    key: 'sepal_length',
    label: 'sepal_length',
    part: 'Sépala',
    dimension: 'Comprimento',
    min: 4.0,
    max: 8.5,
    step: 0.1,
    unit: 'cm',
    typicalInfo: 'Faixa observada: 4.3 a 7.9 cm',
    colorClass: 'text-indigo-600 dark:text-indigo-400 focus-within:border-indigo-500',
  },
  {
    key: 'sepal_width',
    label: 'sepal_width',
    part: 'Sépala',
    dimension: 'Largura',
    min: 2.0,
    max: 4.5,
    step: 0.1,
    unit: 'cm',
    typicalInfo: 'Faixa observada: 2.0 a 4.4 cm',
    colorClass: 'text-indigo-600 dark:text-indigo-400 focus-within:border-indigo-500',
  },
  {
    key: 'petal_length',
    label: 'petal_length',
    part: 'Pétala',
    dimension: 'Comprimento',
    min: 1.0,
    max: 7.0,
    step: 0.1,
    unit: 'cm',
    typicalInfo: 'Faixa observada: 1.0 a 6.9 cm',
    colorClass: 'text-violet-600 dark:text-violet-400 focus-within:border-violet-500',
  },
  {
    key: 'petal_width',
    label: 'petal_width',
    part: 'Pétala',
    dimension: 'Largura',
    min: 0.1,
    max: 2.8,
    step: 0.1,
    unit: 'cm',
    typicalInfo: 'Faixa observada: 0.1 a 2.5 cm',
    colorClass: 'text-violet-600 dark:text-violet-400 focus-within:border-violet-500',
  },
];

export const PredictionForm: React.FC<PredictionFormProps> = ({
  features,
  onChange,
  onSubmit,
  isLoading,
  onReset,
  onSelectPreset,
  onRandomSample,
}) => {
  const handleInputChange = (key: keyof IrisFeatures, rawValue: string) => {
    const val = parseFloat(rawValue);
    onChange({
      ...features,
      [key]: isNaN(val) ? 0 : Number(val.toFixed(2)),
    });
  };

  const handleSliderChange = (key: keyof IrisFeatures, rawValue: number) => {
    onChange({
      ...features,
      [key]: Number(rawValue.toFixed(1)),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(e);
  };

  // Validation
  const isValid =
    features.sepal_length > 0 &&
    features.sepal_width > 0 &&
    features.petal_length > 0 &&
    features.petal_width > 0;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-7 flex flex-col justify-between">
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-5 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <div className="flex items-center gap-2 text-xs text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">
              <span>Parâmetros Morfológicos</span>
              <span aria-hidden="true">·</span>
              <span>4 Variáveis</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
              Inserção de Medidas
            </h2>
          </div>
          <button
            type="button"
            onClick={onRandomSample}
            disabled={isLoading}
            className="px-3 py-1.5 text-xs font-medium text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5 disabled:opacity-50"
            title="Gerar valores aleatórios dentro da distribuição"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Aleatório</span>
          </button>
        </div>

        {/* Quick Presets */}
        <div className="mb-6">
          <label className="block text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">
            Amostras de Referência Rápida:
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {SAMPLE_PRESETS.map((preset, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectPreset(preset.features)}
                disabled={isLoading}
                className="text-left p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-white dark:hover:bg-slate-800 transition-all text-xs group disabled:opacity-50"
              >
                <div className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 truncate">
                  {preset.speciesExpected}
                </div>
                <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono tabular-nums mt-0.5 truncate">
                  {preset.features.sepal_length}/{preset.features.sepal_width}/{preset.features.petal_length}/{preset.features.petal_width}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} id="iris-prediction-form" className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FIELDS.map((field) => {
              const currentValue = features[field.key];
              const isSepal = field.part === 'Sépala';

              return (
                <div
                  key={field.key}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/20 hover:border-slate-300 dark:hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                        {field.part} · {field.dimension}
                      </span>
                      <span className="text-[11px] text-slate-400 dark:text-slate-500 block font-mono">
                        {field.label}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <input
                        type="number"
                        id={field.key}
                        name={field.key}
                        value={currentValue === 0 ? '' : currentValue}
                        onChange={(e) => handleInputChange(field.key, e.target.value)}
                        step={field.step}
                        min={0.1}
                        max={10.0}
                        required
                        disabled={isLoading}
                        className="w-20 px-2 py-1 text-right text-sm font-mono font-semibold tabular-nums text-slate-900 dark:text-white bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50"
                      />
                      <span className="text-xs text-slate-400 font-medium">{field.unit}</span>
                    </div>
                  </div>

                  {/* Range Slider */}
                  <div className="pt-2">
                    <input
                      type="range"
                      min={field.min}
                      max={field.max}
                      step={field.step}
                      value={currentValue || field.min}
                      onChange={(e) => handleSliderChange(field.key, parseFloat(e.target.value))}
                      disabled={isLoading}
                      className={`w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600 disabled:opacity-50`}
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 font-mono tabular-nums mt-1">
                      <span>{field.min} cm</span>
                      <span className="text-slate-500 dark:text-slate-400">{field.typicalInfo}</span>
                      <span>{field.max} cm</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {!isValid && (
            <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>Por favor, preencha todos os 4 campos com valores numéricos positivos.</span>
            </div>
          )}
        </form>
      </div>

      {/* Form Action Buttons */}
      <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onReset}
          disabled={isLoading}
          className="px-4 py-2.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors flex items-center gap-1.5 disabled:opacity-50"
          title="Limpar formulário"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Limpar</span>
        </button>

        <button
          type="submit"
          form="iris-prediction-form"
          disabled={isLoading || !isValid}
          className="px-6 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 active:scale-[0.98] rounded-xl shadow-md hover:shadow-indigo-500/20 transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Processando predição...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Classificar Flor Iris</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};
