import 'firebase/firestore';
import firebase, { firebaseTimestamp } from '../firebase'
import { IAnimal } from '../models/IAnimal';

const db = firebase.firestore();
const collectionReference = db.collection("animals");

export const AnimalService = {
    addAnimalToCollection(animal: IAnimal) {
        const ref: any = collectionReference.doc();
        const myId: string = ref.id;
        return collectionReference.add({ ...animal, id: myId, createdAt: firebaseTimestamp  })
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
