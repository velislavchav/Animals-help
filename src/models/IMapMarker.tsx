import { IMapSignalType } from "./IMapSignalType";

export interface IMapMarker {
    lat: number,
    lng: number,
    time: Date,
    signalType: IMapSignalType
}
