export interface WordCloudProps {
  width: number;
  height: number;
  words: string;
}

export interface WordData {
  text: string;
  value: number;
}

export type SpiralType = 'archimedean' | 'rectangular';