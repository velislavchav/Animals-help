import { useEffect, useState } from "react";
import { Paper } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import { AnimalService } from "../../../helpers/services/AnimalService";
import { Link } from 'react-router-dom';
import { useAuth } from "../../../contexts/AuthContext";
import "./AnimalDetails.scss";
import { IAnimal } from "../../../models/IAnimal";
import AdoptAnimalAgreementModal from "../adopt-modal/AdoptAnimalAgreementModal";
import DeleteAnimalModal from "../delete/DeleteAnimalModal";
import { IsTheUserHasAccess } from "../../../helpers/GeneralHelper";
import AdoptionApplicationsTable from "./AdoptionApplicationsTable"

export default function AnimalDetails(props: any) {
  const animalId = props.match.params.id;
  const { currentUser } = useAuth();
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
    usersAppliedForAdoption: []
  })

  useEffect((): any => {
    AnimalService.getAnimal(animalId).then((doc) => {
      if (doc.exists) {
        setAnimal(doc.data() as IAnimal)
      } else {
        console.log("No such document!");
      }
    }).catch((error) => {
      console.log("Error getting document:", error);
    })

    return () => { return false };
  }, [animalId])

  return (
    <>
      <section id="animal-details-container">
        <div className="animal-details-top-buttons-container">
          <Button color="inherit" component={Link} to={'/animals'}>Back to all animals</Button>
          {IsTheUserHasAccess(currentUser, ["normal"]) ? <AdoptAnimalAgreementModal {...animal} /> : ""}
          {IsTheUserHasAccess(currentUser, ["shelter"]) && currentUser.email === animal.creator ? <DeleteAnimalModal {...animal} /> : ""}
        </div>
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
            <TableBody>
              <TableRow key="Type">
                <TableCell component="th" scope="row"> Type </TableCell>
                <TableCell align="right"> {animal.type} </TableCell>
              </TableRow>
              <TableRow key="Age">
                <TableCell component="th" scope="row"> Age </TableCell>
                <TableCell align="right">{animal.age} years old </TableCell>
              </TableRow>
              <TableRow key="Weight">
                <TableCell component="th" scope="row"> Weight </TableCell>
                <TableCell align="right">{animal.weight} kg </TableCell>
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
      {IsTheUserHasAccess(currentUser, ["shelter"]) && currentUser.email === animal.creator ? <AdoptionApplicationsTable applicationsForAdoption={animal?.usersAppliedForAdoption} /> : ""}
    </>
  );
}
