var redux = require('redux');

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
  
  var listUser = (state = [{username: null, password: null, email: null}], action) => {
    switch(action.type){
      case 'INIT_LIST':
        return action.mang;
      case 'ADD_USER':
        return [...state, action.item];
      case 'REMOVE_USER':
        return state.filter((e,i) => i != action.index)
      default:
        return state;
    }
  }

var reducer = redux.combineReducers({username, notification, listUser});

module.exports = reducer;