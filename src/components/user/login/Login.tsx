import React from "react";
import clsx from "clsx";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import { Button, TextField } from "@material-ui/core";
import { FormCustomValidations } from "../../../helpers/ValidateFormFields";
import { useAuth } from "../../../contexts/AuthContext";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& .MuiTextField-root": {
        margin: theme.spacing(1),
        width: "97%",
        marginBottom: "35px",
      },
      flexGrow: 1,
      maxWidth: "600px",
    },
    titleLogin: {
      textAlign: "center",
    },
    margin: {
      margin: theme.spacing(1),
    },
    withoutLabel: {
      marginTop: theme.spacing(3),
    },
    textField: {
      margin: theme.spacing(1),
      width: "97%",
      marginBottom: "35px",
    },
    button: {
      margin: theme.spacing(1),
      width: "97%",
    },
  })
);

interface State {
  email: string;
  password: string;
  showPassword: boolean;
}

export default function InputAdornments() {
  const classes = useStyles();
  const [values, setValues] = React.useState<State>({
    email: "",
    password: "",
    showPassword: false,
  });
  const { login } = useAuth();

  const handleChange = (prop: keyof State) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({ ...values, showPassword: !values.showPassword });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (FormCustomValidations.IsEmailValid(values.email)) {
      login(values.email, values.password);
    }
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <h2 className={classes.titleLogin}> Login </h2>
      <TextField label="Email" onChange={handleChange("email")} />
      <FormControl className={clsx(classes.margin, classes.textField)}>
        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
        <Input
          id="standard-adornment-password"
          type={values.showPassword ? "text" : "password"}
          value={values.password}
          onChange={handleChange("password")}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
              >
                {values.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
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
