import firebase, { firebaseTimestamp } from '../../firebase';
import { IInstitute } from '../../models/IInstitute';
import { INormalUser } from '../../models/INormalUser';
import { IShelter } from '../../models/IShelter';

const db = firebase.firestore();
const collectionReference = db.collection("users");

export const UserService = {
    addNormalUserToCollection(normalUser: INormalUser) {
        delete normalUser.password
        return collectionReference.doc(normalUser.email).set({ ...normalUser, createdAt: firebaseTimestamp })
    },
    async addGoogleOrFBUserToCollection(user: any) {
        const userRef = await collectionReference.doc(user?.email);
        await userRef.get().then(async (doc) => {
            if (!doc.exists) {
                const userData: INormalUser = await {
                    email: user.email,
                    role: "normal",
                    firstName: user.displayName.split(" ")[0],
                    lastName: user.displayName.split(" ")[1],
                    createdAt: new Date(),
                    phone: user?.phoneNumber,
                    applicationsForAdoption: []
                }
                await userRef.set(userData)
            }
        }).catch((error) => {
            console.log("Error getting document:", error);
        });
    },
    addShelterToCollection(shelter: IShelter) {
        delete shelter.password
        if (shelter.imageUrl) {
            return collectionReference.doc(shelter.email).set({ ...shelter, createdAt: firebaseTimestamp })
        }
        return collectionReference.doc(shelter.email).set({ ...shelter, createdAt: firebaseTimestamp, imageUrl: "/image-not-found.jpg" })
    },
    addInstitutionToCollection(institution: IInstitute) {
        delete institution.password
        if (institution.imageUrl) {
            return collectionReference.doc(institution.email).set({ ...institution, createdAt: firebaseTimestamp })
        }
        return collectionReference.doc(institution.email).set({ ...institution, createdAt: firebaseTimestamp, imageUrl: "/image-not-found.jpg" })
    },
    removeApplicationForAdoptionOnUsers(user: INormalUser, animalId: string): Promise<any> {
        let updatedApplicationsArray = [...user.applicationsForAdoption];
        const applicationIndexForRemoving = updatedApplicationsArray.findIndex(el => el === animalId);
        if (applicationIndexForRemoving >= 0) updatedApplicationsArray.splice(applicationIndexForRemoving, 1)
        return collectionReference.doc(user?.email).update({ applicationsForAdoption: updatedApplicationsArray })
    },
    addApplicationForAdoption(userEmail: string, updatedApplicationsArray: string[]): Promise<any> {
        console.log("updatedApplicationsArray", updatedApplicationsArray)
        return collectionReference.doc(userEmail).update({ applicationsForAdoption: updatedApplicationsArray })
    },
    removeApplicationForAdoption(userEmail: string, updatedApplicationsArray: string[]): Promise<any> {
        console.log("updated applications in user", updatedApplicationsArray)
        return collectionReference.doc(userEmail).update({ applicationsForAdoption: updatedApplicationsArray })
    },
    removeApplicationOnMultipleUsersForAdoption(usersEmails: string[], animalId: string): Promise<any> {
        let matchedUsers = collectionReference;
        return matchedUsers.where("email", "in", usersEmails).get().then(querySnapshot => {
            if (querySnapshot.size > 0) {
                querySnapshot.forEach(user => {
                    this.removeApplicationForAdoptionOnUsers(user.data() as INormalUser, animalId);
                });
            }
        })
    }, /// CHANGE ME
    removeDeletedAnimalApplicationsFromAllUsers(deletedAnimalId: string): Promise<any> {
        let matchedUsers = collectionReference;
        return matchedUsers.where("applicationsForAdoption", "array-contains", deletedAnimalId).get().then(querySnapshot => {
            if (querySnapshot.size > 0) {
                querySnapshot.forEach(user => {
                    this.removeApplicationForAdoptionOnUsers(user.data() as INormalUser, deletedAnimalId);
                });
            }
        })
    }, /// CHANGE ME
    async getShelters(): Promise<IShelter[]> {
        const shelters: IShelter[] = [];
        await collectionReference.where("role", "==", "shelter").get().then(querySnapshot => {
            if (querySnapshot.size > 0) {
                querySnapshot.forEach(doc => {
                    shelters.push(doc.data() as IShelter)
                });
            }
        }).catch()
        return shelters;
    },
    async getUsersApplicationsForAdopting(usersEmail: string[]): Promise<INormalUser[]> {
        let matchedUsers: INormalUser[] = [];
        if (usersEmail?.length > 0) {
            await collectionReference.where("email", "in", [...usersEmail]).get().then(querySnapshot => {
                if (querySnapshot.size > 0) {
                    querySnapshot.forEach(doc => {
                        matchedUsers.push(doc.data() as INormalUser)
                    });
                }
            })
        }
        return matchedUsers;
    },
    async getLatestUserAdditionalData(userEmail: string): Promise<IInstitute | INormalUser | IShelter | undefined> {
        let result: IInstitute | INormalUser | IShelter | undefined = undefined;
        if (userEmail) {
            await firebase.firestore().collection("users").doc(userEmail).get().then(async doc => {
                result = await doc.data() as any;
            });
        }
        return result;
    }
}
