import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

var redux = require('redux');
var { Provider } = require('react-redux');

import HomePage from 'HomePage';
import Nav from 'Nav';
import Account from 'Account';
import Transaction from 'Transaction';
import Main from 'Main';
import SignUp from 'SignUp';

require('style!css!foundation-sites/dist/css/foundation.min.css');
require('style!css!./css/style.css');
$(document).ready(() => $(document).foundation());

var reducer = require('reducer');
var store = redux.createStore(reducer, redux.compose(
  window.devToolsExtension?window.devToolsExtension():f=>f));

var requireLogin = (nextState, replace, next) => {
  if (store.getState().username == null) {
    replace('/account');
  }
  next();
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Router path='/' component={Main}>
        <IndexRoute component={HomePage} />
        <Route path="account" component={Account} />
        <Route path="transaction" component={Transaction} onEnter={requireLogin} />
        <Route path="signup" component={SignUp}/>
      </Router>
    </Router>
  </Provider>,
  document.getElementById('root')
);
