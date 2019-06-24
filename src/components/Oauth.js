import React from 'react';
import queryString from 'query-string'

import {finishOauth} from '../api';


class Signup extends React.Component {
    state = {}
    async componentDidMount() {
        const {code, error} = queryString.parse(window.location.search);
        if (error) {
            return this.setState({error: 'You have an error'})
        }
        const { session_token } = await finishOauth(code) || {};
        sessionStorage.setItem('session_token', session_token);
        window.location.replace(`${window.location.origin}/products`)
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
