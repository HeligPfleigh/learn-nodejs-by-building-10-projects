import React from 'react';
import { setTimeout } from 'timers';
import { connect } from 'react-redux';

class Notification extends React.Component{
  render(){
    return (
      <div className='text-center page-title'>
        <p className="noti">{this.props.txt}</p>
      </div>
    );
  }
  componentDidMount(){
      var {dispatch} = this.props;
      setTimeout(()=>{
          dispatch({type: 'HIDE_NOTIFICATION'});
      }, 2000);
  }
}

module.exports = connect()(Notification);
