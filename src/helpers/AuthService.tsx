import firebase, { firebaseTimestamp } from '../firebase';
import { INormalUser } from '../models/INormalUser';
import { IShelter } from '../models/IShelter';

const db = firebase.firestore();
const collectionReference = db.collection("users");

export const AuthService = {
    addNormalUserToCollection(normalUser: INormalUser) {
        delete normalUser.password
        return collectionReference.doc(normalUser.email).set({ ...normalUser, createdAt: firebaseTimestamp} )
    },
    addShelterToCollection(shelter: IShelter) {
        delete shelter.password
        return collectionReference.doc(shelter.email).set({ ...shelter, createdAt: firebaseTimestamp} )
    },
    getNormalUserFromCollection(normalUserEmail: string) {
        return collectionReference.doc(normalUserEmail).get();
    }
}
