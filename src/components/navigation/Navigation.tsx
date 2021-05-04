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
import { IsTheUserHasAccess } from '../../helpers/GeneralHelper';
import { useState } from 'react';

export default function Navigation() {
    const { logout, currentUser } = useAuth();
    const history = useHistory();
    const [displayMobileMenu, setDisplayMobileMenu] = useState(false);

    const handleLogout = async () => {
        try {
            await logout();
            toast.success("Successfully logged out");
            history.push("/");
        } catch {
            toast.error("Something went wrong! Please, refresh the page and try again!");
        }
    }

    const displayMobileNavigation = () => {
        setDisplayMobileMenu(!displayMobileMenu);
    }

    return (
        <AppBar id="main-navigation">
            <Toolbar>
                <IconButton edge="start" className="menu-button" color="inherit" aria-label="menu" >
                    <MenuIcon onClick={displayMobileNavigation} />
                </IconButton>
                <Typography variant="h6" component="h1" className="title-navigation" onClick={() => history.push("/")}>
                    HelPANimals
                </Typography>
                <nav id="desktop-navigation">
                    <Button color="inherit" component={Link} to={'/'}> Map </Button>
                    <Button color="inherit" component={Link} to={'/animals'}> Animals </Button>
                    {currentUser?.email ? "" : <Button color="inherit" component={Link} to={'/user/register'}> Register </Button>}
                    {currentUser?.email ? "" : <Button color="inherit" component={Link} to={'/user/login'}> Login </Button>}
                    {IsTheUserHasAccess(currentUser, ["shelter"]) ? <Button color="inherit" component={Link} to={'/animals/add/' + currentUser.displayName}> Add animal </Button> : ""}
                    {currentUser?.email ? <Button color="inherit" onClick={handleLogout}> Logout </Button> : ""}
                </nav>
            </Toolbar>
            <nav id="mobile-navigation" className={displayMobileMenu ? "" : "disp-none"} onClick={displayMobileNavigation}>
                <Button color="inherit" component={Link} to={'/'}> Map </Button>
                <Button color="inherit" component={Link} to={'/animals'}> Animals </Button>
                {currentUser?.email ? "" : <Button color="inherit" component={Link} to={'/user/register'}> Register </Button>}
                {currentUser?.email ? "" : <Button color="inherit" component={Link} to={'/user/login'}> Login </Button>}
                {IsTheUserHasAccess(currentUser, ["shelter"]) ? <Button color="inherit" component={Link} to={'/animals/add/' + currentUser.displayName}> Add animal </Button> : ""}
                {currentUser?.email ? <Button color="inherit" onClick={handleLogout}> Logout </Button> : ""}
            </nav>
        </AppBar>
    );
}

