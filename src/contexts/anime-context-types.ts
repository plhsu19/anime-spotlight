import { ReactNode } from 'react';
import { Anime } from '@/types/anime-types';

export interface AnimeState {
  loading: boolean;
  error: string | null;
  animes: Anime[];
}

export type AnimeAction =
  | { type: 'START_LOADING'; }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_ANIMES'; payload: Anime[] };

export interface AnimeContextType {
  state: AnimeState;
  deleteAnime: (id: number) => Promise<void>;
}

export interface AnimeProviderProps {
  children: ReactNode;
  initialAnimes: Anime[];
}
