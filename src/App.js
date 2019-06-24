import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import './App.css';

import { getSessionToken } from './util';
import Signup from './components/Signup'
import Oauth from './components/Oauth'
import Snacks from './components/Snacks'

function App() {
  const redirectUrl = getSessionToken() ? '/snacks' : 'signup';
  return (
    <div className="App">

      <Router>

        <Switch>
          <Route path="/oauth" component={Oauth} />
          <Route path="/snacks" component={Snacks} />
          <Route path="/signup" component={Signup} />
          <Redirect to={redirectUrl} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
