export const clearProp = () => {
    return(dispatch) => {
        dispatch({ type: 'CLEAR' });
    }
};

export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
      const firebase = getFirebase();

      firebase.auth().signInWithEmailAndPassword(credentials.email, credentials.password)
          .then( () => { dispatch({ type: 'LOGIN_SUCCESS' })})
          .catch((error) => { dispatch({ type: 'LOGIN_ERROR', error})});
  }
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
      const firebase = getFirebase();

      firebase.auth().signOut()
        .then( () => { dispatch({ type: 'SIGNOUT_SUCCESS'})})
        .catch( (error) => { dispatch({ type: 'SIGNOUT_ERROR', error })});
  }
};

export const updateUserName = (newName) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        const uid = getState().firebase.auth.uid;
        const currentUser = getState().firebase.profile;
        const firstName = newName.firstName ? newName.firstName : currentUser['firstName'];
        const lastName = newName.lastName ? newName.lastName : currentUser['lastName'];
        const initials = firstName[0] + lastName[0];

        firestore.collection('users').doc(uid).update({ firstName, lastName, initials})
            .then(() => { dispatch({ type: 'USER_NAME_UPDATE_SUCCESS' })})
            .catch((error) => { dispatch({ type: 'USER_NAME_UPDATE_ERROR', error })
        });
    }
};

export const updateUserData = (newData) => {
    return (dispatch, getState, { getFirestore }) => {
        const firestore = getFirestore();
        const uid = getState().firebase.auth.uid;

        firestore.collection('users').doc(uid).update({ ...newData })
            .then(() => { dispatch({ type: 'USER_DATA_UPDATE_SUCCESS', newData })})
            .catch((error) => { dispatch({ type: 'USER_DATA_UPDATE_ERROR', error })
            });
    }
};

export const signUp = (newUser) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const userDefaultSettings = {
          femaleUserAvatar: 'https://firebasestorage.googleapis.com/v0/b/todo-app-project-f55e9.appspot.com/o/avatars%2Fdefault-female.jpg?alt=media&token=0d8be347-7b0d-469f-8e2c-3b37ab9a07e2',
          maleUserAvatar: 'https://firebasestorage.googleapis.com/v0/b/todo-app-project-f55e9.appspot.com/o/avatars%2Fdefault-male.jpg?alt=media&token=e7a72ca8-b8a3-413c-8bd3-5db88c249e74',
          unknownUserAvatar: 'https://firebasestorage.googleapis.com/v0/b/todo-app-project-f55e9.appspot.com/o/avatars%2Fdefault-unknown.png?alt=media&token=0263a863-c71c-4ef5-a5ef-d016bedbdbd3',
        };
        let avatar = '';

        if(newUser.gender === 'male') { avatar = userDefaultSettings.maleUserAvatar; }
        else if(newUser.gender === 'female') { avatar = userDefaultSettings.femaleUserAvatar; }
        else { avatar = userDefaultSettings.unknownUserAvatar; }

        firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
            .then((response) => {
                // use .doc() to avoid second generated ID - will use the Id that firebase automatically assigned to a new user through authentication
                return firestore.collection('users').doc(response.user.uid).set({
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    initials: newUser.firstName[0] + newUser.lastName[0],
                    avatar
                });
            }).then(() => { dispatch({ type: 'SIGNUP_SUCCESS' })})
              .catch((error) => { dispatch({ type: 'SIGNUP_ERROR', error })});
    }
};



