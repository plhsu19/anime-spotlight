import { ReactNode } from 'react';
import { Anime, AnimeFields } from '@/types/anime-types';

export interface AnimeState {
  loading: boolean;
  error: string | null;
  message: string | null;
  animes: Anime[];
}

export type AnimeAction =
  | { type: 'START_LOADING' }
  | {
      type: 'END_LOADING';
      payload: { error: string | null; message: string | null };
    }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_ANIMES'; payload: Anime[] };

export interface AnimeContextValueType {
  state: AnimeState;
  deleteAnime: (id: number, title: string) => Promise<void>;
  addAnime: (animeFields: AnimeFields) => Promise<void>;
}

export interface AnimeProviderProps {
  children: ReactNode;
  initialAnimes: Anime[];
}
