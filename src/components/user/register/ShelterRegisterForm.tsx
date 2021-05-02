import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../../contexts/AuthContext";
import { EmailErrorMessage, PasswordErrorMessage } from "../../../helpers/ValidateFormFields";
import { IShelter } from "../../../models/IShelter";
import { AuthService } from "../../../helpers/AuthService";
import { useHistory } from "react-router";
import { CheckIsEnterPressed } from "../../../helpers/GeneralHelper";

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
    profileImageUrl: "",
    role: "shelter",
    address: "",
    vatNr: ""
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
      try {
        await signup(shelter.email, shelter.password);
        await AuthService.addShelterToCollection(shelter);
        toast.success("Successfully registered");
        history.push("/");
      } catch (error) {
        toast.error(error?.message);
      }
    }
  };

  return (
    <form className="register-form" noValidate autoComplete="off">
      <TextField
        label="Email"
        value={shelter.email}
        onChange={handleChange("email")}
        onKeyPress={handleEnterSubmit}
        helperText={emailErrorText}
        error={!!emailErrorText}
      />
      <TextField
        label="Name"
        value={shelter.name}
        onChange={handleChange("name")}
        onKeyPress={handleEnterSubmit}
      />
      <TextField
        type="password"
        label="Password"
        value={shelter.password}
        onChange={handleChange("password")}
        onKeyPress={handleEnterSubmit}
        helperText={passwordErrorText}
        error={!!passwordErrorText}
      />
      <TextField
        type="password"
        label="Re-password"
        value={repassword}
        onChange={checkRepassword}
        onKeyPress={handleEnterSubmit}
      />
      <TextField
        label="Address"
        value={shelter.address}
        onChange={handleChange("address")}
        onKeyPress={handleEnterSubmit}
      />
      <TextField
        label="VAT Number"
        value={shelter.vatNr}
        onChange={handleChange("vatNr")}
        onKeyPress={handleEnterSubmit}
      />
      {/* endIcon={<Icon>send</Icon>} */}
      <Button variant="contained" color="primary" onClick={handleSubmit}> Send </Button>
    </form>
  );
}
