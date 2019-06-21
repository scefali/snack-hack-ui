import React from 'react';
import queryString from 'query-string'

import {finishOauth} from '../api';


class Signup extends React.Component {
    async componentDidMount() {
        const { code } = queryString.parse(window.location.search);
        const data = await finishOauth(code);
        //TODO: Set cookie and redirect
    }
    render() {
        return (
            <div>
                Oauth
            </div>
        )
    }
}



export default Signup;
