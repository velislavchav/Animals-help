import { useState, useRef, useCallback, useEffect } from 'react'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { IMapMarker } from '../../models/IMapMarker';
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';
import Button from '@material-ui/core/Button';
import "./Map.scss"
import { formatFullDate, getMarkerIcon, getMarkerTitle, IsTheUserHasAccess } from '../../helpers/GeneralHelper';
import { IMapSignalType } from '../../models/IMapSignalType';
import { GoogleMapService } from '../../helpers/services/GoogleMapService';
import { toast } from 'react-toastify';
import MapConfirmationModal from './MapConfirmationModal';
import { useAuth } from '../../contexts/AuthContext';
import { FileService } from '../../helpers/services/FileService';
import SignalsType from './SignalsType'
import LocateMe from './LocateMe'

declare global {
    interface Window {
        google: any;
    }
}
const libraries: Libraries | undefined = ["places"];
const mapContainerStyle = {
    width: "100vw",
    height: "100vh"
}
const center = {
    lat: 41.58528,
    lng: 24.69194
}
const options = {
    disableDefaultUI: true,
    zoomControl: true
}

export default function Map() {
    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY as string,
        libraries
    })
    const { currentUser, currentUserAdditionalData } = useAuth();
    const [markers, setMarkers] = useState<IMapMarker[]>([])
    const [newMarker, setNewMarker] = useState<IMapMarker>()
    const [newMarkerImages, setNewMarkerImages] = useState<File[]>([])
    const [selectedMarker, setSelectedMarker] = useState<IMapMarker | null>(null)
    const [selectedMarkerImages, setSelectedMarkerImages] = useState<string[]>([])
    const [selectedSignalType, setSelectedSignalType] = useState<IMapSignalType>({
        isInjured: true,
        isLost: false
    })
    const [mapConfirmationSubmission, setMapConfirmationSubmission] = useState(false);


    useEffect(() => {
        let result: IMapMarker[] = [];
        try {
            GoogleMapService.getAllMarkers().then(data => {
                data.forEach((marker: IMapMarker) => result.push(marker));
                setMarkers(result)
            })
        } catch (error) {
            toast.error("Something went wrong with fetching old markers!")
        }
    }, [])

    const handleClickOpenModal = (event: any) => {
        const markerData: IMapMarker = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            time: new Date(),
            signalType: { ...selectedSignalType }
        }
        setNewMarker(markerData);
        setMapConfirmationSubmission(true);
    };

    const handleClickCloseModal = () => {
        setMapConfirmationSubmission(false);
    };

    const handleMapClick = async (newMarker: IMapMarker) => {
        setSelectedMarker(null)
        try {
            await GoogleMapService.addMarker(newMarker).then(() => {
                setMarkers([...markers, newMarker])
                toast.success("Successfully added marker on the map!")
            })
            if (newMarkerImages.length > 0) {
                await FileService.addMarkerImages(newMarkerImages, newMarker).then(error => {
                    if (error) {
                        toast.error(error);
                    }
                    setNewMarkerImages([]);
                })
            }
        } catch (error) {
            toast.error("Something went wrong!")
        }
        setMapConfirmationSubmission(false);
    }

    const changeSignalType = (type: string) => {
        setSelectedMarker(null)
        switch (type) {
            case "lost":
                setSelectedSignalType({ isInjured: false, isLost: true })
                break;
            case "both":
                setSelectedSignalType({ isInjured: true, isLost: true })
                break;
            default:
                setSelectedSignalType({ isInjured: true, isLost: false })
                break;
        }
    }

    const openSelectedMarker = (marker: IMapMarker) => {
        try {
            FileService.getMarkerImages(marker).then((imagesUrl) => {
                setSelectedMarkerImages(imagesUrl);
                setSelectedMarker(marker);
            });
        } catch (error) {
            console.log(error)
        }
    }

    const uploadMarkerImagesLocally = (e: any) => {
        setNewMarkerImages(e?.target?.files)
    }

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        setSelectedMarker(null)
        mapRef.current = map;
    }, [])

    const panTo = useCallback(({ lat, lng }) => {
        setSelectedMarker(null)
        const mapRefAsAny = mapRef as any;
        mapRefAsAny?.current?.panTo({ lat, lng });
        mapRefAsAny?.current?.setZoom(15);
    }, [])

    const deleteMarker = async () => {
        if (selectedMarker !== null) {
            try {
                await FileService.deleteMarkerImages(selectedMarker).then(error => {
                    if(error) console.log(error)
                })
                await GoogleMapService.deleteMarker(selectedMarker).then(() => {
                    let updatedMarkersArray = [...markers];
                    const deletedElIndex = markers.findIndex(marker => marker.lat === selectedMarker.lat && marker.lng === selectedMarker.lng);
                    if (deletedElIndex >= 0) updatedMarkersArray.splice(deletedElIndex, 1)
                    setMarkers(updatedMarkersArray);
                    setSelectedMarker(null);
                    setSelectedMarkerImages([]);
                    toast.success("Successfully deleted signal!")
                });
            } catch {
                toast.success("Something went wrong with deleting the signal!")
            }
        }
    }

    return (
        <div>
            {!loadError && isLoaded ?
                <section id="google-map-container">
                    <SignalsType changeSignalType={changeSignalType} {...selectedSignalType}></SignalsType>
                    <LocateMe panTo={panTo}></LocateMe>
                    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={15} center={center} options={options} onClick={handleClickOpenModal} onLoad={onMapLoad}>
                        {markers.map(marker => {
                            return <Marker key={marker?.time?.toString()}
                                title={getMarkerTitle(marker.signalType)}
                                position={{ lat: marker.lat, lng: marker.lng }}
                                icon={{ url: getMarkerIcon(marker.signalType), scaledSize: new window.google.maps.Size(30, 30), origin: new window.google.maps.Point(0, 0), anchor: new window.google.maps.Point(15, 15) }}
                                onClick={() => openSelectedMarker(marker)} />
                        })}
                        {selectedMarker ? <InfoWindow position={{ lat: selectedMarker?.lat, lng: selectedMarker?.lng }} onCloseClick={() => setSelectedMarker(null)}>
                            <article>
                                <h2>{getMarkerTitle(selectedMarker.signalType)} spotted!</h2>
                                <p> Spotted at {formatFullDate(selectedMarker?.time)}</p>
                                {selectedMarkerImages.map(markerImage => {
                                    return <><a target="_blank" rel="noreferrer" key={markerImage} href={markerImage} className="marker-details-image">
                                        <img alt="marker-img" src={markerImage} />
                                    </a></>
                                })}
                                {currentUser?.email && IsTheUserHasAccess(currentUserAdditionalData, ["institution"]) ? <Button onClick={deleteMarker} variant="contained" color="secondary" className="delete-map-signal"> Delete this signal </Button> : <></>}
                            </article>
                        </InfoWindow> : null}
                        <MapConfirmationModal newMarker={newMarker} newMarkerImages={newMarkerImages} mapConfirmationSubmission={mapConfirmationSubmission} handleMapClick={handleMapClick} handleClickCloseModal={handleClickCloseModal} uploadMarkerImagesLocally={uploadMarkerImagesLocally}></MapConfirmationModal>
                    </GoogleMap>
                </section> : ""}
        </div>
    )
}
