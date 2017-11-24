import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

class SignIn extends React.Component{

  handleSubmit(e){
    e.preventDefault();
    var {dispatch} = this.props;
    var {username, password} = this.refs;
    // if(username.value === "admin" && password.value === '123')
    //   dispatch({type:'LOG_IN', username: username.value});
    axios.post('/signIn', {username:username.value, password: password.value})
    .then(res=>{
      if(res.data === 'DANG_NHAP_THANH_CONG'){
        dispatch({type: 'SHOW_NOTIFICATION', txt: 'Log in successful!'})
        dispatch({type: 'LOG_IN', username: username.value});
      }
      else{
        dispatch({type: 'SHOW_NOTIFICATION', txt: 'Username or password is incorrect!'});
      }
    })
    .catch(err=>console.log(err));
  }

  render(){
    return (
      
      <div>
        <h1 className='text-center page-title'> Sign In</h1>
        <form className="log-in-form" onSubmit={this.handleSubmit.bind(this)}>
          <label><b>Username</b></label>
          <input type='text' placeholder='Username' ref='username'/>
          <label><b>Password</b></label>
          <input type='password' placeholder='Password' ref='password'/>
          <button type='submit' className='button expanded'>Sign In</button>
        </form>
        <div className='text-center page-title'>Come in first time?<a href="/#/signup"> Create an account</a>.</div>
      </div>
    )
  }
}

module.exports = connect()(SignIn);