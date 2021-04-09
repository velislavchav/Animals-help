import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Link, useHistory } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import { useAuth } from "../../contexts/AuthContext";


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
    const { logout, currentUser } = useAuth();
    const history = useHistory()  

    const handleLogout = async () => {
        try {
          await logout();
          history.push("/");
        } catch {
          // do something
        }
    }
    
    return (
        <AppBar position="fixed" className={classes.root}>
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" component={Link} to={'/'} >
                    <MenuIcon /> 
                </IconButton>
                <Typography variant="h6" component="h1" className={classes.title}>
                    HelPANimals
                </Typography>
                <Button color="inherit" className={classes.navigationMenuItem} component={Link} to={'/injured-animal'}> Injured animal </Button>
                <Button color="inherit" className={classes.navigationMenuItem} component={Link} to={'/animals'}> View animals </Button>
                { currentUser?.email ? "" : <Button color="inherit" className={classes.navigationMenuItem} component={Link} to={'/user/register'}> Register </Button> }
                { currentUser?.email ? "" : <Button color="inherit" className={classes.navigationMenuItem} component={Link} to={'/user/login'}> Login </Button> }
                { currentUser?.email ? <Button color="inherit" className={classes.navigationMenuItem} onClick={handleLogout}> Logout </Button> : "" }
            </Toolbar>
        </AppBar>
    );
}

