// import { Subtype, Status } from "@/types/anime-types";
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

// export interface FieldsState {
//   [key: string]: string | number | null | string[] | Subtype | Status;
//   title: string | null;
//   enTitle: string | null;
//   description: string | null;
//   rating: number;
//   startDate: string;
//   endDate: string | null;
//   subtype: Subtype;
//   status: Status;
//   posterImage: string | null;
//   coverImage: string | null;
//   episodeCount: number | null;
//   categories: string[];
// }
