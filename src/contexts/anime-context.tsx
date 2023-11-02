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
  'Unable to delete the anime %s due to an unexpected error. Please try again later or contact us.';
const DELETE_ANIME_NOT_FOUND_ERROR_MESSAGE =
  'Unable to delete the anime %s as it was not found. Please refresh the page and try again.';
const DELETE_ANIME_SUCCESSFUL_MESSAGE = 'Successfully deleted the anime %s.';

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
    message: null,
    animes: initialAnimes
  };

  // TODO: setup reducer (state, dispatch) types
  const [state, dispatch] = useReducer(animeReducer, initialState);

  const deleteAnime = async (id: number, title: string): Promise<void> => {
    dispatch({ type: 'START_LOADING' });
    let message = null;
    let error = null;

    // check if id is valid and within the range of the current animes
    if (id < 1 || id > state.animes[state.animes.length - 1].id) {
      error = DELETE_ANIME_NOT_FOUND_ERROR_MESSAGE.replace('%s', title);
      dispatch({ type: 'END_LOADING', payload: { message, error } });
      // dispatch({
      //   type: 'SET_ERROR',
      //   payload: DELETE_ANIME_UNEXPECTED_ERROR_MESSAGE.replace('%s', title)
      // });
      // dispatch({ type: 'SET_LOADING', payload: false });
      return;
    }

    try {
      await animeApiService.deleteAnimeById(id);

      const index = state.animes.findIndex((anime) => anime.id === id);
      // check if the deleted anime is in the current animes
      if (index === -1) {
        error = DELETE_ANIME_UNEXPECTED_ERROR_MESSAGE.replace('%s', title);
        dispatch({ type: 'END_LOADING', payload: { message, error } });
        // dispatch({
        //   type: 'SET_ERROR',
        //   payload: DELETE_ANIME_UNEXPECTED_ERROR_MESSAGE.replace('%s', title)
        // });
        // dispatch({ type: 'SET_LOADING', payload: false });
        return;
      }
      
      const updatedAnime = state.animes.toSpliced(index, 1);
      dispatch({ type: 'SET_ANIMES', payload: updatedAnime });
      message = DELETE_ANIME_SUCCESSFUL_MESSAGE.replace('%s', title);
    } catch (e) {
      if (e.response.status === 404) {
        error = DELETE_ANIME_NOT_FOUND_ERROR_MESSAGE.replace('%s', title);
        // dispatch({
        //   type: 'SET_ERROR',
        //   payload: DELETE_ANIME_NOT_FOUND_ERROR_MESSAGE.replace('%s', title)
        // });
      } else {
        error = DELETE_ANIME_UNEXPECTED_ERROR_MESSAGE.replace('%s', title);
        // dispatch({
        //   type: 'SET_ERROR',
        //   payload: DELETE_ANIME_UNEXPECTED_ERROR_MESSAGE.replace('%s', title)
        // });
      }
    }
    dispatch({ type: 'END_LOADING', payload: { message, error } });
  };

  return (
    <AnimeContext.Provider value={{ state, deleteAnime }}>
      {children}
    </AnimeContext.Provider>
  );
};

export default AnimeContext;
