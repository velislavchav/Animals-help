import { Button, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAuth } from "../../../contexts/AuthContext";
import { EmailErrorMessage, PasswordErrorMessage } from "../../../helpers/ValidateFormFields";
import { INormalUser } from "../../../models/INormalUser";
import { AuthService } from "../../../helpers/AuthService";

export default function NormalUserRegisterForm() {
  const [repassword, setRepassword] = useState("");
  const [emailErrorText, setEmailErrorText] = useState("");
  const [passwordErrorText, setPasswordErrorText] = useState("");
  const { signup } = useAuth();
  const [normalUser, setNormalUser] = useState<INormalUser>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    profileImageUrl: "",
  });

  const handleChange = (prop: keyof INormalUser) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setNormalUser({ ...normalUser, [prop]: event.target.value });
    if (prop === "email")
      setEmailErrorText(EmailErrorMessage(event.target.value));
    if (prop === "password")
      setPasswordErrorText(PasswordErrorMessage(event.target.value, repassword));
  };

  const checkRepassword = (e: any) => {
    setRepassword(e.target.value)
    setPasswordErrorText(PasswordErrorMessage(normalUser.password, e.target.value));
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!passwordErrorText && !emailErrorText) {
      try {
        await signup(normalUser.email, normalUser.password);
        await AuthService.addNormalUserToCollection(normalUser)
        toast.success("Successfully registered");
      } catch (error) {
        toast.error(error?.message);
      }
    }
  };

  return (
    <form className="register-form" noValidate autoComplete="off">
      <TextField
        label="Email"
        value={normalUser.email}
        onChange={handleChange("email")}
        helperText={emailErrorText}
        error={!!emailErrorText}
      />
      <TextField
        label="First name"
        value={normalUser.firstName}
        onChange={handleChange("firstName")}
      />
      <TextField
        label="Last name"
        value={normalUser.lastName}
        onChange={handleChange("lastName")}
      />
      <TextField
        type="password"
        label="Password"
        value={normalUser.password}
        onChange={handleChange("password")}
        helperText={passwordErrorText}
        error={!!passwordErrorText}
      />
      <TextField
        type="password"
        label="Re-password"
        value={repassword}
        onChange={checkRepassword}
      />
      {/* endIcon={<Icon>send</Icon>} */}
      <Button variant="contained" color="primary" onClick={handleSubmit}> Send </Button>
    </form>
  );
}
