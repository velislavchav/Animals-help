import firebase from '../firebase'
import React, { useContext, useState, useEffect } from "react";
import { auth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    setCurrentUser(null);
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
  }

  function getUserAdditionalData(userEmail) {
    if (userEmail) {
      return firebase.firestore().collection("users").doc(userEmail).get();
    }
  }

  useEffect(() => {
    let userResult = {};
    let unsubscribe = null;
    async function fetchAllUserData() {
      unsubscribe = await auth.onAuthStateChanged(async user => {
        userResult = await { ...user };
        if (user?.email) {  //add user data from collection
          await getUserAdditionalData(user.email).then(async doc => {
            doc?.exists ? userResult = await { ...doc.data(), ...userResult } : userResult = await { ...user };
          }).catch((error) => {
            console.log("Error getting user additional data:", error);
          });
        }
        await setCurrentUser(userResult);
        await setLoading(false);
      })
    }
    
    fetchAllUserData();
    return unsubscribe;
  }, []);

  const value = { currentUser, signup, login, logout, resetPassword };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
