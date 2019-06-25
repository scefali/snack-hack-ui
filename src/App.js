import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import './App.css';

import {getSessionToken, logout, relativeRedirect} from './util';
import Signup from './components/Signup'
import Oauth from './components/Oauth'
import Snacks from './components/Snacks'
import SnackOverview from './components/SnackOverview'

class App extends React.Component {
  componentDidMount() {
    //redirect if not logged in on a product page
    if (!['/oauth', '/signup'].includes(window.location.pathname)) {
      if (!getSessionToken()) {
        relativeRedirect('signup');
      }
    }
  }
  logout() {
    logout();
    relativeRedirect('signup');
  }
  renderLogout() {
    if (!getSessionToken()) {
      return null;
    }
    return (
      <LogoutContainer >
        <Button variant="outline-primary" onClick={() => this.logout()}>Logout</Button >
      </LogoutContainer>
    )
  }
  render() {
    const redirectUrl = getSessionToken() ? '/snacks' : 'signup';
    return (
      <div className="App">
        {this.renderLogout()}
        <Router>
          <Switch>
            <Route path="/oauth" component={Oauth} />
            <Route path="/snacks/:snackId" component={SnackOverview} />
            <Route path="/snacks" component={Snacks} />
            <Route path="/signup" component={Signup} />
            <Redirect to={redirectUrl} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;


const LogoutContainer = styled.div`
  float: right;
  margin-right: 100px;
`;

const LogoutButton = styled.button`

`;