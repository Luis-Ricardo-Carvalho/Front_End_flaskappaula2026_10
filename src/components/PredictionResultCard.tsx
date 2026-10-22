import React, { useState } from 'react';
import {
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Copy,
  Check,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import { IrisApiResponse } from '../types';
import { SPECIES_DETAILS, FLOWER_IMAGES } from '../constants';

interface PredictionResultCardProps {
  prediction: IrisApiResponse | null;
  isLoading: boolean;
  error: string | null;
  onRetry: () => void;
  latencyMs: number | null;
}

export const PredictionResultCard: React.FC<PredictionResultCardProps> = ({
  prediction,
  isLoading,
  error,
  onRetry,
  latencyMs,
}) => {
  const [copied, setCopied] = useState(false);
  const [showJson, setShowJson] = useState(false);

  const handleCopyJson = () => {
    if (!prediction) return;
    navigator.clipboard.writeText(JSON.stringify(prediction, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // 1. Loading State
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-7 flex flex-col items-center justify-center min-h-[460px] text-center">
        <div className="relative mb-6">
          <div className="w-16 h-16 rounded-full border-4 border-indigo-100 dark:border-indigo-950 border-t-indigo-600 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-indigo-600 animate-pulse" />
          </div>
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
          Consultando Modelo de Machine Learning
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-4">
          Enviando as medidas para a API Flask no Render. Servidores gratuitos podem levar alguns instantes para aquecer se estiverem hibernando.
        </p>
        <div className="flex items-center gap-2 text-xs text-indigo-600 dark:text-indigo-400 font-mono">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
          <span>Aguardando resposta do servidor...</span>
        </div>
      </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-red-200 dark:border-red-900/50 shadow-sm p-7 flex flex-col justify-between min-h-[460px]">
        <div>
          <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center mb-4">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div className="text-xs font-semibold text-red-600 dark:text-red-400 uppercase tracking-wider mb-1">
            Falha na Requisição
          </div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
            Não foi possível obter a predição
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 leading-relaxed">
            {error}
          </p>
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300 space-y-2">
            <p className="font-semibold text-slate-800 dark:text-slate-200">
              Possíveis causas:
            </p>
            <ul className="list-disc pl-4 space-y-1 text-slate-500 dark:text-slate-400">
              <li>O serviço no Render estava dormindo (Cold Start) e atingiu timeout</li>
              <li>Instabilidade temporária de rede ou conectividade</li>
              <li>Valores enviados fora do formato aceito pelo modelo</li>
            </ul>
          </div>
        </div>

        <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end">
          <button
            type="button"
            onClick={onRetry}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all shadow-sm flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            <span>Tentar Novamente</span>
          </button>
        </div>
      </div>
    );
  }

  // 3. Empty State (No prediction yet)
  if (!prediction) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-800 shadow-sm p-7 flex flex-col items-center justify-center min-h-[460px] text-center">
        <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-slate-800 flex items-center justify-center text-indigo-600 dark:text-indigo-400 mb-4">
          <Sparkles className="w-8 h-8 opacity-80" />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
          Aguardando Predição
        </h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 max-w-sm mb-6 leading-relaxed">
          Preencha os valores de sépala e pétala ao lado ou escolha uma amostra de teste e clique em <strong>Classificar Flor Iris</strong>.
        </p>
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs">
          <span>Modelo treinado com o clássico Iris Fisher Dataset</span>
        </div>
      </div>
    );
  }

  // 4. Success State with Highlighted Predicao
  const speciesKey = prediction.predicao;
  const speciesMeta = SPECIES_DETAILS[speciesKey] || {
    name: speciesKey,
    code: prediction.codigo,
    scientificName: `Iris ${speciesKey.toLowerCase()}`,
    family: 'Iridaceae',
    image: FLOWER_IMAGES.Setosa,
    color: {
      bg: 'bg-indigo-50 dark:bg-indigo-950/30',
      border: 'border-indigo-300 dark:border-indigo-800',
      text: 'text-indigo-700 dark:text-indigo-300',
      badge: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-200',
      glow: 'shadow-indigo-500/10',
    },
    description: 'Espécie identificada pelo classificador de Machine Learning.',
    characteristics: ['Classificação automática'],
    typicalRanges: {
      sepalLength: '-',
      sepalWidth: '-',
      petalLength: '-',
      petalWidth: '-',
    },
  };

  const speciesImage = (FLOWER_IMAGES as Record<string, string>)[speciesKey] || speciesMeta.image;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden flex flex-col justify-between transition-all">
      {/* Top Banner / Image & Result Highlight */}
      <div>
        <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-slate-950">
          <img
            src={speciesImage}
            alt={`Flor Iris ${speciesKey}`}
            className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
          {/* Subtle Scrim Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Floating Tag */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md text-slate-800 dark:text-slate-100 shadow-md">
              Classe Código: #{prediction.codigo}
            </span>
            {latencyMs && (
              <span className="px-2.5 py-1 text-xs font-mono tabular-nums rounded-full bg-black/60 backdrop-blur-md text-emerald-300">
                {latencyMs}ms
              </span>
            )}
          </div>

          {/* Prominent Species Header inside Image overlay */}
          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
            <div>
              <div className="text-xs uppercase tracking-wider font-semibold text-indigo-300">
                Predição Concluída
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-md">
                Iris {prediction.predicao}
              </h2>
              <div className="text-xs text-slate-300 italic font-serif">
                {speciesMeta.scientificName} · {speciesMeta.family}
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-emerald-500/90 text-white flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-7 space-y-5">
          {/* Main Description */}
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {speciesMeta.description}
          </p>

          {/* Echo Data (dados_recebidos) in Highlight Cards */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Dados Recebidos pela API
              </span>
              <span className="text-[11px] text-slate-400 dark:text-slate-500">
                Parâmetros validados
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60">
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono block">
                  sepal_length
                </span>
                <span className="text-base font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                  {prediction.dados_recebidos.sepal_length}{' '}
                  <span className="text-xs font-normal text-slate-400">cm</span>
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60">
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono block">
                  sepal_width
                </span>
                <span className="text-base font-bold font-mono tabular-nums text-slate-900 dark:text-white">
                  {prediction.dados_recebidos.sepal_width}{' '}
                  <span className="text-xs font-normal text-slate-400">cm</span>
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60">
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono block">
                  petal_length
                </span>
                <span className="text-base font-bold font-mono tabular-nums text-indigo-600 dark:text-indigo-400">
                  {prediction.dados_recebidos.petal_length}{' '}
                  <span className="text-xs font-normal text-slate-400">cm</span>
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60">
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono block">
                  petal_width
                </span>
                <span className="text-base font-bold font-mono tabular-nums text-indigo-600 dark:text-indigo-400">
                  {prediction.dados_recebidos.petal_width}{' '}
                  <span className="text-xs font-normal text-slate-400">cm</span>
                </span>
              </div>
            </div>
          </div>

          {/* Morphological Traits */}
          <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/20 border border-indigo-100 dark:border-indigo-900/50">
            <span className="text-xs font-bold text-indigo-900 dark:text-indigo-300 block mb-2">
              Características Morfológicas Diagnósticas:
            </span>
            <ul className="space-y-1.5 text-xs text-indigo-950 dark:text-indigo-200">
              {speciesMeta.characteristics.map((item, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Raw JSON toggle */}
          {showJson && (
            <div className="relative mt-3">
              <pre className="p-3.5 rounded-xl bg-slate-900 text-slate-200 text-xs font-mono overflow-x-auto border border-slate-800">
                {JSON.stringify(prediction, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* Card Actions */}
      <div className="p-4 sm:px-7 sm:py-4 bg-slate-50/70 dark:bg-slate-800/40 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
        <button
          type="button"
          onClick={() => setShowJson(!showJson)}
          className="text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium transition-colors"
        >
          {showJson ? 'Ocultar Resposta Raw' : 'Ver Resposta JSON'}
        </button>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyJson}
            className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors flex items-center gap-1.5 font-medium"
            title="Copiar JSON da predição"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-600 font-semibold">Copiado</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar JSON</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
