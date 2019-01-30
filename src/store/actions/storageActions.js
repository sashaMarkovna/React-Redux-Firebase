export const cleanUploadState = () => {
  return (dispatch) => {
    dispatch({ type: 'CLEAN_STATE_SUCCESS' });
  };
};

export const deleteUserAvatar = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const storage = firebase.storage();
    const profile = getState().firebase.profile;

    function checkUrl() {
      const userDefaultSettings = {
        femaleUserAvatar: 'https://firebasestorage.googleapis.com/v0/b/todo-app-post-f55e9.appspot.com/o/avatars%2Fdefault-female.jpg?alt=media&token=0d8be347-7b0d-469f-8e2c-3b37ab9a07e2',
        maleUserAvatar: 'https://firebasestorage.googleapis.com/v0/b/todo-app-post-f55e9.appspot.com/o/avatars%2Fdefault-male.jpg?alt=media&token=e7a72ca8-b8a3-413c-8bd3-5db88c249e74',
        unknownUserAvatar: 'https://firebasestorage.googleapis.com/v0/b/todo-app-post-f55e9.appspot.com/o/avatars%2Fdefault-unknown.png?alt=media&token=0263a863-c71c-4ef5-a5ef-d016bedbdbd3',
      };
      return profile.avatar !== userDefaultSettings.femaleUserAvatar &&
                   profile.avatar !== userDefaultSettings.maleUserAvatar &&
                   profile.avatar !== userDefaultSettings.unknownUserAvatar
                ? profile.avatar
                : null;
    }

    const url = checkUrl();

    if (url) {
      storage.refFromURL(url).delete()
                .then(() => dispatch({ type: 'DELETE_AVATAR_SUCCESS' }))
                .catch(error => dispatch({ type: 'DELETE_AVATAR_ERROR', error }));
    } else {
      dispatch({ type: 'DEFAULT_USER_AVATAR' });
    }
  };
};

export const uploadFileAndReturnUrl = (data) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const storage = firebase.storage();

    storage.ref().child(`${data.location}/${new Date().getTime()}`).put(data.file)
            .then(snapshot => snapshot.ref.getDownloadURL()
                .then((downloadUrl) => { dispatch({ type: 'FILE_UPLOAD_SUCCESS', downloadUrl }); }))
            .catch(error => dispatch({ type: 'FILE_UPLOAD_ERROR', error }));
  };
};

export const deleteFile = (fileUrl) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();
    const storage = firebase.storage();

    storage.refFromURL(fileUrl).delete()
            .then(() => dispatch({ type: 'DELETE_FILE_SUCCESS' }))
            .catch(error => dispatch({ type: 'DELETE_FILE_ERROR', error }));
  };
};
