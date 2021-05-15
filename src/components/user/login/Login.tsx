import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useHistory } from "react-router";
import { EmailErrorMessage } from "../../../helpers/ValidateFormFields";
import { ILogin } from "../../../models/ILogin";
import { toast } from "react-toastify";
import "./Login.scss";
import { Button, TextField } from "@material-ui/core";
import { CheckIsEnterPressed } from "../../../helpers/GeneralHelper";

export default function Login() {
  const { login, loginWithGoogle, loginWithFacebook } = useAuth();
  const history = useHistory();
  const [emailErrorText, setEmailErrorText] = useState("");
  // const [showPassword, setShowPassword] = useState(false);
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

  const handleGoogleSignIn = (e: any) => {
    e.preventDefault();
    try {
      loginWithGoogle().then((error: string) => {
        if(!error) {
          toast.success("Successfully logged in");
          history.push("/");
        }
      });
    } catch (error) {
      toast.error(error?.message);
    }
  }

  const handleFacebookSignIn = (e: any) => {
    e.preventDefault();
    try {
      loginWithFacebook().then((error: string) => {
        if(!error) {
          toast.success("Successfully logged in");
          history.push("/");
        }
      });
    } catch (error) {
      toast.error(error?.message);
    }
  }

  return (
    <section className="login">
      <form className="form" noValidate autoComplete="off">
        <h2> Login </h2>
        <span className="register-redirect" onClick={() => history.push("/user/register")}> You don't have account already? Sign up here from here. </span>
        <TextField
          label="Email"
          onChange={handleChange("email")}
          onKeyPress={handleEnterSubmit}
          helperText={emailErrorText}
          error={!!emailErrorText}
        />
        <TextField
          label="Password"
          type="password"
          onChange={handleChange("password")}
          onKeyPress={handleEnterSubmit}
        />
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
      <div className="third-party-logins" >
        <img src="/icons/google.png" alt="Google login" title="Sign in with Google account" onClick={handleGoogleSignIn} />
        <img src="/icons/facebook.png" alt="Facebook login" title="Sign in with Facebook account" onClick={handleFacebookSignIn} />
      </div>
    </section>
  );
}
