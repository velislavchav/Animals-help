import { Route, Switch } from "react-router-dom";
import Animals from "./components/animals/list/Animals";
import Map from "./components/google-map/Map";
import Register from "./components/user/register/RegisterTabs";
import Login from "./components/user/login/Login";
import AnimalDetails from "./components/animals/details/AnimalDetails";
import AddAnimal from "./components/animals/add/AddAnimal";
import PrivateRoute from "./helpers/PrivateRoute"
import ShelterList from "./components/shelters/ShelterList";
import Home from "./components/home/Home";
// import AdoptionApplications from "./components/shelters/AdoptionApplications";

function App() {
  return (
    <main id="content">
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/map" component={Map} />
        <PrivateRoute path="/animals/add" component={AddAnimal} />
        <Route path="/shelters" component={ShelterList} />
        <Route path="/animals/:type/:id" component={AnimalDetails} />
        <Route path="/animals" component={Animals} exact/>
        <Route path="/user/register" component={Register} />
        <Route path="/user/login" component={Login} />
      </Switch>
    </main>
  );
}

export default App;
