import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useHistory } from "react-router";
import { EmailErrorMessage } from "../../../helpers/ValidateFormFields";
import { ILogin } from "../../../models/ILogin";
import { toast } from "react-toastify";
import "./Login.scss";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Button, TextField } from "@material-ui/core";
import { CheckIsEnterPressed } from "../../../helpers/GeneralHelper";

export default function Login() {
  const { login } = useAuth();
  const history = useHistory();
  const [emailErrorText, setEmailErrorText] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [values, setValues] = useState<ILogin>({
    email: "",
    password: "",
  });

  const handleChange = (prop: keyof ILogin) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value });
    if (prop === "email")
      setEmailErrorText(EmailErrorMessage(event.target.value));
  };

  const handleEnterSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (CheckIsEnterPressed(event)) {
      handleSubmit(event)
    }
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!emailErrorText) {
      try {
        await login(values.email, values.password);
        toast.success("Successfully logged in");
        history.push("/");
      } catch (error) {
        toast.error(error?.message);
      }
    }
  };

  return (
    <form className="login-form" noValidate autoComplete="off">
      <h2> Login </h2>
      <TextField
        label="Email"
        onChange={handleChange("email")}
        onKeyPress={handleEnterSubmit}
        helperText={emailErrorText}
        error={!!emailErrorText}
      />
      <FormControl className="login-password">
        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
        <Input
          id="standard-adornment-password"
          type={showPassword ? "text" : "password"}
          value={values.password}
          onChange={handleChange("password")}
          onKeyPress={handleEnterSubmit}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
              > {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <Button
        variant="contained"
        color="primary"
        className="login-submit"
        // endIcon={<Icon>send</Icon>}
        onClick={handleSubmit}
      >
        Send
      </Button>
    </form>
  );
}
