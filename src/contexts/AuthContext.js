import React, { useContext, useState, useEffect } from "react";
import { Firebase } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  function signup(email, password) {
    return Firebase.auth.createUserWithEmailAndPassword(email, password);
  }

  useEffect(() => {
    const unsubscribe = Firebase.auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const value = { currentUser, signup };

  return <AuthContext.Provider value={value}> {children} </AuthContext.Provider>;
}
