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

require('style!css!foundation-sites/dist/css/foundation.min.css');
require('style!css!./css/style.css');
$(document).ready(() => $(document).foundation());

var username = (state = null, action) => {
  switch (action.type) {
    case 'LOG_IN':
      return action.username;
    case 'LOG_OUT':
      return null;
    default:
      return state;
  }

}

var notification = (state = null, action) => {
  switch (action.type) {
    case 'SHOW_NOTIFICATION':
      return action.txt;
    case 'HIDE_NOTIFICATION':
      return null;
    default:
      return state;
  }
}

var reducer = redux.combineReducers({ username, notification });
var store = redux.createStore(reducer);

var requireLogin = (nextState, replace, next) => {
  if (store.getState().username == null) {
    replace('/');
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
      </Router>
    </Router>
  </Provider>,
  document.getElementById('root')
);
