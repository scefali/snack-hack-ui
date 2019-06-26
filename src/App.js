import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import './App.css';

import {getSessionToken, logout, relativeRedirect, isAdmin} from './util';
import Signup from './components/Signup'
import Oauth from './components/Oauth'
import Snacks from './components/Snacks'
import SnackOverview from './components/SnackOverview'
import Requests from './components/Requests'
import Orders from './components/Orders'

class App extends React.Component {
  componentDidMount() {
    //redirect if not on https
    if (window.location.hostname !== 'localhost' && window.location.protocol === 'http:') {
      window.location = `https://${window.location.hostname}`;
    }

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
  goBack() {
    window.history.back();
  }
  renderAdminNavBar() {
    if (!getSessionToken() || !isAdmin()) {
      return null;
    }
    return (
      <NavHolder>
        <Nav variant="pills" >
          <Nav.Item>
            <Nav.Link href="/snacks">Snacks</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/requests">Requests</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/orders">Orders</Nav.Link>
          </Nav.Item>
        </Nav>
      </NavHolder>
    )
  }
  renderBackButton() {
    if (['/oauth', '/signup', '/snacks'].includes(window.location.pathname)) {
      return null;
    }
    return (
      <BackButtonContainer >
        <Button id="back-button" variant="outline-primary" onClick={() => this.goBack()}>Back</Button >
      </BackButtonContainer>
    )
  }

  renderLogout() {
    if (!getSessionToken()) {
      return null;
    }
    return (
      <LogoutContainer >
        <Button id="logout-button" variant="outline-primary" onClick={() => this.logout()}>Logout</Button >
      </LogoutContainer>
    )
  }
  render() {
    const redirectUrl = getSessionToken() ? '/snacks' : 'signup';
    return (
      <div className="App">
        <TopHolder>
          <LogoutAndBack>
            {this.renderLogout()}
            {this.renderBackButton()}
          </LogoutAndBack>
          {this.renderAdminNavBar()}
        </TopHolder>
        <Container>
          <Router>
            <Switch>
              <Route path="/oauth" component={Oauth} />
              <Route path="/snacks/:snackId" component={SnackOverview} />
              <Route path="/snacks" component={Snacks} />
              <Route path="/signup" component={Signup} />
              <Route path="/requests" component={Requests} />
              <Route path="/orders" component={Orders} />
              <Redirect to={redirectUrl} />
            </Switch>
          </Router>
        </Container>
      </div>
    );
  }
}

export default App;


const LogoutContainer = styled.div`
  right: 3%;
  top: 3%;
  position: absolute;
`;

const BackButtonContainer = styled.div`
  left: 3%;
  top: 3%;
  position: absolute;
`;



const Container = styled.div`
`;


const NavHolder = styled.div`
`;

const TopHolder = styled.div`
  display: inline-flex;
`;


const LogoutAndBack = styled.div``;