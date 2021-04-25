import firebase, { firebaseTimestamp } from '../firebase';
import { INormalUser } from '../models/INormalUser';

const db = firebase.firestore();
const collectionReference = db.collection("users");

export const AuthService = {
    addNormalUserToCollection(normalUser: INormalUser) {
        return collectionReference.doc(normalUser.email).set({ ...normalUser, createdAt: firebaseTimestamp} )
    },
    getNormalUserFromCollection(normalUserEmail: string) {
        return collectionReference.doc(normalUserEmail).get();
    }
}
