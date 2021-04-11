import { Route, Switch } from "react-router-dom";
import Animals from "./components/animals/Animals";
import InjuredAnimals from "./components/animals/animals-injured/InjuredAnimals";
import Register from "./components/user/register/RegisterTabs";
import Login from "./components/user/login/Login";
import AnimalDetails from "./components/animals/animal-details/AnimalDetails";
// import PrivateRoute from "./helpers/PrivateRoute"

function App() {
  return (
    <main id="content">
      <Switch>
        <Route path="/" component={Animals} exact />
        <Route path="/animals/:type/:id" component={AnimalDetails} />
        <Route path="/animals" component={Animals} exact/>
        {/* <PrivateRoute path="/animals/dog/2" component={AnimalDetails} /> */}
        <Route path="/injured-animal" component={InjuredAnimals}></Route>
        <Route path="/user/register" component={Register} />
        <Route path="/user/login" component={Login} />
      </Switch>
    </main>
  );
}

export default App;
