import React from 'react';
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import buildUrl from 'build-url';


import {redirect_uri} from '../api';


class Signup extends React.Component {
    signIn() {
        let url = buildUrl('https://slack.com', {
            path: 'oauth/authorize',
            queryParams: {
                client_id: '2169437334.672763992981',
                scope: 'chat:write:bot',
                redirect_uri
            }
        });
        console.log('oauth url', url)
        window.location.replace(url);
    }
    render() {
        return (
            <Container>
                <Button onClick={() => this.signIn()} variant="primary" size="lg" >Sign In</Button>
            </Container>
        )
    }
}



export default Signup;
