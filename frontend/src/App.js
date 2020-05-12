import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './components/Home';


function App() {
  return (
    <main>
    <Switch>
      <Route path='/access/:accessCode?' component={Home} />
    </Switch>
    </main>
  );
}

export default App;
