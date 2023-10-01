import { Anime } from '@/types/animes';

export interface AnimesResponse {
  success: boolean;
  results: number;
  data: {
    animes: Anime[];
  };
}
export interface AnimeResponse {
  success: boolean;
  data: {
    anime: Anime;
  };
}

export interface DeleteAnimeRespone {
  success: boolean;
}
