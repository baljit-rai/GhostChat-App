import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import * as firebase from 'firebase';

  // Initialize Firebase
var config = {
    apiKey: "AIzaSyA1LeSMzIAdNE3WHeLi73zX4BEf1yp8PkU",
    authDomain: "ghost-84d4d.firebaseapp.com",
    databaseURL: "https://ghost-84d4d.firebaseio.com",
    projectId: "ghost-84d4d",
    storageBucket: "ghost-84d4d.appspot.com",
    messagingSenderId: "473083667760"
};
firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
