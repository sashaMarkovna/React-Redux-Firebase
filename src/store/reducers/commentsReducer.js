const initState = {
    commentError: null,
};

const commentReducer = (state = initState, action) => {
    switch(action.type) {
        case 'CREATE_COMMENT_SUCCESS':
            console.log('New comment was created');
            return {
                ...state,
                commentError: null
            };

        case 'CREATE_COMMENT_ERROR':
            console.log('Create comment error', action.error.message);
            return {
                ...state,
                commentError: action.error.message
            };

        case 'DELETE_COMMENT_SUCCESS':
            console.log('Comment was deleted');
            return {
                ...state,
                commentError: null
            };

        case 'DELETE_COMMENT_ERROR':
            console.log('Delete comment error', action.error.message);
            return {
                ...state,
                commentError: action.error.message
            };

        case 'DELETE_ALL_PROJECT_COMMENTS_SUCCESS':
            console.log('All project comments were deleted');
            return {
                ...state,
                commentError: null
            };

        case 'DELETE_ALL_PROJECT_COMMENTS_ERROR':
            console.log('Delete all project comments error', action.error.message);
            return {
                ...state,
                commentError: action.error.message
            };

        default:
            return state;
    }
};

export default commentReducer;