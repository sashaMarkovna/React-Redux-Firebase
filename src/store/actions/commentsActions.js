export const createComment = (projectId, content) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const authorId = getState().firebase.auth.uid;

        firestore.collection('projectComments').doc(projectId).collection('comments')
            .add({
                content,
                authorId,
                time: new Date()
            }).then(() => { dispatch({ type: 'CREATE_COMMENT_SUCCESS' })})
            .catch((error) => { dispatch({ type: 'CREATE_COMMENT_ERROR', error })});
    }
};

export const deleteComment = (projectId, commentId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();

        firestore.collection('projectComments').doc(projectId).collection('comments').doc(commentId).delete()
            .then(() => { dispatch({ type: 'DELETE_COMMENT_SUCCESS', })})
            .catch((error) => { dispatch({ type: 'DELETE_COMMENT_ERROR', error })});
    }
};

export const deleteAllComments = (projectId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();

        firestore.collection('projectComments').doc(projectId).delete()
            .then(() => { dispatch({ type: 'DELETE_ALL_PROJECT_COMMENTS_SUCCESS', })})
            .catch((error) => { dispatch({ type: 'DELETE_ALL_PROJECT_COMMENTS_ERROR', error })});
    }
};

