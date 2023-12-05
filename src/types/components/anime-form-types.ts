export interface ErrorsState {
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
