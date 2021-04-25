import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { AnimalService } from "../../../helpers/AnimalService";
import { IAnimal } from "../../../models/IAnimal";
import AnimalCard from "./list-card/AnimalCard";
import AnimalsFilters from "./list-filters/AnimalsFilter";
import Pagination from "@material-ui/lab/Pagination";
import "./Animals.scss";

export default function Animals() {
  const [animals, setAnimals] = useState([])
  const history = useHistory();
  useEffect(() => {
    let result: IAnimal[] = [];
    AnimalService.getAllAnimals().then(data => {
      data.forEach((animal: IAnimal) => result.push(animal))
      setAnimals(result as any);
    });
  }, []);

  const redirectToAnimalDetails = (animal: IAnimal) => {
    history.push(`/animals/${animal.type}/${animal.id}`);
  }

  return (
    <section id="animals-list-container">
      <AnimalsFilters></AnimalsFilters>
      {animals.map((animal: any) => {
        return <div className="animals-list-card" onClick={() => redirectToAnimalDetails(animal as IAnimal)} key={animal.id}><AnimalCard {...animal}/></ div>
        // onClick={redirectToAnimalDetails(animal as IAnimal)}
      })}
      <Pagination
        count={10}
        variant="outlined"
        shape="rounded"
        className="animals-pagination"
      />
    </section>
  );
}
