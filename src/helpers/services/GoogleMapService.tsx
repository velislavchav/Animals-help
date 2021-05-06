import firebase from '../../firebase';
import { IMapMarker } from '../../models/IMapMarker';

const db = firebase.firestore();
const collectionReference = db.collection("map-markers");

export const GoogleMapService = {
    addMarker(newMarker: IMapMarker): Promise<any> {
        return collectionReference.add({ ...newMarker });
    },
    async getAllMarkers(): Promise<IMapMarker[]> {
        const markers: IMapMarker[] = [];
        await collectionReference.get().then(querySnapshot => {
            querySnapshot.docs.forEach(doc => {
                markers.push(doc.data() as IMapMarker);
            });
        }).catch()
        return markers;
    },
    deleteMarker(selectedMarker: IMapMarker): Promise<any> {
        return collectionReference
            .where("lat", "==", selectedMarker?.lat)
            .where("lng", "==", selectedMarker?.lng).get().then(querySnapshot => {
                querySnapshot.forEach(async doc => {
                    await collectionReference.doc(doc.id).delete()
                });
            })
    }
}
