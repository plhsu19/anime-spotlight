import { AnimeState, AnimeAction } from './anime-context-types';

const animeReducer = (state: AnimeState, action: AnimeAction) => {
  switch (action.type) {
    case 'START_LOADING':
      return {
        ...state,
        loading: true,
        message: null,
        error: null
      };
    case 'END_LOADING':
      return {
        ...state,
        loading: false,
        message: action.payload.message,
        error: action.payload.error
      };
    case 'SET_ANIMES':
      return {
        ...state,
        animes: action.payload
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'RESET_NOTIFICATIONS':
      return {
        ...state,
        error: null,
        message: null,
      };
  }
};

export default animeReducer;
