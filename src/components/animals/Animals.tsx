import AnimalCard from "./animal-card/AnimalCard";
import AnimalsFilters from "./animals-filters/AnimalsFilter";
import Pagination from "@material-ui/lab/Pagination";
import "./Animals.scss";

export default function Animals() {
  return (
    <section id="animals-list-container">
      <AnimalsFilters></AnimalsFilters>
      <AnimalCard></AnimalCard>
      <AnimalCard></AnimalCard>
      <AnimalCard></AnimalCard>
      <AnimalCard></AnimalCard>
      <AnimalCard></AnimalCard>
        <Pagination
          count={10}
          variant="outlined"
          shape="rounded"
          className="animals-pagination"
        />
    </section>
  );
}
