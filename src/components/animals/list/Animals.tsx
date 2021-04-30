import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { AnimalService } from "../../../helpers/AnimalService";
import { IAnimal } from "../../../models/IAnimal";
import AnimalCard from "./list-card/AnimalCard";
import AnimalsFilters from "./list-filters/AnimalsFilter";
import Pagination from "@material-ui/lab/Pagination";
import IAnimalFilters from "../../../models/IAnimalFilters";
import "./Animals.scss";
import { CheckIfObjectValuesAreEmpty } from "../../../helpers/GeneralHelper";

export default function Animals() {
  const [animals, setAnimals] = useState<IAnimal[]>([])
  const [filters, setFilters] = useState<IAnimalFilters>({
    type: "",
    color: "",
    currentLocation: ""
  })
  const history = useHistory();

  useEffect(() => {
    let result: IAnimal[] = [];
    AnimalService.getAllAnimals().then(data => {
      data.forEach((animal: IAnimal) => result.push(animal));
      setAnimals(result as any);
    });
  }, []);

  const filterChange = (event: React.ChangeEvent<HTMLSelectElement | any>) => {
    let newFilterState = { ...filters, [event.target.name]: event.target.value };
    setFilters(newFilterState);
    try {
      if (!CheckIfObjectValuesAreEmpty(newFilterState)) {
        AnimalService.filterAnimals(newFilterState).then(data => {
          setAnimals(data as IAnimal[]);
        });
      } else {
        AnimalService.getAllAnimals().then(data => {
          setAnimals(data as IAnimal[]);
        });
      }
    } catch { }
  };

  const redirectToAnimalDetails = (animal: IAnimal) => {
    history.push(`/animals/${animal.type}/${animal.id}`);
  }

  return (
    <section id="animals-list-container">
      <AnimalsFilters {...filters as any} changeFilter={filterChange}></AnimalsFilters>
      {animals && animals.length > 0 ? animals.map((animal: IAnimal) => {
        return <div className="animals-list-card" onClick={() => redirectToAnimalDetails(animal)} key={animal.id}><AnimalCard {...animal} /></ div>
        // onClick={redirectToAnimalDetails(animal as IAnimal)}
      }) : <span className="no-animals-message"> No animals found </span>}
      <Pagination
        count={Math.max(animals.length / 4)}
        variant="outlined"
        shape="rounded"
        className="animals-pagination"
      />
    </section>
  );
}
