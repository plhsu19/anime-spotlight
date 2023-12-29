import { ReactNode, Dispatch } from 'react';
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
    | { type: 'SET_ANIMES'; payload: Anime[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'RESET_NOTIFICATIONS' };

export interface AnimeContextValueType {
  state: AnimeState;
  dispatch: Dispatch<AnimeAction>;
  deleteAnime: (id: number, title: string) => Promise<void>;
  addAnime: (animeFields: AnimeFields) => Promise<void>;
  updateAnime: (id: number, animeFields: AnimeFields) => Promise<Anime>;
}

export interface AnimeProviderProps {
  children: ReactNode;
  fetchedAnimes: Anime[];
}
