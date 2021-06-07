import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { AnimalService } from "../../../helpers/services/AnimalService";
import { IAnimal } from "../../../models/IAnimal";
import AnimalCard from "./list-card/AnimalCard";
import AnimalsFilters from "./list-filters/AnimalsFilter";
import Pagination from "@material-ui/lab/Pagination";
import IAnimalFilters from "../../../models/IAnimalFilters";
import "./Animals.scss";
import { CheckIfObjectHasAnyValues, displayLoader, hideLoader } from "../../../helpers/GeneralHelper";

export default function Animals() {
  const animlsPerPage = 9;
  const [animals, setAnimals] = useState<IAnimal[]>([])
  const [filters, setFilters] = useState<IAnimalFilters>({
    type: "",
    color: "",
    currentLocation: ""
  })
  const [currentPage, setCurrentPage] = useState(1)
  const history = useHistory();

  useEffect(() => {
    displayLoader();
    let result: IAnimal[] = [];
    AnimalService.getAllAnimals().then(data => {
      data.forEach((animal: IAnimal) => result.push(animal));
      setAnimals(result as any);
      hideLoader();
    });
  }, []);

  const filterChange = (event: React.ChangeEvent<HTMLSelectElement | any>) => {
    displayLoader();
    let newFilterState = { ...filters, [event.target.name]: event.target.value };
    setFilters(newFilterState);
    try {
      if (CheckIfObjectHasAnyValues(newFilterState)) {
        AnimalService.filterAnimals(newFilterState).then(data => {
          setAnimals(data as IAnimal[]);
          hideLoader();
        });
      } else {
        AnimalService.getAllAnimals().then(data => {
          setAnimals(data as IAnimal[]);
          hideLoader();
        });
      }
    } catch { hideLoader(); }
  };

  const handlePagination = (event: any) => {
    displayLoader();
    setCurrentPage(+event.target.textContent);
    hideLoader();
  }

  const redirectToAnimalDetails = (animal: IAnimal) => {
    history.push(`/animals/${animal.type}/${animal.id}`);
  }

  return (
    <section id="animals-list-container">
      <AnimalsFilters {...filters as any} changeFilter={filterChange}></AnimalsFilters>
      {animals && animals.length > 0 ? animals.slice(animlsPerPage * (currentPage - 1), animlsPerPage * currentPage).map((animal: IAnimal) => {
        return <div className="animals-list-card" onClick={() => redirectToAnimalDetails(animal)} key={animal.id}><AnimalCard {...animal} /></ div>
      }) : <span className="no-animals-message"> No animals found </span>}
      {animals.length / animlsPerPage >= 1 ? <Pagination
        hideNextButton
        hidePrevButton
        count={Math.ceil(animals.length / animlsPerPage)}
        variant="outlined"
        shape="rounded"
        className="animals-pagination"
        onChange={handlePagination}
      /> : <></>}
    </section>
  );
}
