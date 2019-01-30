// In case we don't have data
const initState = {
  postError: null,
  postSuccess: null,
};

const postReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CLEAN_STATE_SUCCESS':
      return {
        ...state,
        postError: null,
        postSuccess: null,
      };

    case 'CREATE_POST_SUCCESS':
      console.log('Created post', action.post.id);
      return {
        ...state,
        postError: null,
      };

    case 'CREATE_POST_ERROR':
      console.log('Create post error ', action.error.message);
      return {
        ...state,
        postError: action.error.message,
      };

    case 'DELETE_POST_SUCCESS':
      console.log('Post deleted');
      return {
        ...state,
        postError: null,
        postSuccess: true,
      };

    case 'DELETE_POST_ERROR':
      console.log('Delete post error', action.error.message);
      return {
        ...state,
        postError: action.error.message,
      };

    case 'POST_UPDATE_SUCCESS':
      console.log('Post was successfully updated', action.post);
      return {
        ...state,
        postError: null,
      };

    case 'POST_UPDATE_ERROR':
      console.log('Post update error', action.error.message);
      return {
        ...state,
        postError: action.error.message,
      };

    case 'LIKE_REMOVE_SUCCESS':
      console.log('Like was successfully removed');
      return {
        ...state,
        postError: null,
      };

    case 'LIKE_REMOVE_ERROR':
      console.log('Like remove error', action.error.message);
      return {
        ...state,
        postError: action.error.message,
      };

    case 'LIKE_ADD_SUCCESS':
      console.log('Like was successfully added');
      return {
        ...state,
        postError: null,
      };

    case 'LIKE_ADD_ERROR':
      console.log('Like add error', action.error.message);
      return {
        ...state,
        postError: action.error.message,
      };

    case 'TOGGLE_LIKE_ERROR':
      console.log('Toggle like error', action.error.message);
      return {
        ...state,
        postError: action.error.message,
      };

    default:
      return state;
  }
};

export default postReducer;
