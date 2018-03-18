import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, hashHistory } from 'react-router';
import routes from './route.js'

import App from './containers/App.js';
ReactDOM.render((
    <Router history={hashHistory} routes={routes}>
    </Router>
  ), document.getElementById('app')
);
