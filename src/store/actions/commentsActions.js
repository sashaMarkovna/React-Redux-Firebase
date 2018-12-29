export const cleanCommentsState = () => {
    return(dispatch) => {
        dispatch({ type: 'CLEAN_COMMENTS_SUCCESS' });
    }
};