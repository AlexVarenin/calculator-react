import firebase from 'firebase/app';
import 'firebase/database';

let config = {
    apiKey: "AIzaSyD6-Iz0Q8BLuq_QDGez9BVwBfAYPztKw6A",
    authDomain: "calculator-b29ce.firebaseapp.com",
    databaseURL: "https://calculator-b29ce-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "calculator-b29ce",
    storageBucket: "calculator-b29ce.appspot.com",
    messagingSenderId: "78574431583",
    appId: "1:78574431583:web:a8950ebd58b94561b49aea"
};

firebase.initializeApp(config);

export default firebase.database();
