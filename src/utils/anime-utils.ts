import { Subtype, Status } from '@/types/anime-types';

export const animeTypeFormatter = (type: Subtype): string => {
  if (type === Subtype.TV) {
    return 'TV Series';
  } else if (type === Subtype.MOVIE) {
    return 'Movie';
  }
  return type;
};

export const animeStatusFormatter = (status: Status): string => {
  if (status === Status.CURRENT) {
    return 'Currently Airing';
  } else {
    return status.charAt(0).toUpperCase() + status.slice(1);
  }
};

export const animeRatingFormatter = (rating: number | null): string => {
  if (rating == null) return '-';
  return rating % 1 !== 0 ? rating.toString() : rating + '.0';
};


