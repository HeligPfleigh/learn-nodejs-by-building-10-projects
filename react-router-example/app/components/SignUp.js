import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

class SignUp extends React.Component{
    handleSignUp(e){
        e.preventDefault();
        var {dispatch} = this.props;
        var {username, email, password} = this.refs;
        // tttodo handle when signup successfull
        axios.post('/signUp', {username: username.value, email: email.value, password: password.value})
        .then(res=>{
          if(res.data == 'TRUNG_USER')
            dispatch({type: 'SHOW_NOTIFICATION', txt: 'Username hoặc email đã được sử dụng!'});
          else{
              
          }  
        })
        .catch(err=>console.log(err));
    }

    render(){
        return (
            <div>
                <h1 className='text-center page-title'> Sign Up</h1>
                <form onSubmit={this.handleSignUp.bind(this)}>
                    <label>Username</label>
                    <input type='text' placeholder='Username' ref='username' />
                    <label>Email</label>
                    <input type='email' placeholder='Email' ref='email' />
                    <label>Password</label>
                    <input type='password' placeholder='Password' ref='password' />
                    <button type='submit' className='button expanded'>Create An Account</button>
                </form>
            </div>
        );
    }
}

module.exports = connect()(SignUp);