export const changeUserEmailOrPassword = (newCredentials) => {
  return (dispatch, getState, { getFirebase }) => {
      const firebase = getFirebase();
      const currentUser = firebase.auth().currentUser;
      const cred = firebase.auth.EmailAuthProvider.credential(currentUser.email, newCredentials.password);

      if(newCredentials.update === 'email') {
          currentUser.reauthenticateAndRetrieveDataWithCredential(cred)
              .then(() => { currentUser.updateEmail(newCredentials.newEmail)
                  .then(() => { dispatch({type: 'EMAIL_UPDATE_SUCCESS'})
                  }).catch((error) => { dispatch({ type: 'EMAIL_UPDATE_EMAIL_ERROR', error })})
              }).catch((error) => { dispatch({ type: 'EMAIL_UPDATE_PASSWORD_ERROR', error })});
      } else {
          currentUser.reauthenticateAndRetrieveDataWithCredential(cred)
              .then(() => { currentUser.updatePassword(newCredentials.newPassword)
                  .then(() => { dispatch({ type: 'PASSWORD_UPDATE_SUCCESS' })
                  }).catch((error) => { dispatch({ type: 'PASSWORD_UPDATE_ERROR', error })})
              }).catch((error) => { dispatch({ type: 'PASSWORD_UPDATE_ERROR', error })});
      }
  }
};

export const deleteUserAccount = (password) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firebase = getFirebase();
        const firestore = getFirestore();
        const storage = firebase.storage();
        const currentUser = firebase.auth().currentUser;
        const uid = currentUser.uid;
        const profile = getState().firebase.profile;
        const cred = firebase.auth.EmailAuthProvider.credential(currentUser.email, password);
        const userDefaultSettings = {
            femaleUserAvatar: 'https://firebasestorage.googleapis.com/v0/b/todo-app-project-f55e9.appspot.com/o/avatars%2Fdefault-female.jpg?alt=media&token=0d8be347-7b0d-469f-8e2c-3b37ab9a07e2',
            maleUserAvatar: 'https://firebasestorage.googleapis.com/v0/b/todo-app-project-f55e9.appspot.com/o/avatars%2Fdefault-male.jpg?alt=media&token=e7a72ca8-b8a3-413c-8bd3-5db88c249e74',
            unknownUserAvatar: 'https://firebasestorage.googleapis.com/v0/b/todo-app-project-f55e9.appspot.com/o/avatars%2Fdefault-unknown.png?alt=media&token=0263a863-c71c-4ef5-a5ef-d016bedbdbd3',
        };
        const userAvatar = profile.avatar !== userDefaultSettings.femaleUserAvatar &&
                           profile.avatar !== userDefaultSettings.maleUserAvatar &&
                           profile.avatar !== userDefaultSettings.unknownUserAvatar ?
                           profile.avatar : null;

        currentUser.reauthenticateAndRetrieveDataWithCredential(cred)
            .then(() => firestore.collection('users').doc(uid).delete()
                .then(() => { if(userAvatar) storage.refFromURL(userAvatar).delete().catch((error) => dispatch({ type: 'DELETE_USER_AVATAR_ERROR', error })) })
                .then(() => currentUser.delete()
                    .then(() => dispatch({ type: 'DELETE_ACCOUNT_SUCCESS' })))
                .catch((error) => dispatch({ type: 'DELETE_ACCOUNT_ERROR', error })))
            .catch((error) => dispatch({ type: 'DELETE_ACCOUNT_ERROR', error }));
    }
};

export const toggleFollow = (userId) => {
    return (dispatch, getState, { getFirebase, getFirestore }) => {
        const firestore = getFirestore();
        const uid = getState().firebase.auth.uid;
        const follower = firestore.collection('users').doc(uid);
        const followed = firestore.collection('users').doc(userId);

        follower.get()
            .then((snapshot) => {
                if(snapshot.data().following[userId]) {
                    follower.update({ [`following.${userId}`]: firestore.FieldValue.delete() })
                        .then(() => followed.update({ [`followers.${uid}`]: firestore.FieldValue.delete()})
                            .then(() => dispatch({ type: 'UNFOLLOW_SUCCESS' })))
                        .catch((error) => dispatch({ type: 'UNFOLLOW_ERROR', error }))
                } else {
                    follower.update({ [`following.${userId}`]: true })
                        .then(() => followed.update({ [`followers.${uid}`]: true })
                            .then(() => dispatch({ type: 'FOLLOW_SUCCESS' })))
                        .catch((error) => dispatch({ type: 'FOLLOW_ERROR', error }))
                }
            }).catch((error) => dispatch({ type: 'TOGGLE_FOLLOW_ERROR', error }))
    }
};