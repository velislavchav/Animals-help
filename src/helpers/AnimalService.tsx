import 'firebase/firestore';
import firebase from '../firebase'
import { IAnimal } from '../models/IAnimal';

const db = firebase.firestore();
const collectionReference = db.collection("animals");

export const AnimalService = {
    addAnimalToCollection(animal: IAnimal) {
        collectionReference.add(animal)
    },
    async getAllAnimals() : Promise<any> {
        const markers: IAnimal[] = [];
        await collectionReference.get().then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                markers.push(doc.data() as IAnimal);
            });
        }).catch()
        return markers;
    },
    getAnimal(animalId: string) : Promise<any> {
        return collectionReference.doc(animalId).get();
    }
}
