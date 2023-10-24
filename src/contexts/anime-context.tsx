import { createContext, useReducer, useContext } from 'react';
import animeReducer from './anime-reducer';
import animeApiService from '@/services/anime-api-service';
import { Anime } from '@/types/anime-types';
import {
  AnimeState,
  AnimeContextValueType,
  AnimeProviderProps
} from './anime-context-types';

const DELETE_ANIME_UNEXPECTED_ERROR_MESSAGE =
  'Unable to delete the anime due to an unexpected error. Please try again later or contact us.';
const DELETE_ANIME_NOT_FOUND_ERROR_MESSAGE =
  'Unable to delete the anime as it was not found. Please refresh the page and try again.';

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
  initialAnimes
}: AnimeProviderProps) => {
  const initialState: AnimeState = {
    loading: false,
    error: null,
    animes: initialAnimes
  };

  // TODO: setup reducer (state, dispatch) types
  const [state, dispatch] = useReducer(animeReducer, initialState);

  const deleteAnime = async (id: number): Promise<void> => {
    dispatch({ type: 'START_LOADING' });

    if (id < 1 || id > state.animes[state.animes.length - 1].id) {
      dispatch({
        type: 'SET_ERROR',
        payload: DELETE_ANIME_UNEXPECTED_ERROR_MESSAGE
      });
      dispatch({ type: 'SET_LOADING', payload: false });
      return;
    }

    try {
      await animeApiService.deleteAnimeById(id);

      const index = state.animes.findIndex((anime) => anime.id === id);
      if (index === -1) {
        dispatch({
          type: 'SET_ERROR',
          payload: DELETE_ANIME_UNEXPECTED_ERROR_MESSAGE
        });
        dispatch({ type: 'SET_LOADING', payload: false });
      }
      const updatedAnime = state.animes.toSpliced(index, 1);
      dispatch({ type: 'SET_ANIMES', payload: updatedAnime });
    } catch (e) {
      if (e.response.status === 404) {
        dispatch({
          type: 'SET_ERROR',
          payload: DELETE_ANIME_NOT_FOUND_ERROR_MESSAGE
        });
      } else {
        dispatch({
          type: 'SET_ERROR',
          payload: DELETE_ANIME_UNEXPECTED_ERROR_MESSAGE
        });
      }
    }
    dispatch({ type: 'SET_LOADING', payload: false });
  };

  return (
    <AnimeContext.Provider value={{ state, deleteAnime }}>
      {children}
    </AnimeContext.Provider>
  );
};

export default AnimeContext;
