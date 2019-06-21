import React from 'react';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import './App.css';

import Signup from './components/Signup'
import Oauth from './components/Oauth'

function App() {
  return (
    <div className="App">

      <Router>

        <Switch>
          <Route path="/oauth" component={Oauth} />
          <Route component={Signup} />

        </Switch>
      </Router>
    </div>
  );
}

export default App;
