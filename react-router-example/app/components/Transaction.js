import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import UserInfo from 'UserInfo';

class Transaction extends React.Component{

  render(){
    var {listUser} = this.props;
    var xhtml = listUser != null ? <div>{listUser.map(function(e, i){
      return <UserInfo key={i} index={i}/>
    })}</div>:f=>f;
    return (
      <div className='text-center page-title'>
        <h1>Transaction</h1>
        {xhtml}
      </div>
    );
  }

  componentDidMount()
  {
    var {dispatch} = this.props;
    axios.get('/getListAccount')
    .then( ({data}) => {
      dispatch({
        type: 'INIT_LIST',
        mang: data
      });
    })
    .catch(err => console.log(err));
  }
}

module.exports = connect(function(state){
  return {listUser: state.listUser}
})(Transaction);

