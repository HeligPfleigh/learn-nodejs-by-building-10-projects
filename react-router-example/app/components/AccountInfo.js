import React from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

class AccountInfo extends React.Component{
    render(){
        var {username} = this.props;
        return (
            <div className='text-center page-title'>
                <h1>Account Info</h1>
                <p>Username: {this.props.username}</p>
                <a href="#" onClick={this.logOut.bind(this)}>Log out</a>
            </div>
        );
    }
    logOut(e){
        e.preventDefault();
        var {dispatch} = this.props;
        
        axios.get('/logout')
        .then(res=>{
            dispatch({type:'LOG_OUT'});
        })
        .catch(err => console.log(err))
    }
}

module.exports = connect(function(state){
    return {username: state.username};
})(AccountInfo);