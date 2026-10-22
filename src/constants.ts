import anatomyImg from './assets/images/iris_flower_anatomy_1792667740821.jpg';
import setosaImg from './assets/images/iris_setosa_flower_1792667742163.jpg';
import versicolorImg from './assets/images/iris_versicolor_flower_1792667741808.jpg';
import virginicaImg from './assets/images/iris_virginica_flower_1792667741945.jpg';
import { IrisFeatures, SpeciesInfo } from './types';

export const API_ENDPOINT = 'https://flaskappaula2026-luis.onrender.com/api/predict';

export const FLOWER_IMAGES = {
  anatomy: anatomyImg,
  Setosa: setosaImg,
  Versicolor: versicolorImg,
  Virginica: virginicaImg,
};

export const SPECIES_DETAILS: Record<string, SpeciesInfo> = {
  Setosa: {
    name: 'Setosa',
    code: 0,
    scientificName: 'Iris setosa',
    family: 'Iridaceae',
    image: setosaImg,
    color: {
      bg: 'bg-emerald-50 dark:bg-emerald-950/30',
      border: 'border-emerald-300 dark:border-emerald-800',
      text: 'text-emerald-700 dark:text-emerald-300',
      badge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200',
      glow: 'shadow-emerald-500/10',
    },
    description: 'Espécie nativa de regiões árticas e subárticas da América do Norte e leste da Ásia. Notável por apresentar pétalas muito pequenas e sépalas amplas e abertas.',
    characteristics: [
      'Pétalas muito reduzidas (1.0 a 1.9 cm)',
      'Sépalas relativamente largas (2.3 a 4.4 cm)',
      'Fácil separabilidade linear no conjunto Fisher',
    ],
    typicalRanges: {
      sepalLength: '4.3 - 5.8 cm',
      sepalWidth: '2.3 - 4.4 cm',
      petalLength: '1.0 - 1.9 cm',
      petalWidth: '0.1 - 0.6 cm',
    },
  },
  Versicolor: {
    name: 'Versicolor',
    code: 1,
    scientificName: 'Iris versicolor',
    family: 'Iridaceae',
    image: versicolorImg,
    color: {
      bg: 'bg-blue-50 dark:bg-blue-950/30',
      border: 'border-blue-300 dark:border-blue-800',
      text: 'text-blue-700 dark:text-blue-300',
      badge: 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200',
      glow: 'shadow-blue-500/10',
    },
    description: 'Conhecida popularmente como Íris Azul ou Íris Arlequim. Nativa da América do Norte, exibe dimensões intermediárias entre Setosa e Virginica, com padrão estriado característico.',
    characteristics: [
      'Pétalas de comprimento médio (3.0 a 5.1 cm)',
      'Sépalas moderadas (4.9 a 7.0 cm)',
      'Zonas de sobreposição sutil com Virginica',
    ],
    typicalRanges: {
      sepalLength: '4.9 - 7.0 cm',
      sepalWidth: '2.0 - 3.4 cm',
      petalLength: '3.0 - 5.1 cm',
      petalWidth: '1.0 - 1.8 cm',
    },
  },
  Virginica: {
    name: 'Virginica',
    code: 2,
    scientificName: 'Iris virginica',
    family: 'Iridaceae',
    image: virginicaImg,
    color: {
      bg: 'bg-purple-50 dark:bg-purple-950/30',
      border: 'border-purple-300 dark:border-purple-800',
      text: 'text-purple-700 dark:text-purple-300',
      badge: 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-200',
      glow: 'shadow-purple-500/10',
    },
    description: 'Íris da Virgínia, comum em pântanos e áreas úmidas do leste dos Estados Unidos. Apresenta as maiores flores entre as três espécies, com pétalas e sépalas alongadas e robustas.',
    characteristics: [
      'Maiores pétalas do grupo (4.5 a 6.9 cm)',
      'Sépalas longas e recurvadas (4.9 a 7.9 cm)',
      'Pétalas com largura expressiva (> 1.4 cm)',
    ],
    typicalRanges: {
      sepalLength: '4.9 - 7.9 cm',
      sepalWidth: '2.2 - 3.8 cm',
      petalLength: '4.5 - 6.9 cm',
      petalWidth: '1.4 - 2.5 cm',
    },
  },
};

export interface SamplePreset {
  title: string;
  speciesExpected: string;
  features: IrisFeatures;
  description: string;
}

export const SAMPLE_PRESETS: SamplePreset[] = [
  {
    title: 'Exemplo do Modelo (Virginica)',
    speciesExpected: 'Virginica',
    features: {
      sepal_length: 6.7,
      sepal_width: 3.0,
      petal_length: 5.2,
      petal_width: 2.3,
    },
    description: 'Amostra solicitada no enunciado com pétala e sépala grandes.',
  },
  {
    title: 'Amostra Típica Setosa',
    speciesExpected: 'Setosa',
    features: {
      sepal_length: 5.1,
      sepal_width: 3.5,
      petal_length: 1.4,
      petal_width: 0.2,
    },
    description: 'Pétalas diminutas e sépalas amplas clássicas da Setosa.',
  },
  {
    title: 'Amostra Típica Versicolor',
    speciesExpected: 'Versicolor',
    features: {
      sepal_length: 6.0,
      sepal_width: 2.7,
      petal_length: 4.0,
      petal_width: 1.2,
    },
    description: 'Dimensões intermediárias de pétala características de Versicolor.',
  },
  {
    title: 'Amostra Limite Virginica',
    speciesExpected: 'Virginica',
    features: {
      sepal_length: 7.2,
      sepal_width: 3.6,
      petal_length: 6.1,
      petal_width: 2.5,
    },
    description: 'Flor robusta de grandes dimensões em todos os quatro parâmetros.',
  },
];
