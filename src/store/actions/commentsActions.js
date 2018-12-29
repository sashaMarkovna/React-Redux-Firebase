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
