import { createContext, useReducer } from 'react';
import animeReducer from './anime-reducer';
import animeApiService from '@/services/anime-api-service';

const AnimeContext = createContext(null);

export const AnimeProvider = ({ children, initialAnimes }) => {
  const initialState = {
    loading: false,
    error: null,
    animes: initialAnimes, 
  };

  const [state, dispatch] = useReducer(animeReducer, initialState);

  const setAnimes = (animes) => {
    dispatch({ type: 'SET_ANIMES', payload: animes });
  };

  return (
    <AnimeContext.Provider value={{ state, setAnimes }}>
      {children}
    </AnimeContext.Provider>
  );
};

export default AnimeContext;

