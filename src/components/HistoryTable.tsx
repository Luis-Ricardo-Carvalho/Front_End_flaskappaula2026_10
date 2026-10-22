import React from 'react';
import { History, Trash2, Download, ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { PredictionHistoryItem, IrisFeatures } from '../types';

interface HistoryTableProps {
  history: PredictionHistoryItem[];
  onClear: () => void;
  onLoadItem: (features: IrisFeatures) => void;
}

export const HistoryTable: React.FC<HistoryTableProps> = ({ history, onClear, onLoadItem }) => {
  const exportCSV = () => {
    if (history.length === 0) return;
    const header = 'Horário,Sepal Length,Sepal Width,Petal Length,Petal Width,Predição,Código,Latência(ms)\n';
    const rows = history
      .map(
        (h) =>
          `"${h.timestamp}",${h.features.sepal_length},${h.features.sepal_width},${h.features.petal_length},${h.features.petal_width},"${h.response.predicao}",${h.response.codigo},${h.latencyMs}`
      )
      .join('\n');
    const blob = new Blob([header + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `iris_predicoes_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-6 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-5 border-b border-slate-100 dark:border-slate-800">
        <div>
          <span className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold tracking-wide uppercase">
            Registro da Sessão
          </span>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mt-0.5 flex items-center gap-2">
            <History className="w-5 h-5 text-indigo-500" />
            <span>Histórico de Predições</span>
          </h2>
        </div>

        {history.length > 0 && (
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={exportCSV}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Exportar CSV</span>
            </button>
            <button
              type="button"
              onClick={onClear}
              className="px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-900/50 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Limpar</span>
            </button>
          </div>
        )}
      </div>

      {history.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Nenhuma predição realizada nesta sessão ainda.
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
            As consultas enviadas à API serão registradas aqui em tempo real.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wider">
                <th className="py-3 px-3">Horário</th>
                <th className="py-3 px-3">Sépala (C × L)</th>
                <th className="py-3 px-3">Pétala (C × L)</th>
                <th className="py-3 px-3">Predição</th>
                <th className="py-3 px-3">Código</th>
                <th className="py-3 px-3 text-right">Latência</th>
                <th className="py-3 px-3 text-right">Ação</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono tabular-nums">
              {history.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                >
                  <td className="py-3 px-3 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {item.timestamp}
                  </td>
                  <td className="py-3 px-3 text-slate-700 dark:text-slate-300 whitespace-nowrap">
                    {item.features.sepal_length} × {item.features.sepal_width} cm
                  </td>
                  <td className="py-3 px-3 text-indigo-600 dark:text-indigo-400 font-semibold whitespace-nowrap">
                    {item.features.petal_length} × {item.features.petal_width} cm
                  </td>
                  <td className="py-3 px-3 font-sans font-semibold">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs ${
                        item.response.predicao === 'Setosa'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                          : item.response.predicao === 'Versicolor'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300'
                          : 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300'
                      }`}
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{item.response.predicao}</span>
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-500 dark:text-slate-400">
                    #{item.response.codigo}
                  </td>
                  <td className="py-3 px-3 text-right text-slate-500 dark:text-slate-400">
                    {item.latencyMs}ms
                  </td>
                  <td className="py-3 px-3 text-right font-sans">
                    <button
                      type="button"
                      onClick={() => onLoadItem(item.features)}
                      className="inline-flex items-center gap-1 text-xs text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
                      title="Preencher formulário com estas medidas"
                    >
                      <span>Usar</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
