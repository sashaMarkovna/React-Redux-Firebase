import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from "./store/reducers/rootReducer";
// Helps to bind Redux with React app
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import firebaseApp from './config/fbConfig';
import { composeWithDevTools } from 'redux-devtools-extension';


const store = createStore(rootReducer,
    composeWithDevTools(
        applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
        reduxFirestore(firebaseApp),
        reactReduxFirebase(firebaseApp, { useFirestoreForProfile: true, userProfile: 'users', logErrors: false, attachAuthIsReady: true })       //to wait until the firebase auth check is ready
    )
);

//to wait until the firebase auth check is ready
store.firebaseAuthIsReady.then( () => {
    ReactDOM.render(<Provider store={ store }><App /></Provider>, document.getElementById('root'));
    // If you want your app to work offline and load faster, you can change
    // unregister() to register() below. Note this comes with some pitfalls.
    // Learn more about service workers: http://bit.ly/CRA-PWA
    serviceWorker.unregister();
});


