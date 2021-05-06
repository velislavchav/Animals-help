import { useState, useRef, useCallback, useEffect } from 'react'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { IMapMarker } from '../../models/IMapMarker';
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import "./Map.scss"
import { formatFullDate, getMarkerIcon, getMarkerTitle, IsTheUserHasAccess } from '../../helpers/GeneralHelper';
import { IMapSignalType } from '../../models/IMapSignalType';
import { GoogleMapService } from '../../helpers/services/GoogleMapService';
import { toast } from 'react-toastify';
import MapConfirmationModal from './MapConfirmationModal';
import { useAuth } from '../../contexts/AuthContext';

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
    const { currentUser } = useAuth();
    const [markers, setMarkers] = useState<IMapMarker[]>([])
    const [newMarker, setNewMarker] = useState<IMapMarker>()
    const [selectedMarker, setSelectedMarker] = useState<IMapMarker | null>(null)
    const [selectedSignalType, setSelectedSignalType] = useState<IMapSignalType>({
        isInjured: true,
        isLost: false
    })
    const [mapConfirmationSubmission, setMapConfirmationSubmission] = useState(false);
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

    const handleMapClick = (newMarker: IMapMarker) => {
        try {
            GoogleMapService.addMarker(newMarker).then(data => {
                setMarkers([...markers, newMarker])
                toast.success("Successfully added marker on the map!")
            })
        } catch (error) {
            toast.error("Something went wrong!")
        }
        setMapConfirmationSubmission(false);
    }

    const changeSignalType = (type: string) => {
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

    const mapRef = useRef();
    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, [])

    const panTo = useCallback(({ lat, lng }) => {
        const mapRefAsAny = mapRef as any;
        mapRefAsAny?.current?.panTo({ lat, lng });
        mapRefAsAny?.current?.setZoom(15);
    }, [])

    const deleteMarker = () => {
        if (selectedMarker !== null) {
            try {
                GoogleMapService.deleteMarker(selectedMarker).then(() => {
                    let updatedMarkersArray = [...markers];
                    const deletedElIndex = markers.findIndex(marker => marker.lat === selectedMarker.lat && marker.lng === selectedMarker.lng);
                    if(deletedElIndex >= 0) updatedMarkersArray.splice(deletedElIndex, 1)
                    setMarkers(updatedMarkersArray);
                    setSelectedMarker(null);
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
                                onClick={() => setSelectedMarker(marker)} />
                        })}
                        {selectedMarker ? <InfoWindow position={{ lat: selectedMarker?.lat, lng: selectedMarker?.lng }} onCloseClick={() => setSelectedMarker(null)}><article>
                            <h2>{getMarkerTitle(selectedMarker.signalType)} spotted!</h2>
                            <p> Spotted at {formatFullDate(selectedMarker?.time)}</p>
                            {IsTheUserHasAccess(currentUser, ["institution"]) ? <Button onClick={deleteMarker} variant="contained" color="secondary" className="delete-map-signal"> Delete this signal </Button> : <></>}
                        </article></InfoWindow> : null}
                        <MapConfirmationModal newMarker={newMarker} mapConfirmationSubmission={mapConfirmationSubmission} handleMapClick={handleMapClick} handleClickCloseModal={handleClickCloseModal}></MapConfirmationModal>
                    </GoogleMap>
                </section> : ""}
        </div>
    )
}

function LocateMe({ panTo }: any) {
    return <button title="Locate me" className="locate-me-button" onClick={() => {
        navigator.geolocation.getCurrentPosition((position: any) =>
            panTo({ lat: position?.coords?.latitude, lng: position?.coords?.longitude }),
            () => null);
    }}><img src="/icons/map.png" alt="Locate me" /></button>
}

function SignalsType({ changeSignalType, isInjured, isLost }: any) {
    return <ButtonGroup className="signals-type-holder" variant="contained" color="primary" aria-label="contained primary button group">
        <Button className={isInjured && !isLost ? "active" : ""} onClick={() => changeSignalType("injured")}> Injured animal </Button>
        <Button className={!isInjured && isLost ? "active" : ""} onClick={() => changeSignalType("lost")}> Lost animal </Button>
        <Button className={isInjured && isLost ? "active" : ""} onClick={() => changeSignalType("both")}> Both </Button>
    </ButtonGroup>
}