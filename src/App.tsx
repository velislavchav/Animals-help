import { Route, Switch } from "react-router-dom";
import Animals from "./components/animals/Animals";
import InjuredAnimals from "./components/animals/animals-injured/InjuredAnimals";
import Register from "./components/user/register/RegisterTabs";
import Login from "./components/user/login/Login";


function App() {
  return (
    <main id="content">
      <Switch>
        <Route path="/" component={Animals} exact />
        <Route path="/animals" component={Animals} />
        <Route path="/injured-animal" component={InjuredAnimals}></Route>
        <Route path="/user/register" component={Register} />
        <Route path="/user/login" component={Login} />

      </Switch>
    </main>
  );
}

export default App;
