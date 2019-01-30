export const createComment = (postId, content) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();
    const authorId = getState().firebase.auth.uid;

    firestore.collection('projectComments').doc(postId).collection('comments')
            .add({
              content,
              authorId,
              time: new Date(),
            })
            .then(() => { dispatch({ type: 'CREATE_COMMENT_SUCCESS' }); })
            .catch((error) => { dispatch({ type: 'CREATE_COMMENT_ERROR', error }); });
  };
};

export const deleteComment = (postId, commentId) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore.collection('projectComments').doc(postId).collection('comments').doc(commentId)
            .delete()
            .then(() => { dispatch({ type: 'DELETE_COMMENT_SUCCESS' }); })
            .catch((error) => { dispatch({ type: 'DELETE_COMMENT_ERROR', error }); });
  };
};

export const deleteAllComments = (postId) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore.collection('projectComments').doc(postId).delete()
            .then(() => { dispatch({ type: 'DELETE_ALL_POST_COMMENTS_SUCCESS' }); })
            .catch((error) => { dispatch({ type: 'DELETE_ALL_POST_COMMENTS_ERROR', error }); });
  };
};

