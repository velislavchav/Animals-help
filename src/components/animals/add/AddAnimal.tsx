import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useHistory } from "react-router";
import { IAnimal } from "../../../models/IAnimal";
import { toast } from "react-toastify";
import "./AddAnimal.scss";
import { Button, TextField } from "@material-ui/core";
import { AnimalService } from "../../../helpers/AnimalService";
import { CheckIsEnterPressed } from "../../../helpers/GeneralHelper";

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

    const handleEnterSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (CheckIsEnterPressed(event)) {
            handleSubmit(event)
        }
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        try {
            AnimalService.addAnimalToCollection(newAnimal).then(() => {
                toast.success("Animal is added")
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
                onKeyPress={handleEnterSubmit}
                className="add-animal-field"
            />
            <TextField
                label="Name"
                onChange={handleChange("name")}
                onKeyPress={handleEnterSubmit}
                className="add-animal-field"
            />
            <TextField
                label="Age"
                onChange={handleChange("age")}
                onKeyPress={handleEnterSubmit}
                className="add-animal-field"
            />
            <TextField
                label="Weight"
                onChange={handleChange("weight")}
                onKeyPress={handleEnterSubmit}
                className="add-animal-field"
            />
            <TextField
                label="Color"
                onChange={handleChange("color")}
                onKeyPress={handleEnterSubmit}
                className="add-animal-field"
            />
            <TextField
                label="Image link"
                onChange={handleChange("image")}
                onKeyPress={handleEnterSubmit}
                className="add-animal-field"
            />
            <TextField
                label="Location"
                onChange={handleChange("currentLocation")}
                onKeyPress={handleEnterSubmit}
                className="add-animal-field"
            />
            <TextField
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
