import { storageRef } from '../../firebase';
import { IMapMarker } from '../../models/IMapMarker';

export const FileService = {
    async addMarkerImages(images: File[], newMarker: IMapMarker): Promise<any> {
        let error = "";
        for (var imageIndex = 0; imageIndex < images.length; imageIndex++) { // variable 'images' is not array, it is filelist
            const image = images[imageIndex];
            const markerImageIdentificator = `${newMarker.lat}${newMarker.lng}`.replaceAll(".", "").replaceAll(",", "");
            try {
                await storageRef.child(`marker-images/${markerImageIdentificator}/${image?.name}`).put(image)
            } catch (err) {
                error = "Something went wrong with uploading the files to our server";
            }
        }
        return error;
    },
    async getMarkerImages(marker: IMapMarker): Promise<string[]> {
        let srcImages: string[] = [];
        const markerImageIdentificator = `${marker.lat}${marker.lng}`.replaceAll(".", "").replaceAll(",", "");
        let imagesRef = await storageRef.child(`marker-images/${markerImageIdentificator}`).listAll().then(res => res.items)
        for (let imageRefIndex = 0; imageRefIndex < imagesRef.length; imageRefIndex++) {
            const imageRef = imagesRef[imageRefIndex];
            await imageRef.getDownloadURL().then(url => {
                srcImages.push(url as string)
            })
        }
        return srcImages;
    },
    async deleteMarkerImages(marker: IMapMarker): Promise<string> {
        let error = "";
        const markerImageIdentificator = `${marker.lat}${marker.lng}`.replaceAll(".", "").replaceAll(",", "");
        let imagesRef = await storageRef.child(`marker-images/${markerImageIdentificator}`).listAll().then(res => res.items)
        for (let imageRefIndex = 0; imageRefIndex < imagesRef.length; imageRefIndex++) {
            const imageRef = imagesRef[imageRefIndex];
            // Delete the file
            await imageRef.delete().catch(error => {
                error = "Something went wrong with deleting the files from our server";
            });
        }

        return error;
    }
}
