import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';

import HomePage from 'HomePage';
import Nav from 'Nav';
import Account from 'Account';
import Transaction from 'Transaction';
import Main from 'Main';

ReactDOM.render(
  <Router history={hashHistory}>
    <Router path='/' component={Main}>
      <IndexRoute component={HomePage} />
      <Route path="account" component={Account} />
      <Route path="transaction" component={Transaction} />
    </Router>
  </Router>,
  document.getElementById('root')
);
