const initState = {
  searchError: null,
  searchResult: null,
};

const commentReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CLEAN_SEARCH_STATE':
      console.log('Search state was cleaned');
      return {
        ...state,
        searchError: null,
        searchResult: null,
      };

    case 'SEARCH_RESULTS':
      console.log(`${action.searchResults.length} posts were found`);
      return {
        ...state,
        searchResults: action.searchResults,
        postError: null,
      };

    case 'SEARCH_ERROR':
      console.log('Search error', action.error.message);
      return {
        ...state,
        searchResults: null,
        postError: action.error.message,
      };

    default:
      return state;
  }
};

export default commentReducer;
