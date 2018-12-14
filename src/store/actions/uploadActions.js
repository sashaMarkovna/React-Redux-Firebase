export const uploadFile = (data) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const userId = getState().firebase.auth.uid;
        const { location, file, collection, docField } = data;

        firebase.storage().ref().child(`${ location }/${ new Date().getTime()}` ).put(file)
            .then((snapshot) => {
                snapshot.ref.getDownloadURL()
                    .then((downloadUrl)=> {
                        firestore.collection(collection).doc(userId).update({[docField]: `${ downloadUrl }`})
                            .then(() => dispatch({ type: 'FILE_UPLOAD_SUCCESS' }))
                            .catch((error) => {
                                dispatch({type: 'FILE_UPLOAD_ERROR', error})
                            })
                    });
            })
    }
};