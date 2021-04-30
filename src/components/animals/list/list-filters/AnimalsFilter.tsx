import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import "./AnimalsFilter.scss";
import IAnimalFilters from "../../../../models/IAnimalFilters";

interface IAnimalFiltersProps extends IAnimalFilters {
  changeFilter: any
}

export default function AnimalsFilters(props: IAnimalFiltersProps) {
  return (
    <section className="animals-filters-container">
      <FormControl className="animals-filter-input-container">
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props?.type}
          name="type"
          onChange={props?.changeFilter}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value={"dog"}>Dog</MenuItem>
          <MenuItem value={"lizard"}>Lizard</MenuItem>
          <MenuItem value={"bird"}>Bird</MenuItem>
        </Select>
      </FormControl>
      <FormControl className="animals-filter-input-container">
        <InputLabel id="demo-simple-select-label">Color</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props?.color}
          name="color"
          onChange={props?.changeFilter}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value={"red"}>Red</MenuItem>
          <MenuItem value={"blue"}>Blue</MenuItem>
          <MenuItem value={"brown"}>Brown</MenuItem>
          <MenuItem value={"black"}>Black</MenuItem>
        </Select>
      </FormControl>
      <FormControl className="animals-filter-input-container">
        <InputLabel id="demo-simple-select-label">Location</InputLabel>
        <Select
          // ref={filters.location}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={props?.currentLocation}
          name="currentLocation"
          onChange={props?.changeFilter}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value={"Plovdiv"}>Plovdiv</MenuItem>
          <MenuItem value={"Varna"}>Varna</MenuItem>
          <MenuItem value={"Sofia"}>Sofia</MenuItem>
          <MenuItem value={"Burgas"}>Burgas</MenuItem>
          <MenuItem value={"Smolyan"}>Smolyan</MenuItem>
        </Select>
      </FormControl>
    </section>
  );
}
