import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

class UserInfo extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isEdit: false,
        }
    }
    render(){
        let {listUser, index} = this.props;
        let userinfo = listUser[index];
        if(this.state.isEdit){
            return(
                <form className="userinfo">
                    <label>Username: {userinfo.username}</label>
                    <label>Password: </label>
                    <input type='text' ref='passwordChanged' defaultValue={userinfo.password}/>
                    <label>Email: </label>
                    <input type='email' ref='emailChanged' defaultValue={userinfo.email}/>
                    <button className="button" onClick={this.saveUser.bind(this)}>Save</button>
                </form>
            );
        }
        return(
            <div className="userinfo">
                <p>Username: {userinfo.username}</p>
                <p>Password: {userinfo.password}</p>
                <p>Email: {userinfo.email}</p>
                <button className="button button-transaction" onClick={this.removeUser.bind(this)}>Delete</button>
                <button className="button button-transaction" onClick={this.editUser.bind(this)}>Edit</button>
            </div>
        );
    }

    removeUser(e){
        e.preventDefault();
        var {listUser, dispatch, index} = this.props;
        let userinfo = listUser[index];

        axios.post('/deleteUser', {username: userinfo.username, email: userinfo.email})
        .then(res=>{
            dispatch({
                type: 'REMOVE_USER',
                index: index
            });
        })
        .catch(err=>console.log(err));
    }

    editUser(e){
        e.preventDefault();
        this.state.isEdit = !this.state.isEdit;
        this.setState(this.state);
    }

    saveUser(e){
        e.preventDefault();
        var {listUser, dispatch, index} = this.props;
        var {passwordChanged, emailChanged} = this.refs;
        let userinfo = listUser[index];
        axios.post('/editUser', {username: userinfo.username, email:emailChanged.value, password: passwordChanged.value})
        .then(res=>{
            if(res.data === 'SUA_THANH_CONG')
            {
               dispatch({
                   type: 'EDIT_USER',
                   username: userinfo.username,
                   email:emailChanged.value, 
                   password: passwordChanged.value
               });
            }            
        })
        .catch(err=>console.log(err));
        this.state.isEdit = !this.state.isEdit;
        this.setState(this.state);
    }
}

module.exports = connect(function(state){
    return {listUser: state.listUser};
})(UserInfo);