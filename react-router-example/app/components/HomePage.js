import React from 'react';
import axios from 'axios';

class HomePage extends React.Component{
  render(){
    return (
      <div>
        <h1>This is Homepage</h1>
        <button onClick={this.handleRequest.bind(this)}>request</button>
      </div>
    )
  }

  handleRequest()
  {
    // axios.get('/try')
    // .then(res => console.log(res.data))
    // .catch(err => console.log(err))
    axios.post('/axios', {username: 'anc', age: 10})
    .then(res=>console.log(res.data))
    .catch(err=>console.log(err));
  }
}

export default HomePage;
