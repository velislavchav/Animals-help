const CheckIfStringIsEmpty = (stringForCheck: string) => {
    return stringForCheck?.trim().length === 0 ||
        stringForCheck === "" ||
        stringForCheck === null ||
        stringForCheck === undefined ?
        true : false
}

const CheckIfObjectValuesAreEmpty = (object: Object) => {
    const notEmptyObjectValues = Object.values(object).filter(objValue => !CheckIfStringIsEmpty(objValue as string));
    return notEmptyObjectValues?.length > 0 ? false : true;
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

const formatFullDate = (date: Date) => {
    const DD = ("0" + date.getDate()).slice(-2);
    const MM = ("0" + (date.getMonth() + 1)).slice(-2);
    const YYYY = date.getFullYear();
    const hh = ("0" + date.getHours()).slice(-2);
    const mm = ("0" + date.getMinutes()).slice(-2);
    const ss = ("0" + date.getSeconds()).slice(-2);
    const date_string = DD + "/" + MM + "/" + YYYY + " " + hh + ":" + mm + ":" + ss;
    return date_string;
}

export {
    CheckIfStringIsEmpty,
    CheckIfObjectValuesAreEmpty,
    CheckIsEnterPressed,
    IsTheUserHasAccess,
    formatFullDate
};
