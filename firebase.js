import firebase from 'firebase/app'
import "firebase/auth";
import "firebase/database";
import "firebase/firestore";
import "firebase/functions";
import "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDe8ZDTFrjfKIiyR_XTtlmOP_-7ZRX1TD8",
    authDomain: "chat-app-f044d.firebaseapp.com",
    projectId: "chat-app-f044d",
    storageBucket: "chat-app-f044d.appspot.com",
    messagingSenderId: "598142011209",
    appId: "1:598142011209:web:88a94232779817ad02fc98",
    measurementId: "G-4B9JWCQB3E"
  }; 

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = app.firestore();
const auth = firebase.auth();

export { db, auth };
