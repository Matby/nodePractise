import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  users = [];
  constructor(){
    super();
    //&this.handleNewUser = this.handleNewUser.bind(this);
    this.handleUserUpdate = this.handleUserUpdate.bind(this);

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
            <form onSubmit={this.handleUserUpdate}>
            <label>käyttäjän nimi</label><input type="text" name="name" defaultValue={user.name}></input>
            <input type="hidden" name="_id" value={user._id}/>
            <label>Käyttäjän positio</label><input type="text" name="position" defaultValue={user.position}></input>            
            <input type="submit" value="Muokkaa käyttäjää" />
            </form>
             <form onSubmit={(e) => this.removeUser(user, e)}><input type="submit" value="Poista käyttäjä" /></form>
            </div>
          )
        })}
        
        {/*<form action = "http://34.244.30.205:3000/users" method="post">*/}
        <form onSubmit={this.handleNewUser}>
          <label>
            Nimi:
            <input type="text" name="name" />
            Positio:
            <input type="text" name="position" />
          </label>
          <input type="submit" value="Lisää käyttäjä" />
        </form>


      </div>

      </div>
    )
  }
  
  componentDidMount(){    
      fetch('http://34.244.30.205:3000/users').then(results => {
      return results.json();
      }).then(data => {
        let users = data;
        this.setState({users: users});
      })
  }

  removeUser(user, e){
    e.preventDefault();
    alert("remove user"+user);
    fetch('http://34.244.30.205:3000/users/'+user._id, {
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
    var name = data.get('name');
    var position = data.get('position');

    fetch('http://34.244.30.205:3000/users', {
    method: 'POST',
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json'
    },
    body: JSON.stringify({name:name, position:position})})
    .then(res => {
        return res;
    }).catch(err => err);
}

handleUserUpdate(e){
    e.preventDefault();
    const data = new FormData(e.target);
    var name = data.get('name');
    var position = data.get('position');
    fetch('http://34.244.30.205:3000/users/'+data.get('_id'), {
    method: 'PUT',
    headers: {
      'user-agent': 'Mozilla/4.0 MDN Example',
      'content-type': 'application/json'
    },
    body: JSON.stringify({name:name, position:position})})
    .then(res => {
        return res;
    }).catch(err => err);
}

}
export default App;
