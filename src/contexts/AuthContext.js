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

  function removeCurrentUserAdditionalDataLocally() {
    setCurrentUserAdditionalData(null);
    setCurrentUser(null)
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

  async function loginWithGoogle() {
    let error = "";
    const provider = new defaultAuth.GoogleAuthProvider();
    await auth.signInWithPopup(provider).then((result) => {
      /** @type {firebase.auth.OAuthCredential} */
      if(result.user) {
        UserService.addGoogleOrFBUserToCollection(result.user).then(() => {
          return result.user;
        })
      } else {
        error = "Something went wrong with google login";
      }
    }).catch((errorCatched) => {
      error = errorCatched.message;
    });
    return error;
  }

  async function loginWithFacebook() {
    let error = "";
    const provider = new defaultAuth.FacebookAuthProvider();
    await auth.signInWithPopup(provider).then((result) => {
        /** @type {firebase.auth.OAuthCredential} */
        if(result.user) {
          UserService.addGoogleOrFBUserToCollection(result.user).then(() => {
            return result.user;
          })
        } else {
          error = "Something went wrong with facebook login";
        }
      }).catch((errorCatched) => {
        // eslint-disable-next-line
        error = errorCatched?.message; 
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
    removeCurrentUserAdditionalDataLocally,
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
