import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../../contexts/AuthContext";
import { EmailErrorMessage, PasswordErrorMessage } from "../../../helpers/ValidateFormFields";
import { IShelter } from "../../../models/IShelter";
import { UserService } from "../../../helpers/services/UserService";
import { useHistory } from "react-router";
import { CheckIfAllObjectPropsAreFilled, CheckIsEnterPressed, displayLoader, hideLoader } from "../../../helpers/GeneralHelper";

export default function ShelterRegisterForm() {
  const [repassword, setRepassword] = useState("");
  const [emailErrorText, setEmailErrorText] = useState("");
  const [passwordErrorText, setPasswordErrorText] = useState("");
  const { signup } = useAuth();
  const history = useHistory();
  const [shelter, setShelter] = useState<IShelter>({
    email: "",
    password: "",
    name: "",
    role: "shelter",
    address: "",
    vatNr: "",
    phone: "",
    imageUrl: ""
  });

  const handleChange = (prop: keyof IShelter) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setShelter({ ...shelter, [prop]: event.target.value });
    if (prop === "email")
      setEmailErrorText(EmailErrorMessage(event.target.value));
    if (prop === "password")
      setPasswordErrorText(PasswordErrorMessage(event.target.value, repassword));
  };

  const checkRepassword = (e: any) => {
    setRepassword(e.target.value)
    setPasswordErrorText(PasswordErrorMessage(shelter.password, e.target.value));
  }

  const handleEnterSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (CheckIsEnterPressed(event)) {
      handleSubmit(event)
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!passwordErrorText && !emailErrorText) {
      if (!CheckIfAllObjectPropsAreFilled(shelter, ["imageUrl", "description"])) {
        toast.error("Fill all required fields. The required fields have '*' in the end")
      } else {
        try {
          displayLoader();
          await signup(shelter.email, shelter.password);
          await UserService.addShelterToCollection(shelter);
          toast.success("Successfully registered");
          history.push("/");
          hideLoader();
        } catch (error) {
          toast.error(error?.message);
          hideLoader();
        }
      }
    }
  };

  return (
    <form className="register-form" noValidate autoComplete="off">
      <TextField
        required
        label="Email"
        value={shelter.email}
        onChange={handleChange("email")}
        onKeyPress={handleEnterSubmit}
        helperText={emailErrorText}
        error={!!emailErrorText}
      />
      <TextField
        required
        label="Name"
        value={shelter.name}
        onChange={handleChange("name")}
        onKeyPress={handleEnterSubmit}
      />
      <TextField
        required
        type="password"
        label="Password"
        value={shelter.password}
        onChange={handleChange("password")}
        onKeyPress={handleEnterSubmit}
        helperText={passwordErrorText}
        error={!!passwordErrorText}
      />
      <TextField
        required
        type="password"
        label="Re-password"
        value={repassword}
        onChange={checkRepassword}
        onKeyPress={handleEnterSubmit}
      />
      <TextField
        required
        label="Address (country, town, street, house)"
        value={shelter.address}
        onChange={handleChange("address")}
        onKeyPress={handleEnterSubmit}
      />
      <TextField
        required
        label="VAT Number"
        value={shelter.vatNr}
        onChange={handleChange("vatNr")}
        onKeyPress={handleEnterSubmit}
      />
      <TextField
        required
        label="Phone"
        value={shelter.phone}
        onChange={handleChange("phone")}
        onKeyPress={handleEnterSubmit}
      />
      <TextField
        label="Image url address"
        value={shelter.imageUrl}
        onChange={handleChange("imageUrl")}
        onKeyPress={handleEnterSubmit}
      />
      <TextField
        multiline
        label="Description"
        value={shelter.description}
        onChange={handleChange("description")}
      />
      {/* endIcon={<Icon>send</Icon>} */}
      <Button variant="contained" color="primary" onClick={handleSubmit}> Send </Button>
    </form>
  );
}
