import firebase from "firebase/app";
import "firebase/auth";

const app = firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  // databaseURL: process.env.REACT_APP_DATABASE_URL,
  // apiKey: "AIzaSyAGlvHuRDAaxvbI6pZwrXFSX_5JlhV61ZE",
  // authDomain: "animals-help.firebaseapp.com",
  // projectId: "animals-help",
  // storageBucket: "animals-help.appspot.com",
  // messagingSenderId: "1042671919014",
  // appId: "1:1042671919014:web:ce359ebe04a485a99a3967",
});

export const defaultAuth = firebase.auth;
export const auth = app.auth();
export const firebaseTimestamp = firebase.firestore.FieldValue.serverTimestamp();
export default app;

// class Firebase {
//   constructor() {
//     app.initializeApp(config);
//   }
// }

// export default Firebase
