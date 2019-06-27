import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import styled from 'styled-components';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './App.css';


import {getSessionToken, logout, relativeRedirect} from './util';
import Signup from './components/Signup'
import Oauth from './components/Oauth'
import Snacks from './components/Snacks'
import SnackOverview from './components/SnackOverview'
import Requests from './components/Requests'
import Orders from './components/Orders'
import Profile from './components/Profile'
import popcorn from './images/popcorn.png';

class App extends React.Component {
  async componentDidMount() {
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
  goToProfile() {
    relativeRedirect('settings');
  }
  logout() {
    logout();
    relativeRedirect('signup');
  }
  goBack() {
    window.history.back();
  }
  renderNavBar() {
    if (!getSessionToken()) {
      return null;
    }
    const activeKey = window.location.pathname;

    return (
      <NavHolder>
        <Nav variant="pills" activeKey={activeKey} >
          <Popcorn src={popcorn} />
          <Nav.Item>
            <Nav.Link href="/snacks">Snacks</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/requests">Requests</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/orders">Orders</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/settings">Settings</Nav.Link>
          </Nav.Item>
        </Nav>
      </NavHolder>
    )
  }



  renderAccountButtons() {
    if (!getSessionToken()) {
      return null;
    }
    return (
      <LogoutContainer >
        <Button id="logout-button" variant="outline-danger" onClick={() => this.logout()}>Logout</Button >
      </LogoutContainer>
    )
  }
  render() {
    const redirectUrl = getSessionToken() ? '/snacks' : 'signup';
    return (
      <div className="App">
        <ToastContainer />
        <TopHolder>
          <LogoutAndBack>
            {this.renderAccountButtons()}
          </LogoutAndBack>
          {this.renderNavBar()}
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
              <Route path="/settings" component={Profile} />
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
  button {
    margin: 8px 10px;
  }
`;

const BackButtonContainer = styled.div`
  left: 3%;
  top: 3%;
  position: absolute;
`;



const Container = styled.div`
`;


const NavHolder = styled.div`
  margin: 10px;
  & .nav-item {
    margin-top: 8px;
  }
`;

const TopHolder = styled.div`

`;

const Popcorn = styled.img`
  width: 50px;
  height: 50px;
`;


const LogoutAndBack = styled.div`
  float: right
`;