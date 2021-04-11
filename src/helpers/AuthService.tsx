import firebase from '../firebase';
import { INormalUser } from '../models/INormalUser';

const db = firebase.firestore();
const collectionReference = db.collection("users");
// const { serverTimestamp } = firebase.firestore.FieldValue;

export const AuthService = {
    addNormalUserToCollection(normalUser: INormalUser) {
        collectionReference.doc(normalUser.email).set(normalUser)
    },
    getNormalUserFromCollection(normalUserEmail: string) {
        return collectionReference.doc(normalUserEmail).get();
    }
}
