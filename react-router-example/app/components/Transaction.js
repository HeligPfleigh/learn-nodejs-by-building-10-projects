import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import UserInfo from 'UserInfo';

class Transaction extends React.Component{

  render(){
    var {listUser} = this.props;
    var xhtml = listUser != null ? <div>{listUser.map((e, i)=>
      <UserInfo key={i} index={i} userinfo={e}>{e.username}</UserInfo>)}</div>:f=>f;
    return (
      <div>
        <h1 className='text-center page-title'>Transaction</h1>
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

