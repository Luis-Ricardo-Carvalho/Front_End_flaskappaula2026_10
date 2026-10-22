export interface IrisFeatures {
  sepal_length: number;
  sepal_width: number;
  petal_length: number;
  petal_width: number;
}

export interface IrisApiResponse {
  codigo: number;
  dados_recebidos: {
    sepal_length: number;
    sepal_width: number;
    petal_length: number;
    petal_width: number;
  };
  predicao: 'Setosa' | 'Versicolor' | 'Virginica' | string;
}

export interface PredictionHistoryItem {
  id: string;
  timestamp: string;
  features: IrisFeatures;
  response: IrisApiResponse;
  latencyMs: number;
}

export interface SpeciesInfo {
  name: 'Setosa' | 'Versicolor' | 'Virginica';
  code: number;
  scientificName: string;
  family: string;
  image: string;
  color: {
    bg: string;
    border: string;
    text: string;
    badge: string;
    glow: string;
  };
  description: string;
  characteristics: string[];
  typicalRanges: {
    sepalLength: string;
    sepalWidth: string;
    petalLength: string;
    petalWidth: string;
  };
}
