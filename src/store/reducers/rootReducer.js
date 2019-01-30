import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import authReducer from './authReducer';
import postReducer from './postReducer';
import commentsReducer from './commentsReducer';
import storageReducer from './storageReducer';
import searchReducer from './searchReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  post: postReducer,
  storage: storageReducer,
  comments: commentsReducer,
  search: searchReducer,
  firestore: firestoreReducer,
  firebase: firebaseReducer,
});

export default rootReducer;
