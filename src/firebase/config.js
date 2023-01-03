import firebase from "firebase/compat/app";
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBLxWYmytp-hgm3Ug0cUbBk9eJ-5hbVBj8",
    authDomain: "mini-games-d0cd0.firebaseapp.com",
    projectId: "mini-games-d0cd0",
    storageBucket: "mini-games-d0cd0.appspot.com",
    messagingSenderId: "86447065579",
    appId: "1:86447065579:web:91a7d50d4b694daf0531ae",
    measurementId: "G-NGC65S0GC5"
};
firebase.initializeApp(firebaseConfig)
export default firebase