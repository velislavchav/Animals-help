import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PetsIcon from '@material-ui/icons/Pets';
import { Link } from 'react-router-dom';
// import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    navigationMenuItem: {
        marginLeft: "20px",
        marginRight: "20px"
    }
  }),
);

export default function Navigation() {
    const classes = useStyles();
    return (
        <AppBar position="fixed" className={classes.root}>
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" component={Link} to={'/'} >
                    <PetsIcon />
                    {/* <MenuIcon /> */}
                </IconButton>
                <Typography variant="h6" component="h1" className={classes.title}>
                    News
                </Typography>
                <Button color="inherit" className={classes.navigationMenuItem} component={Link} to={'/damn'}> Injured animal </Button>
                <Button color="inherit" className={classes.navigationMenuItem}> View animals </Button>
                <Button color="inherit" className={classes.navigationMenuItem}> Login </Button>
            </Toolbar>
        </AppBar>
    );
}

