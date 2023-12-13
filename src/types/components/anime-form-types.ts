import { Subtype, Status, AnimeFields } from '@/types/anime-types';
export interface Errors {
  [key: string]: string | { [key: string]: string } | undefined;
  title?: string;
  enTitle?: string;
  description?: string;
  rating?: string;
  startDate?: string;
  endDate?: string;
  subtype?: string;
  status?: string;
  posterImage?: string;
  coverImage?: string;
  episodeCount?: string;
  categories?: { [key: string]: string };
}

export interface AnimeEditFields extends Omit<AnimeFields, 'startDate'> {
  [key: string]: string | number | null | string[] | Subtype | Status;
  startDate: string | null;
}
