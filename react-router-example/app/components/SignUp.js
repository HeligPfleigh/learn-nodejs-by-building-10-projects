import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

class SignUp extends React.Component{
    constructor(props){
        super(props);
        this.state={
            file:null
        };
    }

    handleSignUp(e){
        e.preventDefault();
        var {dispatch} = this.props;
        var {username, email, password} = this.refs;

        const formData = new FormData();
        formData.append('username', username.value);
        formData.append('email', email.value);
        formData.append('password', password.value);
        formData.append('file', this.state.file);
        
        axios.post('/signUp', formData, {
            headers:{
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(res=>{
          if(res.data == 'TRUNG_USER')
            dispatch({type: 'SHOW_NOTIFICATION', txt: 'Username hoặc email đã được sử dụng!'});
          else{
            dispatch({type: 'SHOW_NOTIFICATION', txt: 'Đăng ký thành công!'});
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
                    <label>Avatar</label>
                    <input type='file' ref='file' onChange={this.onChange.bind(this)}/>
                    <button type='submit' className='button expanded'>Create An Account</button>
                </form>
            </div>
        );
    }

    onChange(e){
        this.setState({file:e.target.files[0]});
    }
}

module.exports = connect()(SignUp);