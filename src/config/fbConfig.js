import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

// Initialize Firebase
let config = {

};

const firebaseApp = firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });
export const storage = firebase.storage();

export default firebaseApp;