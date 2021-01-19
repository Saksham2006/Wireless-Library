import firebase from 'firebase'
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyDKwm_EAKqp-OeTgbNcGzhmUC3lTSwYM4E",
    authDomain: "wireless-library-ee1ef.firebaseapp.com",
    projectId: "wireless-library-ee1ef",
    storageBucket: "wireless-library-ee1ef.appspot.com",
    messagingSenderId: "383385996677",
    appId: "1:383385996677:web:538fae90c2af7baf9488ec"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export default firebase.firestore();