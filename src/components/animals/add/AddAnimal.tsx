import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useHistory } from "react-router";
import { IAnimal } from "../../../models/IAnimal";
import { toast } from "react-toastify";
import "./AddAnimal.scss";
import { Button, TextField } from "@material-ui/core";
import { AnimalService } from "../../../helpers/AnimalService";

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
    });

    const handleChange = (prop: keyof IAnimal) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewAnimal({ ...newAnimal, [prop]: event.target.value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            AnimalService.addAnimalToCollection(newAnimal).then((docRef: any) => {
                toast.success("Animal is added with ID: ", docRef.id)
                history.push("/animals")
            })
        } catch (error) {
            toast.error(error);
        }
    };

    return (
        <form className="add-animal-form" noValidate autoComplete="off">
            <h2> Add animal </h2>
            <TextField
                label="Type"
                onChange={handleChange("type")}
                className="add-animal-field"
            />
            <TextField
                label="Name"
                onChange={handleChange("name")}
                className="add-animal-field"
            />
            <TextField
                label="Age"
                onChange={handleChange("age")}
                className="add-animal-field"
            />
             <TextField
                label="Weight"
                onChange={handleChange("weight")}
                className="add-animal-field"
            />
            <TextField
                label="Color"
                onChange={handleChange("color")}
                className="add-animal-field"
            />
            <TextField
                label="Image link"
                onChange={handleChange("image")}
                className="add-animal-field"
            />
            <TextField
                label="Location"
                onChange={handleChange("currentLocation")}
                className="add-animal-field"
            />
            <TextField
                label="Description"
                onChange={handleChange("description")}
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
