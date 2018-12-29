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

        default:
            return state;
    }
};

export default commentReducer;