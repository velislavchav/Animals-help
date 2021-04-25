import { useEffect, useState } from "react";
import { Paper } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { AnimalService } from "../../../helpers/AnimalService";
import "./AnimalDetails.scss";
import { IAnimal } from "../../../models/IAnimal";

export default function AnimalDetails(props: any) {
  const animalId = props.match.params.id;
  const [animal, setAnimal] = useState<IAnimal>({
    id: animalId,
    type: "",
    name: "",
    age: 0,
    weight: 0,
    color: "",
    image: "",
    currentLocation: "",
    description: "",
  })
  useEffect(() : any => {
    let isMounted = true;
    AnimalService.getAnimal(animalId).then((doc) => {
      if (doc.exists) {
        setAnimal(doc.data() as IAnimal)
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    })

    return () => { isMounted = false };
  }, [animalId])

  return (
    <section id="animal-details-container">
      <Paper
        elevation={3}
        variant="outlined"
        square
        component="figure"
        className="animal-details-image-container"
      >
        <img
          src={animal.image}
          alt={animal.type}
          className="animal-details-image"
        />
      </Paper>
      <TableContainer className="animal-details-table" component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Category</TableCell>
              <TableCell align="right">Values</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow key="Type">
              <TableCell component="th" scope="row"> Type </TableCell>
              <TableCell align="right"> {animal.type}</TableCell>
            </TableRow>
            <TableRow key="Age">
              <TableCell component="th" scope="row"> Age </TableCell>
              <TableCell align="right">{animal.age}</TableCell>
            </TableRow>
            <TableRow key="Weight">
              <TableCell component="th" scope="row"> Weight </TableCell>
              <TableCell align="right">{animal.weight}</TableCell>
            </TableRow>
            <TableRow key="Color">
              <TableCell component="th" scope="row"> Color </TableCell>
              <TableCell align="right">{animal.color}</TableCell>
            </TableRow>
            <TableRow key="Location">
              <TableCell component="th" scope="row"> Location </TableCell>
              <TableCell align="right">{animal.currentLocation}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <p>
        {animal.description}
      </p>
    </section>
  );
}