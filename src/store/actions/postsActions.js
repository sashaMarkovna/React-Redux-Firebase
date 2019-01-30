export const cleanPostState = () => {
  return (dispatch) => { dispatch({ type: 'CLEAN_STATE_SUCCESS' }); };
};

export const createPost = (post) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    firestore.collection('posts')
          .add({
            ...post,
            authorId,
            author: `${profile.firstName} ${profile.lastName}`,
            createdAt: new Date(),
            likes: 0,
          }).then(() => { dispatch({ type: 'CREATE_POST_SUCCESS', post }); })
          .catch((error) => { dispatch({ type: 'CREATE_POST_ERROR', error }); });
  };
};

export const deletePost = (postId) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    firestore.collection('posts').doc(postId).delete()
            .then(() => { dispatch({ type: 'DELETE_POST_SUCCESS' }); })
            .catch((error) => { dispatch({ type: 'DELETE_POST_ERROR', error }); });
  };
};

export const updatePost = (postId, postData) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();

    firestore.collection('posts').doc(postId).update(postData)
            .then(() => { dispatch({ type: 'POST_UPDATE_SUCCESS' }); })
            .catch((error) => { dispatch({ type: 'POST_UPDATE_ERROR', error }); });
  };
};

export const togglePostLike = (postId, postLikes) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const uid = getState().firebase.auth.uid;
    const postsLikes = firestore.collection('postsLikes').doc(uid);
    const posts = firestore.collection('posts').doc(postId);

    postsLikes.get()
            .then((snapshot) => {
              if (snapshot.data()[postId]) {
                postsLikes.update({ [postId]: firestore.FieldValue.delete() })
                        .then(() => posts.update({ likes: postLikes - 1 })
                            .then(() => dispatch({ type: 'LIKE_REMOVE_SUCCESS' })))
                        .catch(error => dispatch({ type: 'LIKE_REMOVE_ERROR', error }));
              } else {
                postsLikes.update({ [postId]: true })
                        .then(() => posts.update({ likes: postLikes + 1 })
                            .then(() => dispatch({ type: 'LIKE_ADD_SUCCESS' })))
                        .catch(error => dispatch({ type: 'LIKE_ADD_ERROR', error }));
              }
            })
            .catch(error => dispatch({ type: 'TOGGLE_LIKE_ERROR', error }));
  };
};
