import * as firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

// Initialize Firebase
let config = {
    apiKey: "AIzaSyBZcdrQg_vJvpYuEdqF2Ihjm-TrwqieQjA",
    authDomain: "todo-app-project-f55e9.firebaseapp.com",
    databaseURL: "https://todo-app-project-f55e9.firebaseio.com",
    projectId: "todo-app-project-f55e9",
    storageBucket: "todo-app-project-f55e9.appspot.com",
    messagingSenderId: "1018473527951"
};

const firebaseApp = firebase.initializeApp(config);
firebase.firestore().settings({ timestampsInSnapshots: true });
export const storage = firebase.storage();

export default firebaseApp;