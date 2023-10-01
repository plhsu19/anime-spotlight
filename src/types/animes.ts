export interface AnimeFields {
  id?: number;
  title: string;
  enTitle: string | null;
  description: string;
  rating: number;
  startDate: string;
  endDate: string | null;
  subtype: Subtype;
  status: Status;
  posterImage: string;
  coverImage: string | null;
  episodeCount: number | null;
  categories: string[];
}

export interface Anime extends AnimeFields {
  id: number;
}

enum Subtype {
  ONA = 'ONA',
  OVA = 'OVA',
  TV = 'TV',
  MOVIE = 'movie',
}

enum Status {
  current = 'current',
  finished = 'finished',
}
