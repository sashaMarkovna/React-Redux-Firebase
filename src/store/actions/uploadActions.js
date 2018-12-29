export const cleanUploadState = () => {
    return (dispatch) => {
        dispatch({ type: 'CLEAN_STATE_SUCCESS' });
    }
};

export const fileUpdate = (data) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const storage = firebase.storage();
        const userId = getState().firebase.auth.uid;
        const { location, file, collection, docField } = data;
        const profile = getState().firebase.profile;
        function checkUrl(field) {
            const userDefaultSettings = {
                femaleUserAvatar: 'https://firebasestorage.googleapis.com/v0/b/todo-app-project-f55e9.appspot.com/o/avatars%2Fdefault-female.jpg?alt=media&token=0d8be347-7b0d-469f-8e2c-3b37ab9a07e2',
                maleUserAvatar: 'https://firebasestorage.googleapis.com/v0/b/todo-app-project-f55e9.appspot.com/o/avatars%2Fdefault-male.jpg?alt=media&token=e7a72ca8-b8a3-413c-8bd3-5db88c249e74',
                unknownUserAvatar: 'https://firebasestorage.googleapis.com/v0/b/todo-app-project-f55e9.appspot.com/o/avatars%2Fdefault-unknown.png?alt=media&token=0263a863-c71c-4ef5-a5ef-d016bedbdbd3',
                defaultBanner: 'https://firebasestorage.googleapis.com/v0/b/todo-app-project-f55e9.appspot.com/o/banners%2Fdefault-banner.jpg?alt=media&token=7800dafd-ccd2-4ed5-b341-08bb7270f8d0'
            };
            if(field === 'profileBanner') {
                return profile.profileBanner !== userDefaultSettings.defaultBanner ? profile.profileBanner : null;
            } else {
                return profile.userPhoto !== userDefaultSettings.femaleUserAvatar &&
                       profile.userPhoto !== userDefaultSettings.maleUserAvatar &&
                       profile.userPhoto !== userDefaultSettings.unknownUserAvatar ?
                       profile.userPhoto : null;
            }
        }
        const url = checkUrl(docField);

        storage.ref().child(`${ location }/${ new Date().getTime()}`).put(file)
            .then((snapshot) => snapshot.ref.getDownloadURL()
                .then((downloadUrl)=> firestore.collection(collection).doc(userId).update({[docField]: `${ downloadUrl }`})
                    .then(() => { if(url) storage.refFromURL(url).delete().catch((error) => dispatch({ type: 'FILE_UPDATE_ERROR', error }))})
                    .then(() => dispatch({ type: 'FILE_UPDATE_SUCCESS' }))
                ).catch((error) => { dispatch({type: 'FILE_UPDATE_ERROR', error}) })
            ).catch((error) => { dispatch({type: 'FILE_UPDATE_ERROR', error}) });
    }
};

export const uploadFileAndReturnUrl = (data) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const storage = firebase.storage();

        storage.ref().child(`${ data.location }/${ new Date().getTime()}`).put(data.file)
            .then((snapshot) => snapshot.ref.getDownloadURL()
                .then((downloadUrl)=> { dispatch({ type: 'FILE_UPLOAD_SUCCESS', downloadUrl })}))
            .catch((error) => dispatch({ type: 'FILE_UPLOAD_ERROR', error }));
    }
};

export const deleteFile = (fileUrl) => {
    return (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const storage = firebase.storage();

        storage.refFromURL(fileUrl).delete()
            .then(() => dispatch({ type: 'DELETE_FILE_SUCCESS' }))
            .catch((error) => dispatch({ type: 'DELETE_FILE_ERROR', error }));
    }
};
