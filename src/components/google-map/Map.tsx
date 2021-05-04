import { useState, useRef, useCallback } from 'react'
import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { IMapMarker } from '../../models/IMapMarker';
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import "./Map.scss"
import { formatFullDate } from '../../helpers/GeneralHelper';
import { IMapSignalType } from '../../models/IMapSignalType';

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

const getMarkerIcon = (markerSignalType: IMapSignalType): string => {
    if (markerSignalType.isInjured && markerSignalType.isLost) {
        return "/icons/pawprint.png";
    } else if (markerSignalType.isInjured) {
        return "/icons/injured-animal.png";
    } else if (markerSignalType.isLost) {
        return "/icons/wanted-animal.png";
    }

    return "/icons/pawprint.png";
}

const getMarkerTitle = (markerSignalType: IMapSignalType): string => {
    if (markerSignalType.isInjured && markerSignalType.isLost) {
        return "Lost and injured animal";
    } else if (markerSignalType.isInjured) {
        return "Injured animal";
    } else if (markerSignalType.isLost) {
        return "Lost animal";
    }

    return "Injured animal";
}

export default function Map() {
    const { isLoaded, loadError } = useLoadScript({
        // googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        googleMapsApiKey: "",
        libraries
    })

    const [markers, setMarkers] = useState<IMapMarker[]>([])
    const [selectedMarker, setSelectedMarker] = useState<IMapMarker | null>(null)
    const [selectedSignalType, setSelectedSignalType] = useState<IMapSignalType>({
        isInjured: true,
        isLost: false
    })

    const handleMapClick = (event: any) => {
        const newMarker: IMapMarker = {
            lat: event.latLng.lat(),
            lng: event.latLng.lng(),
            time: new Date(),
            signalType: { ...selectedSignalType }
        }
        setMarkers([...markers, newMarker])
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

    return (
        <div>
            {!loadError && isLoaded ?
                <section id="google-map-container">
                    <SignalsType changeSignalType={changeSignalType} {...selectedSignalType}></SignalsType>
                    <LocateMe panTo={panTo}></LocateMe>
                    <GoogleMap mapContainerStyle={mapContainerStyle} zoom={15} center={center} options={options} onClick={handleMapClick} onLoad={onMapLoad}>
                        {markers.map(marker => {
                            return <Marker key={marker.time.toISOString()}
                                title={getMarkerTitle(marker.signalType)}
                                position={{ lat: marker.lat, lng: marker.lng }}
                                icon={{ url: getMarkerIcon(marker.signalType), scaledSize: new window.google.maps.Size(30, 30), origin: new window.google.maps.Point(0, 0), anchor: new window.google.maps.Point(15, 15) }}
                                onClick={() => setSelectedMarker(marker)} />
                        })}
                        {selectedMarker ? <InfoWindow position={{ lat: selectedMarker?.lat, lng: selectedMarker?.lng }} onCloseClick={() => setSelectedMarker(null)}><article>
                            <h2>{getMarkerTitle(selectedMarker.signalType)} spotted!</h2>
                            <p> Spotted at {formatFullDate(selectedMarker?.time)}</p>
                        </article></InfoWindow> : null}
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