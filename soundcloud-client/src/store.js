import redux from 'redux';
import {createStore} from 'redux';

import rootReducer from './reducers/index';

export function configureStore() {
  return redux.createStore(rootReducer, redux.compose(
    window.devToolsExtension?window.devToolsExtension():f=>f));
}