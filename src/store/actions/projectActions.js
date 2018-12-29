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
              createdAt: new Date()
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