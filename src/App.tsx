import React from 'react';
import { Route, Switch } from 'react-router-dom';
import AnimalCard from './components/animals/animal-card/AnimalCard';
import Animals from './components/animals/Animals';

function App() {
  return (
    <Switch>
      <Route path='/' component={Animals} exact /> 
      <Route path='/damn' component={AnimalCard} /> 
    </Switch>
  );
}

export default App;
