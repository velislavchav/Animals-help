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
import { displayLoader, hideLoader, IsTheUserHasAccess } from '../../helpers/GeneralHelper';
import { useState } from 'react';

export default function Navigation() {
    const { logout, currentUser, currentUserAdditionalData, removeCurrentUserAdditionalDataLocally } = useAuth();
    const history = useHistory();
    const [displayMobileMenu, setDisplayMobileMenu] = useState(false);

    const handleLogout = async () => {
        try {
            displayLoader();
            await removeCurrentUserAdditionalDataLocally();
            await logout();
            toast.success("Successfully logged out");
            history.push("/");
            hideLoader();
        } catch {
            toast.error("Something went wrong! Please, refresh the page and try again!");
            hideLoader();
        }
    }

    const displayMobileNavigation = () => {
        setDisplayMobileMenu(!displayMobileMenu);
    }

    return (
        <AppBar id="main-navigation">
            <Toolbar>
                <IconButton edge="start" className="menu-button" color="inherit" aria-label="menu" onClick={displayMobileNavigation} >
                    <MenuIcon />
                </IconButton>
                <img src="/logo.png" className="navigation-logo" alt="Help animals logo" title="Help animals" onClick={() => history.push("/")}/>
                <Typography variant="h6" component="h1" className="title-navigation" onClick={() => history.push("/")}>
                    Help <br /> animals
                </Typography>
                <nav id="desktop-navigation">
                    <Button color="inherit" component={Link} to={'/map'}> Map </Button>
                    <Button color="inherit" component={Link} to={'/animals'}> Animals </Button>
                    <Button color="inherit" component={Link} to={'/shelters'}> Shelters </Button>
                    {currentUser?.email ? "" : <Button color="inherit" component={Link} to={'/user/register'}> Register </Button>}
                    {currentUser?.email ? "" : <Button color="inherit" component={Link} to={'/user/login'}> Login </Button>}
                    {IsTheUserHasAccess(currentUserAdditionalData, ["shelter"]) ? <Button color="inherit" component={Link} to={'/animals/add'}> Add animal </Button> : ""}
                    {currentUser?.email ? <Button color="inherit" onClick={handleLogout}> Logout </Button> : ""}
                </nav>
            </Toolbar>
            <nav id="mobile-navigation" className={displayMobileMenu ? "" : "disp-none"} onClick={displayMobileNavigation}>
                <Button color="inherit" component={Link} to={'/'}> Home </Button>
                <Button color="inherit" component={Link} to={'/map'}> Map </Button>
                <Button color="inherit" component={Link} to={'/animals'}> Animals </Button>
                <Button color="inherit" component={Link} to={'/shelters'}> Shelters </Button>
                {currentUser?.email ? "" : <Button color="inherit" component={Link} to={'/user/register'}> Register </Button>}
                {currentUser?.email ? "" : <Button color="inherit" component={Link} to={'/user/login'}> Login </Button>}
                {IsTheUserHasAccess(currentUserAdditionalData, ["shelter"]) ? <Button color="inherit" component={Link} to={'/animals/add'}> Add animal </Button> : ""}
                {currentUser?.email ? <Button color="inherit" onClick={handleLogout}> Logout </Button> : ""}
            </nav>
        </AppBar>
    );
}

