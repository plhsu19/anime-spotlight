const animeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ANIMES':
      return {
        ...state,
        animes: action.payload
      };
  }
};

export default animeReducer;
