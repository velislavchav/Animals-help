import 'firebase/firestore';
import firebase, { firebaseTimestamp } from '../firebase'
import { IAnimal } from '../models/IAnimal';
import IAnimalFilters from '../models/IAnimalFilters';
import { CheckIfStringIsEmpty } from './GeneralHelper';

const db = firebase.firestore();
const collectionReference = db.collection("animals");

export const AnimalService = {
    addAnimalToCollection(animal: IAnimal) {
        try {
            const ref: any = collectionReference.doc();
            const myId: string = ref.id;
            return ref.set({ ...animal, id: myId, createdAt: firebaseTimestamp })
        } catch { }
    },
    async getAllAnimals(): Promise<any> {
        const markers: IAnimal[] = [];
        await collectionReference.get().then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                markers.push(doc.data() as IAnimal);
            });
        }).catch()
        return markers;
    },
    getAnimal(animalId: string): Promise<any> {
        return collectionReference.doc(animalId).get();
    },
    async filterAnimals(filters: IAnimalFilters): Promise<any> {
        const animals: IAnimal[] = [];
        let notEmptyFiltersKeys = Object.keys(filters).filter(filterKey => !CheckIfStringIsEmpty(filters[filterKey as keyof IAnimalFilters]));
        if (notEmptyFiltersKeys.length > 0) {
            try {
                const firstQueryKey = notEmptyFiltersKeys[0];
                let queryRef = await collectionReference.where(firstQueryKey, "==", filters[firstQueryKey as keyof IAnimalFilters]);
                await notEmptyFiltersKeys.forEach(async (filterKey: string) => {
                    if (filters[filterKey as keyof IAnimalFilters] && filterKey !== firstQueryKey) {
                        queryRef = await queryRef.where(filterKey, "==", filters[filterKey as keyof IAnimalFilters]);
                    }
                })
                await queryRef.get().then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        animals.push(doc.data() as IAnimal);
                    });
                })
                return animals;
            } catch (error) { console.log(error) }
        }
    }
}
