import { useEffect, useState } from "react";
import { displayLoader, hideLoader } from "../../helpers/GeneralHelper";
import { UserService } from "../../helpers/services/UserService";
import { IShelter } from "../../models/IShelter";
import ShelterCard from "./ShelterCard"
import "./ShelterList.scss"

export default function ShelterList() {
    const [shelters, setShelters] = useState<IShelter[]>([])

    useEffect(() => {
        displayLoader();
        let result: IShelter[] = [];
        UserService.getShelters().then(data => {
            data.forEach((shelter: IShelter) => {
                result.push(shelter)
            });
            setShelters(result as IShelter[]);
            hideLoader();
        })
    }, [])

    return (
        <section className="shelter-list-section">
            {shelters?.map(shelter => {
                return <ShelterCard key={shelter.email} {...shelter}></ShelterCard>
            })}
        </section>
    );
}
