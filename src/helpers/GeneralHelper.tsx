import { IMapSignalType } from "../models/IMapSignalType";

const CheckIfStringIsEmpty = (stringForCheck: string) => {
    return stringForCheck?.trim().length === 0 ||
        stringForCheck === "" ||
        stringForCheck === null ||
        stringForCheck === undefined ?
        true : false
}

const CheckIfObjectHasAnyValues = (object: Object) => {
    const notEmptyObjectValues = Object.values(object).filter(objValue => !CheckIfStringIsEmpty(objValue as string));
    return notEmptyObjectValues?.length > 0 ? true : false;
}

const CheckIfAllObjectPropsAreFilled = (objectToCheck: any, doNotCheckKeys: string[]) => {
    let areFilled: boolean = true;
    Object.keys(objectToCheck).forEach((objKey: string) => {
        if (typeof (objectToCheck[objKey]) !== "object" && !doNotCheckKeys.includes(objKey)) {
            if (areFilled === false) {
                return false;
            } else {
                areFilled = !CheckIfStringIsEmpty(objectToCheck[objKey].toString())
            }
        }
    })
    return areFilled;
}

const CheckIsEnterPressed = (event: any) => {
    return event?.keyCode === 13 || event?.key === 'Enter' ? true : false;
}

const IsTheUserHasAccess = (user: any, accessRoles: string[]) => {
    if (user?.role && user?.email) {
        return user.role === "admin" ? true : accessRoles.includes(user.role);
    }
    return false
}

const formatFullDate = (date: any) => {
    try {
        date = date?.toDate()  
    } catch {}
    const DD = ("0" + date.getDate()).slice(-2);
    const MM = ("0" + (date.getMonth() + 1)).slice(-2);
    const YYYY = date.getFullYear();
    const hh = ("0" + date.getHours()).slice(-2);
    const mm = ("0" + date.getMinutes()).slice(-2);
    const ss = ("0" + date.getSeconds()).slice(-2);
    const date_string = DD + "/" + MM + "/" + YYYY + " " + hh + ":" + mm + ":" + ss;
    return date_string;
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

const displayLoader = () => {
    document.getElementById("loader-container")?.classList.remove("disp-none");
}

const hideLoader = () => {
    document.getElementById("loader-container")?.classList.add("disp-none");
}

export {
    CheckIfStringIsEmpty,
    CheckIfObjectHasAnyValues,
    CheckIfAllObjectPropsAreFilled,
    CheckIsEnterPressed,
    IsTheUserHasAccess,
    formatFullDate,
    getMarkerIcon,
    getMarkerTitle,
    displayLoader,
    hideLoader
};
