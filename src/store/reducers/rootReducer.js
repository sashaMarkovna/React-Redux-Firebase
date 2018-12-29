import authReducer from './authReducer';
import projectReducer from './projectReducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';
import { firebaseReducer } from 'react-redux-firebase';
import uploadReducer from "./uploadReducer";
import commentsReducer from "./commentsReducer";

const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer,
    upload: uploadReducer,
    comments: commentsReducer,
    firestore: firestoreReducer,
    // firebase info including authentication
    firebase: firebaseReducer
});

export default rootReducer;