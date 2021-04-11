import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { Link, useHistory } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import { useAuth } from "../../contexts/AuthContext";
import { toast } from 'react-toastify';
import "./Navigation.scss";

export default function Navigation() {
    const { logout, currentUser } = useAuth();
    const history = useHistory()  

    const handleLogout = async () => {
        try {
          await logout();
          toast.success("Successfully logged out");
          history.push("/");
        } catch {
          toast.error("Something went wrong! Please, refresh the page and try again!");
        }
    }
    
    return (
        <AppBar id="main-navigation">
            <Toolbar component="nav">
                <IconButton edge="start" className="menu-button" color="inherit" aria-label="menu" component={Link} to={'/'} >
                    <MenuIcon /> 
                </IconButton>
                <Typography variant="h6" component="h1" className="title-navigation">
                    HelPANimals
                </Typography>
                {/* <Button color="inherit" component={Link} to={'/injured-animal'} className="ma"> Injured animal </Button> */}
                <Button color="inherit" component={Link} to={'/animals'}> View animals </Button>
                { currentUser?.email ? "" : <Button color="inherit" component={Link} to={'/user/register'}> Register </Button> }
                { currentUser?.email ? "" : <Button color="inherit" component={Link} to={'/user/login'}> Login </Button> }
                { currentUser?.email ? <Button color="inherit" onClick={handleLogout}> Logout </Button> : "" }
            </Toolbar>
        </AppBar>
    );
}

