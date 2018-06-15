import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  users = [];
  constructor(){
    super();
    this.state = {
      tasks: [],
      users : [],
    }
  }
  render() {
    return (
    <div className="overallContainer">
      <div className="userContainer2">
        <h1>Käyttäjät</h1>
        {this.state.users.map((user) => {
          return(
            <div key = {user._id}>
            <h2>{user.name}</h2>
            <p>Käyttäjän positio: {user.position}</p>
             <form onSubmit={(e) => this.removeUser(user, e)}><input type="submit" value="Poista" /></form>
            </div>
          )
        })}
        
        <form action = "http://localhost:3000/users" method="post">
        {/*<form onSubmit={this.handleNewUser}> this works, but node does not understand the data it sends*/}
          <label>
            Nimi:
            <input type="text" name="name" />
            Positio:
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Submit" />
        </form>


      </div>

        <div className="container1">
          <h1>Tehtävät</h1>
          {this.state.tasks}
        </div>
      </div>
    )
  }
  
  componentDidMount(){    
    fetch('http://localhost:3000/tasks')
    .then(results => {
      return results.json();
    }).then(data => {
      let tasks = data.map((task) => {
        return(
        <div key = {task._id}>
        <h2>{task.name}</h2>
        <p>Tehtävän tila: {task.status}</p>
        <p>Tehtävää suorittaa: {task.assignedTo}</p>
        </div>
        )
      })
      this.setState({tasks: tasks});
      
    })
      fetch('http://localhost:3000/users').then(results => {
      return results.json();
      }).then(data => {
        let users = data;
        this.setState({users: users});

      })
  }

  removeUser(user, e){
    e.preventDefault();
    alert("remove user"+user);
    fetch('http://localhost:3000/users/'+user._id, {
      method: 'delete'
  }).then(response =>
    response.json().then(json => {
      return json;
    })
  );
}

/*
* Was planning to use this to submit user forms, but Node does not understand the data it sends
*/

handleNewUser(e){
    e.preventDefault();
    const data = new FormData(e.target);
    fetch('http://localhost:3000/users', {
    method: 'POST',
    body: 'name='+data.get('name')+'&position='+data.get('position')});
}

}
export default App;
