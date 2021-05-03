import { Route, Switch } from "react-router-dom";
import Animals from "./components/animals/list/Animals";
import Map from "./components/google-map/Map";
import Register from "./components/user/register/RegisterTabs";
import Login from "./components/user/login/Login";
import AnimalDetails from "./components/animals/details/AnimalDetails";
import AddAnimal from "./components/animals/add/AddAnimal";
import PrivateRoute from "./helpers/PrivateRoute"

function App() {
  return (
    <main id="content">
      <Switch>
        <Route path="/" component={Map} exact />
        <PrivateRoute path="/animals/add/:shelterName" component={AddAnimal} />
        <Route path="/animals/:type/:id" component={AnimalDetails} />
        <Route path="/animals" component={Animals} exact/>
        <Route path="/user/register" component={Register} />
        <Route path="/user/login" component={Login} />
      </Switch>
    </main>
  );
}

export default App;
