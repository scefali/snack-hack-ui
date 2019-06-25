import React from 'react';
import buildUrl from 'build-url';
import slackSignIn from '../images/sign_in_with_slack.png';
import styled from 'styled-components';


import {redirect_uri} from '../api';


class Signup extends React.Component {
    signIn() {
        let url = buildUrl('https://slack.com', {
            path: 'oauth/authorize',
            queryParams: {
                client_id: '2169437334.672763992981',
                scope: 'identity.basic identity.avatar',
                redirect_uri
            }
        });
        window.location.replace(url);
    }
    render() {
        return (
            <Container>
                <LoginHeader>Snack Hack Login</LoginHeader>
                <LoginImage onClick={() => this.signIn()} src={slackSignIn} />
            </Container>
        )
    }
}



const LoginImage = styled.img`
    cursor: pointer;
    width: 200px;
`;

const LoginHeader = styled.h2`
    padding: 15px;
    color: #2f73bd;
`;

const Container = styled.div`
    max-width: 1200px;
    width: 100%;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
    margin-top: 50px;
`;


export default Signup;
