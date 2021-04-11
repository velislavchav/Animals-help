import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { AnimalService } from "../../helpers/AnimalService";
import { IAnimal } from "../../models/IAnimal";
import AnimalCard from "./animals-card/AnimalCard";
import AnimalsFilters from "./animals-filters/AnimalsFilter";
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
    console.log("hmm")
    history.push(`/animals/${animal.type}/${animal.id}`);
  }

  return (
    <section id="animals-list-container">
      <AnimalsFilters></AnimalsFilters>
      {animals.map((animal: any) => {
        return <AnimalCard  key={animal.id} {...animal} />
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
