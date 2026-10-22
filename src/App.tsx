/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TopNav } from './components/TopNav';
import { PredictionForm } from './components/PredictionForm';
import { PredictionResultCard } from './components/PredictionResultCard';
import { FloralAnatomyCard } from './components/FloralAnatomyCard';
import { SpeciesGuide } from './components/SpeciesGuide';
import { HistoryTable } from './components/HistoryTable';
import { IrisFeatures, IrisApiResponse, PredictionHistoryItem } from './types';
import { API_ENDPOINT, SAMPLE_PRESETS } from './constants';
import { Sparkles, Activity, ShieldCheck, Database, Cpu } from 'lucide-react';

export default function App() {
  // Initial state based on the model payload from prompt
  const [features, setFeatures] = useState<IrisFeatures>({
    sepal_length: 6.7,
    sepal_width: 3.0,
    petal_length: 5.2,
    petal_width: 2.3,
  });

  const [prediction, setPrediction] = useState<IrisApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [latencyMs, setLatencyMs] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState<string>('predict');

  // History of predictions in session
  const [history, setHistory] = useState<PredictionHistoryItem[]>(() => {
    try {
      const saved = localStorage.getItem('iris_prediction_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('iris_prediction_history', JSON.stringify(history));
    } catch {
      // Ignore quota errors
    }
  }, [history]);

  // Main prediction API call
  const handlePredict = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();

    // Client-side validation
    if (
      features.sepal_length <= 0 ||
      features.sepal_width <= 0 ||
      features.petal_length <= 0 ||
      features.petal_width <= 0
    ) {
      setError('Todas as 4 medidas devem ser números maiores que zero.');
      return;
    }

    setIsLoading(true);
    setError(null);
    const startTime = performance.now();

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          sepal_length: Number(features.sepal_length),
          sepal_width: Number(features.sepal_width),
          petal_length: Number(features.petal_length),
          petal_width: Number(features.petal_width),
        }),
      });

      const elapsed = Math.round(performance.now() - startTime);
      setLatencyMs(elapsed);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(
          `Erro no servidor (${response.status}): ${
            errorText.slice(0, 150) || 'Falha ao processar predição.'
          }`
        );
      }

      const data: IrisApiResponse = await response.json();
      setPrediction(data);

      // Add to session history
      const newHistoryItem: PredictionHistoryItem = {
        id: `${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
        timestamp: new Date().toLocaleTimeString('pt-BR', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }),
        features: { ...features },
        response: data,
        latencyMs: elapsed,
      };

      setHistory((prev) => [newHistoryItem, ...prev.slice(0, 19)]); // keep last 20
    } catch (err: unknown) {
      const msg =
        err instanceof Error
          ? err.message
          : 'Falha na comunicação com a API. Verifique sua conexão ou tente novamente.';
      setError(msg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setFeatures({
      sepal_length: 5.0,
      sepal_width: 3.0,
      petal_length: 1.5,
      petal_width: 0.2,
    });
    setError(null);
  };

  const handleSelectPreset = (presetFeatures: IrisFeatures) => {
    setFeatures({ ...presetFeatures });
    setError(null);
  };

  const handleRandomSample = () => {
    // Generate realistic values
    const speciesIndex = Math.floor(Math.random() * 3);
    let sample: IrisFeatures;

    if (speciesIndex === 0) {
      // Setosa
      sample = {
        sepal_length: Number((4.5 + Math.random() * 1.2).toFixed(1)),
        sepal_width: Number((2.8 + Math.random() * 1.4).toFixed(1)),
        petal_length: Number((1.1 + Math.random() * 0.8).toFixed(1)),
        petal_width: Number((0.1 + Math.random() * 0.4).toFixed(1)),
      };
    } else if (speciesIndex === 1) {
      // Versicolor
      sample = {
        sepal_length: Number((5.2 + Math.random() * 1.5).toFixed(1)),
        sepal_width: Number((2.2 + Math.random() * 1.0).toFixed(1)),
        petal_length: Number((3.5 + Math.random() * 1.5).toFixed(1)),
        petal_width: Number((1.0 + Math.random() * 0.7).toFixed(1)),
      };
    } else {
      // Virginica
      sample = {
        sepal_length: Number((5.8 + Math.random() * 2.0).toFixed(1)),
        sepal_width: Number((2.5 + Math.random() * 1.2).toFixed(1)),
        petal_length: Number((5.0 + Math.random() * 1.8).toFixed(1)),
        petal_width: Number((1.6 + Math.random() * 0.9).toFixed(1)),
      };
    }

    setFeatures(sample);
    setError(null);
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem('iris_prediction_history');
    } catch {
      // Ignore
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans antialiased selection:bg-indigo-500 selection:text-white">
      {/* Top Bar Navigation */}
      <TopNav
        onQuickSample={() => handleSelectPreset(SAMPLE_PRESETS[0].features)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Workspace Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-10">
        {/* Hero Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
            <span>Machine Learning & Botânica</span>
            <span aria-hidden="true">·</span>
            <span>API Flask RESTful</span>
            <span aria-hidden="true">·</span>
            <span className="font-mono">POST /api/predict</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white text-balance">
                Classificador Preditivo da Flor Iris
              </h1>
              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 max-w-2xl mt-1 leading-relaxed">
                Insira as 4 medidas biométricas florais para determinar a probabilidade e predição exata entre{' '}
                <strong className="text-slate-800 dark:text-slate-200">Iris setosa</strong>,{' '}
                <strong className="text-slate-800 dark:text-slate-200">Iris versicolor</strong> e{' '}
                <strong className="text-slate-800 dark:text-slate-200">Iris virginica</strong>.
              </p>
            </div>

            {/* Quick Metrics Strip */}
            <div className="flex items-center gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2.5 rounded-xl shadow-xs shrink-0 text-xs">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-indigo-500" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">Dataset</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Fisher (1936)</span>
                </div>
              </div>
              <div className="w-px h-6 bg-slate-200 dark:bg-slate-800" />
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-emerald-500" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">Classes</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">3 Espécies</span>
                </div>
              </div>
              <div className="w-px h-6 bg-slate-200 dark:bg-slate-800" />
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-violet-500" />
                <div>
                  <span className="text-[10px] text-slate-400 block font-mono">Backend</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">Flask + Render</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Prediction Workspace: Form (Left) & Result Card (Right) */}
        <section id="predict" className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 flex flex-col">
            <PredictionForm
              features={features}
              onChange={setFeatures}
              onSubmit={handlePredict}
              isLoading={isLoading}
              onReset={handleReset}
              onSelectPreset={handleSelectPreset}
              onRandomSample={handleRandomSample}
            />
          </div>

          <div className="lg:col-span-5 flex flex-col">
            <PredictionResultCard
              prediction={prediction}
              isLoading={isLoading}
              error={error}
              onRetry={handlePredict}
              latencyMs={latencyMs}
            />
          </div>
        </section>

        {/* Botanical Morphology & Measurement Guide */}
        <section id="anatomy">
          <FloralAnatomyCard />
        </section>

        {/* Species Encyclopedia & Comparison */}
        <section id="species">
          <SpeciesGuide onSelectSample={handleSelectPreset} />
        </section>

        {/* Real-time Query History */}
        <section id="history">
          <HistoryTable
            history={history}
            onClear={handleClearHistory}
            onLoadItem={handleSelectPreset}
          />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-700 dark:text-slate-300">Iris Classifier Dashboard</span>
            <span aria-hidden="true">·</span>
            <span>Compatível com Vercel (esbuild ^0.28.0 & Vite 8)</span>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-[11px] text-slate-400">
              API: {API_ENDPOINT}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
