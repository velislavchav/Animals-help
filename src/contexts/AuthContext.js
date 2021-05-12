
import firebase, { auth, defaultAuth } from "../firebase";
import React, { useContext, useState, useEffect } from "react";
import { UserService } from "../helpers/services/UserService";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [currentUserAdditionalData, setCurrentUserAdditionalData] = useState();
  const [loading, setLoading] = useState(true);

  function updateCurrentUserAdditionalDataLocally(newData) {
    setCurrentUserAdditionalData({ ...currentUserAdditionalData, ...newData });
  }

  function addUserApplicationsLocally(newApplications = []) {
    if (newApplications && newApplications.length > 0) {
      const updatedApllications = [...currentUserAdditionalData.applicationsForAdoption, ...newApplications]
      setCurrentUserAdditionalData({ ...currentUser, applicationsForAdoption: updatedApllications })
      return updatedApllications;
    }
    return currentUserAdditionalData.applicationsForAdoption;
  }

  function removeUserApplicationsLocally(removedApplications = []) {
    if (removedApplications && removedApplications.length > 0) {
      let updatedApllications = [];
      currentUserAdditionalData.applicationsForAdoption.forEach(animalId => {
        if (!removedApplications.includes(animalId)) {
          updatedApllications.push(animalId)
        }
      });
      setCurrentUserAdditionalData({ ...currentUser, applicationsForAdoption: updatedApllications })
      return updatedApllications;
    }
    return currentUserAdditionalData.applicationsForAdoption;
  }

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function loginWithGoogle() {
    const provider = new defaultAuth.GoogleAuthProvider();
    return auth.signInWithPopup(provider).then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      // The signed-in user info.
      UserService.addGoogleOrFBUserToCollection(result.user).then(() => {
        return result.user;
      })
    }).catch(() => {
      console.log("something went wrong with google login")
    });
  }

  function loginWithFacebook() {
    const provider = new defaultAuth.FacebookAuthProvider();
    auth.signInWithPopup(provider).then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        UserService.addGoogleOrFBUserToCollection(result.user).then(() => {
          return result.user;
        })
      })
      .catch((error) => {
        console.log("something went wrong with facebook login", error)
      });
  }

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    setCurrentUser(null);
    setCurrentUserAdditionalData(null);
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
    let userAdditionalDataResult = {};
    let unsubscribe = null;
    async function fetchAllUserData() {
      unsubscribe = await auth.onAuthStateChanged(async user => {
        userResult = await { ...user };
        if (user?.email) {  //add user data from collection
          await getUserAdditionalData(user.email).then(async doc => {
            if (doc?.exists) {
              userAdditionalDataResult = await { ...doc.data() }
            }
          }).catch((error) => {
            console.log("Error getting user additional data:", error);
          });
        }
        await setCurrentUser(userResult);
        await setCurrentUserAdditionalData(userAdditionalDataResult);
        await setLoading(false);
      })
    }

    fetchAllUserData();
    return unsubscribe;
  }, [loading]);

  const value = {
    currentUser,
    currentUserAdditionalData,
    signup,
    login,
    loginWithGoogle,
    loginWithFacebook,
    logout,
    resetPassword,
    updateCurrentUserAdditionalDataLocally,
    addUserApplicationsLocally,
    removeUserApplicationsLocally,
    setLoading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
