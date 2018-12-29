const initState = {
    commentError: null,
    comments: null
};

const commentReducer = (state = initState, action) => {
    switch(action.type) {
        case 'CLEAN_COMMENTS_SUCCESS':
            console.log(state.comments);
            return {
                ...state,
                // commentError: null,
                // comments: null
            };

        default:
            return state;
    }
};

export default commentReducer;