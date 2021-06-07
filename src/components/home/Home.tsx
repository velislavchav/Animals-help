import { Button } from "@material-ui/core"
import { useHistory } from "react-router";
import "./Home.scss"
import PlaceIcon from '@material-ui/icons/Place';
import AccessibilityIcon from '@material-ui/icons/Accessibility';
import DoneAllIcon from '@material-ui/icons/DoneAll';
import { displayLoader, hideLoader } from "../../helpers/GeneralHelper";

export default function Home() {
    const history = useHistory();

    const navigateToGoogleMap = () => {
        displayLoader();
        history.push("/map");
        hideLoader();
    }

    return (
        <>
            <section id="home-page">
                <article className="home-page-image-left-text">
                    <h2>Saving Animals <br /> Changing Live</h2>
                    <span className="animal-quote"> “Having respect for animals makes us better humans.” – Jane Goodall </span>
                    <Button color="primary" variant="contained" className="go-to-map-button" onClick={navigateToGoogleMap}> Go to map </Button>
                </article>
            </section>
            <section id="home-page-advantages">
                <h3>Advantages of our application</h3>
                <article className="advantage-container">
                    <PlaceIcon fontSize="large"></PlaceIcon>
                    <h4> Add a signal with the current location of the animal </h4>
                    <p> Add a signal directly on the map with different types of signals (lost, injured or both). This signal helps the institutions and others people finding the animal as soon as possible.</p>
                </article>
                <article className="advantage-container">
                    <DoneAllIcon fontSize="large"></DoneAllIcon>
                    <h4> Helps institutions, shelters and animal volunteers </h4>
                    <p> This application helps institutions and shelters to do their job easier, faster and in one place. Also, it helps owners of animals to found their missing animal or just people who care about animal's condition. </p>
                </article>
                <article className="advantage-container">
                    <AccessibilityIcon fontSize="large"></AccessibilityIcon>
                    <h4> The application is completely free for using </h4>
                    <p> The aim of this application is to help animals to find a better life. This means that the user using this application will NOT be charged for any activities in the application. </p>
                </article>
            </section>
        </>
    );
}
