export const cleanProjectState = () => {
    return(dispatch) => {
        dispatch({ type: 'CLEAN_STATE_SUCCESS' });
    }
};

export const createProject = (project) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
      const firestore = getFirestore();
      const profile = getState().firebase.profile;
      const authorId = getState().firebase.auth.uid;

      firestore.collection('projects')
          .add({
              ...project,
              author: `${ profile.firstName } ${ profile.lastName }`,
              authorId: authorId,
              createdAt: new Date(),
              likes: 0
          }).then(() => { dispatch({ type: 'CREATE_PROJECT_SUCCESS', project })})
          .catch((error) => { dispatch({ type: 'CREATE_PROJECT_ERROR', error })});
  }
};

export const deleteProject = (projectId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();

        firestore.collection('projects').doc(projectId).delete()
            .then(() => { dispatch({ type: 'DELETE_PROJECT_SUCCESS', })})
            .catch((error) => { dispatch({ type: 'DELETE_PROJECT_ERROR', error })});
    }
};

export const updateProject = (projectId, projectData) => {
    return (dispatch, getState, { getFirebase, getFirestore } ) => {
        const firestore = getFirestore();

        firestore.collection('projects').doc(projectId).update(projectData)
            .then(() => { dispatch({ type: 'PROJECT_UPDATE_SUCCESS' })})
            .catch((error) => { dispatch({ type: 'PROJECT_UPDATE_ERROR', error })});
    }
};

export const searchProject = (searchField, searchText) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const regexp = new RegExp(`${searchText}`, 'ig');

        firestore.collection('projects').get()
            .then((snapshot) => {
                const searchResults = snapshot.docs.map( doc => regexp.test(doc.data()[searchField]) ? doc.data() : null ).filter(doc => doc);
                console.log(searchResults);
                dispatch({ type: 'SEARCH_RESULTS', searchResults })
            }).catch(error => dispatch({ type: 'SEARCH_ERROR', error }));
    }
};

export const searchUserPersonalProject = (userId, searchText) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const regexp = new RegExp(`${searchText}`, 'ig');

        firestore.collection('projects').where('authorId', '==', `${userId}`).orderBy('createdAt', 'desc').get()
            .then((snapshot) => {
                const searchResults = snapshot.docs.map( doc => regexp.test(doc.data().title) ? { ...doc.data(), id: doc.id } : null ).filter(doc => doc);
                console.log(searchResults);
                dispatch({ type: 'SEARCH_RESULTS', searchResults })
            }).catch(error => dispatch({ type: 'SEARCH_ERROR', error }));
    }
};

export const togglePostLike = (postId, postLikes) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const uid = getState().firebase.auth.uid;
        const postsLikes = firestore.collection('postsLikes').doc(uid);
        const posts = firestore.collection('projects').doc(postId);

        postsLikes.get()
            .then((snapshot) => {
                if(snapshot.data()[postId]) {
                    postsLikes.update({ [postId]: firestore.FieldValue.delete() })
                        .then(() => posts.update({ likes: postLikes - 1 })
                            .then(() => dispatch({ type: 'LIKE_REMOVE_SUCCESS' })))
                        .catch((error) => dispatch({ type: 'LIKE_REMOVE_ERROR', error }))
                } else {
                    postsLikes.update({ [postId]: true })
                        .then(() => posts.update({ likes: postLikes + 1 })
                            .then(() => dispatch({ type: 'LIKE_ADD_SUCCESS' })))
                        .catch((error) => dispatch({ type: 'LIKE_ADD_ERROR', error }))
                }
            })
            .catch((error) => dispatch({ type: 'TOGGLE_LIKE_ERROR', error }));
    }
};