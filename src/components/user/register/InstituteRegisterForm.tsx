import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../../contexts/AuthContext";
import { EmailErrorMessage, PasswordErrorMessage } from "../../../helpers/ValidateFormFields";
import { UserService } from "../../../helpers/services/UserService";
import { useHistory } from "react-router";
import { CheckIfAllObjectPropsAreFilled, CheckIsEnterPressed } from "../../../helpers/GeneralHelper";
import { IInstitute } from "../../../models/IInstitute";

export default function InstituteRegisterForm() {
  const [repassword, setRepassword] = useState("");
  const [emailErrorText, setEmailErrorText] = useState("");
  const [passwordErrorText, setPasswordErrorText] = useState("");
  const { signup } = useAuth();
  const history = useHistory();
  const [institution, setInstitution] = useState<IInstitute>({
    email: "",
    password: "",
    name: "",
    role: "institution",
    address: "",
    vatNr: "",
    phone: "",
    imageUrl: ""
  });

  const handleChange = (prop: keyof IInstitute) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setInstitution({ ...institution, [prop]: event.target.value });
    if (prop === "email")
      setEmailErrorText(EmailErrorMessage(event.target.value));
    if (prop === "password")
      setPasswordErrorText(PasswordErrorMessage(event.target.value, repassword));
  };

  const checkRepassword = (e: any) => {
    setRepassword(e.target.value)
    setPasswordErrorText(PasswordErrorMessage(institution.password, e.target.value));
  }

  const handleEnterSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (CheckIsEnterPressed(event)) {
      handleSubmit(event)
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!passwordErrorText && !emailErrorText) {
      if (!CheckIfAllObjectPropsAreFilled(institution, ["imageUrl"])) {
        toast.error("Fill all required fields. The required fields have '*' in the end")
      } else {
        try {
          await signup(institution.email, institution.password);
          await UserService.addInstitutionToCollection(institution);
          toast.success("Successfully registered");
          history.push("/");
        } catch (error) {
          toast.error(error?.message);
        }
      }
    }
  };

  return (
    <form className="register-form" noValidate autoComplete="off">
      <TextField
        required
        label="Email"
        value={institution.email}
        onChange={handleChange("email")}
        onKeyPress={handleEnterSubmit}
        helperText={emailErrorText}
        error={!!emailErrorText}
      />
      <TextField
        required
        label="Name"
        value={institution.name}
        onChange={handleChange("name")}
        onKeyPress={handleEnterSubmit}
      />
      <TextField
        required
        type="password"
        label="Password"
        value={institution.password}
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
        label="Address (country, town, street, house number)"
        value={institution.address}
        onChange={handleChange("address")}
        onKeyPress={handleEnterSubmit}
      />
      <TextField
        required
        label="VAT Number"
        value={institution.vatNr}
        onChange={handleChange("vatNr")}
        onKeyPress={handleEnterSubmit}
      />
      <TextField
        required
        label="Phone"
        value={institution.phone}
        onChange={handleChange("phone")}
        onKeyPress={handleEnterSubmit}
      />
      <TextField
        label="Image url address"
        value={institution.imageUrl}
        onChange={handleChange("imageUrl")}
        onKeyPress={handleEnterSubmit}
      />
      {/* endIcon={<Icon>send</Icon>} */}
      <Button variant="contained" color="primary" onClick={handleSubmit}> Send </Button>
    </form>
  );
}
