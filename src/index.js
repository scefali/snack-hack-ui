import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import * as Sentry from '@sentry/browser';

const environment = window.location.host === 'snack-hack.herokuapp.com' ? 'PROD' : 'DEV'

Sentry.init({dsn: "https://567bb9decde04f83ae996485aeedf427@sentry.io/1492155", environment});


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
