export default function LocateMe({ panTo }: any) {
    return <button title="Locate me" className="locate-me-button" onClick={() => {
        navigator.geolocation.getCurrentPosition((position: any) =>
            panTo({ lat: position?.coords?.latitude, lng: position?.coords?.longitude }),
            () => null);
    }}><img src="/icons/map.png" alt="Locate me" /></button>
}
