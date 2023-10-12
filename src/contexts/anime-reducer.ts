import { AnimeState, AnimeAction } from './anime-context-types';

// TODO: setup reducer prop types
const animeReducer = (state: AnimeState, action: AnimeAction) => {
  switch (action.type) {
    case 'START_LOADING':
      return {
        ...state,
        loading: true,
        error: null,
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
  }
  switch (action.type) {
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload
      };
  }
  switch (action.type) {
    case 'SET_ANIMES':
      return {
        ...state,
        animes: action.payload
      };
  }
};

export default animeReducer;
