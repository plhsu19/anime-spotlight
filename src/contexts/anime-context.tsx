import { createContext, useReducer, useContext, useState } from 'react';
import { useRouter } from 'next/router';
import animeReducer from './anime-reducer';
import animeApiService from '@/services/anime-api-service';
import { AnimeFields } from '@/types/anime-types';
import {
  AnimeState,
  AnimeContextValueType,
  AnimeProviderProps
} from './anime-context-types';
import { animesPath } from '@/constants/paths';

const DELETE_ANIME_UNEXPECTED_ERROR_MESSAGE =
  'Unable to delete the anime %s due to an unexpected error. Please try again later or contact us.';
const DELETE_ANIME_NOT_FOUND_ERROR_MESSAGE =
  'Unable to delete the anime %s as it was not found. Please refresh the page and try again.';
const DELETE_ANIME_SUCCESSFUL_MESSAGE = 'Successfully deleted the anime %s.';
const ADD_ANIME_SUCCESSFUL_MESSAGE = 'Successfully added the anime %s.';
const ADD_ANIME_UNEXPECTED_ERROR_MESSAGE =
  'Unable to add the anime %s due to an unexpected error. Please try again later or contact us.';
const ADD_ANIME_BAD_REQUEST_MESSAGE =
  'Unable to add the anime due to invalid input: %s. Please check your input and try again.';

const AnimeContext = createContext<AnimeContextValueType | null>(null);

export const useGetAnimeContextValue = (): AnimeContextValueType => {
  const animeContextValue = useContext(AnimeContext);
  if (!animeContextValue) {
    throw new Error('useGetAnimeContextValue must be used within a Provider');
  }
  return animeContextValue;
};

export const AnimeProvider = ({
  children,
  fetchedAnimes
}: AnimeProviderProps) => {
  const initialState: AnimeState = {
    loading: false,
    error: null,
    message: null,
    animes: fetchedAnimes
  };

  const [state, dispatch] = useReducer(animeReducer, initialState);
  const [preFetchedAnimes, setPreFetchedAnimes] = useState(fetchedAnimes);
  const router = useRouter();

  if (preFetchedAnimes !== fetchedAnimes) {
    dispatch({ type: 'SET_ANIMES', payload: fetchedAnimes });
    setPreFetchedAnimes(fetchedAnimes);
  }

  const addAnime = async (animeFields: AnimeFields): Promise<void> => {
    dispatch({ type: 'START_LOADING' });
    let message = null;
    let error = null;

    try {
      const response = await animeApiService.createAnime(animeFields);
      message = ADD_ANIME_SUCCESSFUL_MESSAGE.replace(
        '%s',
        response.data.anime.title
      );
      dispatch({ type: 'END_LOADING', payload: { message, error } });
      router.push(`${animesPath}/${response.data.anime.id}`);
    } catch (e) {
      if (e.response?.status === 400) {
        error = ADD_ANIME_BAD_REQUEST_MESSAGE.replace(
          '%s',
          e.response?.data?.message ?? 'unknown'
        );
      } else {
        error = ADD_ANIME_UNEXPECTED_ERROR_MESSAGE.replace(
          '%s',
          animeFields.title
        );
      }
    }
    dispatch({ type: 'END_LOADING', payload: { message, error } });
  };

  const deleteAnime = async (id: number, title: string): Promise<void> => {
    dispatch({ type: 'START_LOADING' });
    let message = null;
    let error = null;

    // check if id is valid and within the range of the current animes
    if (id < 1 || id > state.animes[state.animes.length - 1].id) {
      error = DELETE_ANIME_NOT_FOUND_ERROR_MESSAGE.replace('%s', title);
      dispatch({ type: 'END_LOADING', payload: { message, error } });
      return;
    }

    try {
      await animeApiService.deleteAnimeById(id);

      const index = state.animes.findIndex((anime) => anime.id === id);
      // check if the deleted anime is in the current animes
      if (index === -1) {
        error = DELETE_ANIME_UNEXPECTED_ERROR_MESSAGE.replace('%s', title);
        dispatch({ type: 'END_LOADING', payload: { message, error } });
        return;
      }

      const updatedAnime = state.animes.toSpliced(index, 1);
      dispatch({ type: 'SET_ANIMES', payload: updatedAnime });
      message = DELETE_ANIME_SUCCESSFUL_MESSAGE.replace('%s', title);
    } catch (e) {
      if (e.response?.status === 404) {
        error = DELETE_ANIME_NOT_FOUND_ERROR_MESSAGE.replace('%s', title);
      } else {
        error = DELETE_ANIME_UNEXPECTED_ERROR_MESSAGE.replace('%s', title);
      }
    }
    dispatch({ type: 'END_LOADING', payload: { message, error } });
  };

  //TODO: reset message and error state when navigating to another page

  return (
    <AnimeContext.Provider value={{ state, dispatch, deleteAnime, addAnime }}>
      {children}
    </AnimeContext.Provider>
  );
};

export default AnimeContext;
