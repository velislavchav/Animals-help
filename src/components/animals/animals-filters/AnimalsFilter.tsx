import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import "./AnimalsFilter.scss";

export default function AnimalsFilters() {
  const [type, setType] = React.useState("");
  const [age, setAge] = React.useState("");
  const [location, setLocation] = React.useState("");

  const handleChange = (
    event: React.ChangeEvent<{ value: unknown }>,
    filterType: string
  ) => {
    switch (filterType) {
      case "type":
        setType(event.target.value as string);
        break;
      case "age":
        setAge(event.target.value as string);
        break;
      case "location":
        setLocation(event.target.value as string);
        break;
      default:
        break;
    }
    setAge(event.target.value as string);
  };

  return (
    <section className="animals-filters-container">
      <FormControl className="animals-filter-input-container">
        <InputLabel id="demo-simple-select-label">Type</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={type}
          onChange={(e) => handleChange(e, "type")}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value={"Dog"}>Dog</MenuItem>
          <MenuItem value={"Lizard"}>Lizard</MenuItem>
          <MenuItem value={"Bird"}>Bird</MenuItem>
        </Select>
      </FormControl>
      <FormControl className="animals-filter-input-container">
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          onChange={(e) => handleChange(e, "age")}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
        </Select>
      </FormControl>
      <FormControl className="animals-filter-input-container">
        <InputLabel id="demo-simple-select-label">Location</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={location}
          onChange={(e) => handleChange(e, "location")}
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
