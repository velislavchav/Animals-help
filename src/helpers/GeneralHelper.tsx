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

export {
    CheckIfStringIsEmpty,
    CheckIfObjectValuesAreEmpty,
    CheckIsEnterPressed
};
