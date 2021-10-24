import firebase from 'firebase/app';
import 'firebase/database';

let config = {
    apiKey: "xxxxxxxxxxxxxx",
    authDomain: "xxxxxxxxxxxxxx",
    databaseURL: "xxxxxxxxxxxxxx",
    projectId: "xxxxxxxxxxxxxx",
    storageBucket: "xxxxxxxxxxxxxx",
    messagingSenderId: "xxxxxxxxxxxxxx",
    appId: "xxxxxxxxxxxxxx"
};

firebase.initializeApp(config);

export default firebase.database();
