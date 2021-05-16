import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/storage'; 

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
});

export const defaultAuth = firebase.auth;
export const auth = app.auth();
export const storageRef = firebase.storage().ref();
export const firebaseTimestamp = firebase.firestore.FieldValue.serverTimestamp();
export default app;

