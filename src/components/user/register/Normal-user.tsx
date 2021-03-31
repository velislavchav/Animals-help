import { createStyles, makeStyles, TextField, Theme } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(1),
        // margin: "auto",
        width: "97%",
      },
    },
  })
);

export default function NormalUserForm() {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <TextField label="Username" />
      <TextField label="Password" />
      <TextField label="Re-password" />
    </form>
  );
}
