import React from 'react';
import queryString from 'query-string'

import {finishOauth} from '../api';
import * as util from '../util';


class Signup extends React.Component {
  state = {}
  async componentDidMount() {
    const {code, error} = queryString.parse(window.location.search);
    if (error) {
      return this.setState({error: 'You have an error'})
    }
    const {session_token, is_admin} = await finishOauth(code) || {};
    console.log('aoutah add', is_admin)
    sessionStorage.setItem('session_token', session_token);
    sessionStorage.setItem('is_admin', is_admin ? '1' : '0');
    util.relativeRedirect('snacks');
  }
  render() {
    const message = this.state.error || 'Please wait...';
    return (
      <div>
        {message}
      </div>
    )
  }
}



export default Signup;
