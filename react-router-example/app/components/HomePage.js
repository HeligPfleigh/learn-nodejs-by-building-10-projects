import React from 'react';
import axios from 'axios';
require('style!css!../css/HomePage.css');

class HomePage extends React.Component{
  render(){
    return (
      <div className="mainWrapper">
            <h2>ChatIO</h2>
            <div className="chatWrapper">
                <div className="chatWindow"></div>
                <form classsName="messageForm">
                    <input size="35" className="message" placeholder="Type Something..."/>
                    <input type="submit" value="Say It!"/>
                </form>
            </div>
            <div className="userWrapper">
                <div className="users"></div>
            </div>
      </div>
    )
  }
}

export default HomePage;
