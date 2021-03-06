import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useHistory } from "react-router";
import { IAnimal } from "../../../models/IAnimal";
import { toast } from "react-toastify";
import "./AddAnimal.scss";
import { Button, TextField } from "@material-ui/core";
import { AnimalService } from "../../../helpers/services/AnimalService";
import { CheckIfAllObjectPropsAreFilled, CheckIsEnterPressed, displayLoader, hideLoader } from "../../../helpers/GeneralHelper";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default function AddAnimal() {
    const { currentUser } = useAuth();
    const history = useHistory();
    const [newAnimal, setNewAnimal] = useState<IAnimal>({
        id: "",
        type: "",
        name: "",
        age: 0,
        weight: 0,
        color: "",
        image: "",
        currentLocation: "",
        description: "",
        createdBy: currentUser?.uid,
        creator: currentUser?.email,
        usersAppliedForAdoption: []
    });

    const handleChange = (prop: keyof IAnimal) => (event: React.ChangeEvent<HTMLInputElement | any>) => {
        setNewAnimal({ ...newAnimal, [prop]: event.target.value });
    };

    const handleEnterSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (CheckIsEnterPressed(event)) {
            handleSubmit(event)
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (!CheckIfAllObjectPropsAreFilled(newAnimal, ["id"])) {
            toast.error("Fill all required fields. The required fields have '*' in the end")
        } else {
            try {
                displayLoader();
                AnimalService.addAnimalToCollection(newAnimal).then(() => {
                    toast.success("Animal is added successfully")
                    history.push("/animals")
                    hideLoader();
                })
            } catch (error) {
                toast.error(error);
                hideLoader();
            }
        }
    };

    return (
        <form className="add-animal-form" noValidate autoComplete="off">
            <h2> Add animal </h2>
            <FormControl className="add-animal-field">
                <InputLabel>Type *</InputLabel>
                <Select
                    value={newAnimal.type}
                    name="type"
                    onChange={handleChange("type")}
                    required
                >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value={"dog"}>Dog</MenuItem>
                    <MenuItem value={"cat"}>Cat</MenuItem>
                    <MenuItem value={"ant"}>Ant</MenuItem>
                    <MenuItem value={"bat"}>Bat</MenuItem>
                    <MenuItem value={"spider"}>Spider</MenuItem>
                    <MenuItem value={"snake"}>Snake</MenuItem>
                    <MenuItem value={"bear"}>Bear</MenuItem>
                    <MenuItem value={"fish"}>Fish</MenuItem>
                    <MenuItem value={"frog"}>Frog</MenuItem>
                    <MenuItem value={"deer"}>Deer</MenuItem>
                    <MenuItem value={"horse"}>Horse</MenuItem>
                    <MenuItem value={"fox"}>Fox</MenuItem>
                    <MenuItem value={"insect"}>Insect</MenuItem>
                    <MenuItem value={"mouse"}>Mouse</MenuItem>
                    <MenuItem value={"pig"}>Pig</MenuItem>
                    <MenuItem value={"rabbit"}>Rabbit</MenuItem>
                    <MenuItem value={"bird"}>Bird</MenuItem>
                </Select>
            </FormControl>
            <FormControl className="add-animal-field">
                <InputLabel>Location * </InputLabel>
                <Select
                    value={newAnimal.currentLocation}
                    name="type"
                    onChange={handleChange("currentLocation")}
                    required
                >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value={"Plovdiv"}>Plovdiv</MenuItem>
                    <MenuItem value={"Varna"}>Varna</MenuItem>
                    <MenuItem value={"Sofia"}>Sofia</MenuItem>
                    <MenuItem value={"Burgas"}>Burgas</MenuItem>
                    <MenuItem value={"Smolyan"}>Smolyan</MenuItem>
                    <MenuItem value={"Pazardjik"}>Pazardjik</MenuItem>
                    <MenuItem value={"Montana"}>Montana</MenuItem>
                    <MenuItem value={"Sliven"}>Sliven</MenuItem>
                    <MenuItem value={"Yambol"}>Yambol</MenuItem>
                    <MenuItem value={"Vidin"}>Vidin</MenuItem>
                    <MenuItem value={"Ruse"}>Ruse</MenuItem>
                    <MenuItem value={"Haskovo"}>Haskovo</MenuItem>
                </Select>
            </FormControl>
            <TextField
                required
                label="Name"
                onChange={handleChange("name")}
                onKeyPress={handleEnterSubmit}
                className="add-animal-field"
            />
            <TextField
                required
                label="Age (years)"
                onChange={handleChange("age")}
                onKeyPress={handleEnterSubmit}
                className="add-animal-field"
                type="number"
            />
            <TextField
                required
                label="Weight (kg)"
                onChange={handleChange("weight")}
                onKeyPress={handleEnterSubmit}
                className="add-animal-field"
                type="number"
            />
            <FormControl className="add-animal-field">
                <InputLabel>Color *</InputLabel>
                <Select
                    value={newAnimal.color}
                    name="type"
                    onChange={handleChange("color")}
                    required
                >
                    <MenuItem value="">All</MenuItem>
                    <MenuItem value={"red"}>Red</MenuItem>
                    <MenuItem value={"blue"}>Blue</MenuItem>
                    <MenuItem value={"green"}>Green</MenuItem>
                    <MenuItem value={"yellow"}>Yellow</MenuItem>
                    <MenuItem value={"orange"}>Orange</MenuItem>
                    <MenuItem value={"brown"}>Brown</MenuItem>
                    <MenuItem value={"white"}>White</MenuItem>
                    <MenuItem value={"black"}>Black</MenuItem>
                    <MenuItem value={"other"}>Other</MenuItem>
                </Select>
            </FormControl>
            <TextField
                label="Image link"
                onChange={handleChange("image")}
                onKeyPress={handleEnterSubmit}
                className="add-animal-field"
                required
            />
            <TextField
                required
                label="Description"
                onChange={handleChange("description")}
                onKeyPress={handleEnterSubmit}
                multiline
            />
            <Button
                variant="contained"
                color="primary"
                className="add-animal-submit"
                // endIcon={<Icon>send</Icon>}
                onClick={handleSubmit}
            >
                Send
      </Button>
        </form>
    );
}
