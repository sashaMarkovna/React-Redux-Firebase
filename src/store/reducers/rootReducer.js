import authReducer from './authReducer';
import projectReducer from './projectReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import commentsReducer from "./commentsReducer";
import storageReducer from "./storageReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
    storage: storageReducer,
    comments: commentsReducer,
    firestore: firestoreReducer,
    firebase: firebaseReducer
});

export default rootReducer;