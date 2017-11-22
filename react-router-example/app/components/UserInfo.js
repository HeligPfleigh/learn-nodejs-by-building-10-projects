import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

class UserInfo extends React.Component{
    render(){
        var {userinfo} = this.props;
        return(
            <div>
                <p>{userinfo.username}</p>
                <p>{userinfo.password}</p>
                <p>{userinfo.email}</p>
                <button className="button" onClick={this.removeUser.bind(this)}>Delete</button>
                <button className="button" onClick={this.editUser.bind(this)}>Edit</button>
            </div>
        );
    }

    removeUser(){
        var {userinfo, dispatch, index} = this.props;

        axios.post('/deleteUser', {username: userinfo.username, email: userinfo.email})
        .then(res=>{
            dispatch({
                type: 'REMOVE_USER',
                index: index
            });
        })
        .catch(err=>console.log(err));
    }

    editUser(){
        console.log('Edit');
    }
}

module.exports = connect()(UserInfo);