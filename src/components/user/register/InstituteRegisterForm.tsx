import { Button, createStyles, makeStyles, TextField, Theme } from "@material-ui/core";
import React, { useState } from "react";
import { FormCustomValidations } from "../../../helpers/ValidateFormFields";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: "97%",
        marginBottom: "25px",
      },
    },
    button: {
      margin: theme.spacing(1),
    },
  })
);

export default function InstituteRegisterForm() {
  const classes = useStyles();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepasword] = useState("");
  const [address, setAddress] = useState("");
  const [vat, setVat] = useState("");

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: string
  ) => {
    switch (type) {
      case "email":
          setEmail(event.target.value);
          break;
      case "username":
        setUsername(event.target.value);
        break;
      case "password":
        setPassword(event.target.value);
        break;
      case "repassword":
        setRepasword(event.target.value);
        break;
        case "address":
        setAddress(event.target.value);
        break;
        case "VAT":
          setVat(event.target.value);
          break;
      default:
        break;
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    FormCustomValidations.IsEmailValid(email);
    FormCustomValidations.ArePasswordsValid(password, repassword);
  }
  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField
        label="Email"
        value={email}
        onChange={(e) => handleChange(e, "email")}
      />
      <TextField label="Username" value={username} onChange={(e) => handleChange(e, "username")}/>
      <TextField label="Password" value={password} onChange={(e) => handleChange(e, "password")} />
      <TextField label="Re-password" value={repassword} onChange={(e) => handleChange(e, "repassword")} />
      <TextField label="Address" value={address} onChange={(e) => handleChange(e, "address")}/>
      <TextField label="VAT number" value={vat} onChange={(e) => handleChange(e, "VAT")}/>

      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        // endIcon={<Icon>send</Icon>}
        onClick={handleSubmit}
      >
         Send
      </Button>
    </form>
  );
}
