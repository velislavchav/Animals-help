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
    },
    addApplicationForAdoption(user: INormalUser, animalId: string): Promise<any> {
        const updatedApplicationsArray: string[] = [...user?.applicationsForAdoption, animalId];
        return collectionReference.doc(user?.email).update({ applicationsForAdoption: updatedApplicationsArray })
    },
    removeApplicationForAdoption(user: INormalUser, animalId: string): Promise<any> {
        let updatedApplicationsArray = [...user.applicationsForAdoption];
        const applicationIndexForRemoving = updatedApplicationsArray.findIndex(el => el === animalId);
        if (applicationIndexForRemoving >= 0) updatedApplicationsArray.splice(applicationIndexForRemoving, 1)
        return collectionReference.doc(user?.email).update({ applicationsForAdoption: updatedApplicationsArray })
    },
    removeDeletedAnimalApplicationsFromAllUsers(deletedAnimalId: string): Promise<any> {
        let matchedUsers = collectionReference;
        return matchedUsers.where("applicationsForAdoption", "array-contains", deletedAnimalId).get().then(querySnapshot => {
            if (querySnapshot.size > 0) {        
                querySnapshot.forEach(user => {
                    this.removeApplicationForAdoption(user.data() as INormalUser, deletedAnimalId);
                });
            }
        })
    }
}
