export const cleanSearchState = () => {
  return (dispatch) => { dispatch({ type: 'CLEAN_STATE_SUCCESS' }); };
};

export const generalSearch = (collection, field, searchText) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firestore = getFirestore();
    const regexp = new RegExp(`${searchText}`, 'ig');

    firestore.collection(collection).get()
            .then((snapshot) => {
              const searchResults = snapshot.docs
                    .map(doc => regexp.test(doc.data()[field]) ? doc.data() : null)
                    .filter(doc => doc);
              dispatch({ type: 'SEARCH_RESULTS', searchResults });
            })
            .catch(error => dispatch({ type: 'SEARCH_ERROR', error }));
  };
};

export const selectedSearch = (collection, field, searchText) => {
  return (dispatch, getState) => {
    const regexp = new RegExp(`${searchText}`, 'ig');
    const searchCollection = getState().firestore.ordered[collection];
    const searchResults = searchCollection.filter(elem => regexp.test(elem[field]));
    console.log(searchResults);
        // searchResults.length ? dispatch({ type:  })
        // dispatch({  })
  };
};

// export const searchUserPersonalPost = (userId, searchText) => {
//     return (dispatch, getState, { getFirebase, getFirestore }) => {
//         const firestore = getFirestore();
//         const regexp = new RegExp(`${searchText}`, 'ig');
//
//         firestore.collection('posts').where('authorId', '==', `${userId}`).orderBy('createdAt', 'desc').get()
//             .then((snapshot) => {
//                 const searchResults = snapshot.docs.map( doc => regexp.test(doc.data().title) ? { ...doc.data(), id: doc.id } : null ).filter(doc => doc);
//
//                 console.log('results',searchResults);
//
//                 dispatch({ type: 'SEARCH_RESULTS', searchResults })
//             }).catch(error => dispatch({ type: 'SEARCH_ERROR', error }));
//     }
// };
