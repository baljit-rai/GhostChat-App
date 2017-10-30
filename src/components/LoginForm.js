import React, { Component } from 'react';
import { VERIFY_USER } from '../Events';
import firebase from 'firebase/app';
import 'firebase/database';

export default class LoginForm extends Component {
  constructor(props) {
    super(props);
    var config = {
      apiKey: "AIzaSyA1LeSMzIAdNE3WHeLi73zX4BEf1yp8PkU",
      authDomain: "ghost-84d4d.firebaseapp.com",
      databaseURL: "https://ghost-84d4d.firebaseio.com",
      projectId: "ghost-84d4d",
      storageBucket: "ghost-84d4d.appspot.com",
      messagingSenderId: "473083667760"
    };

    if (!firebase.apps.length) {
    this.app = firebase.initializeApp(config);
    }
    this.app = firebase.apps[0];
    this.database = this.app.database().ref().child('users');

    this.state = {
      nickname:"",
      error:""

    };
  }

  setUser = ({user, isUser}) => {
    if(isUser) {
      this.setError("Username taken.")
    } else {
      this.setError("")
      this.props.setUser(user)
    }
  }
  //Submits username to local server and firebase
  handleSubmit = (event) => {
    event.preventDefault();
    var updates = {};
    const { socket } = this.props
    const { nickname } = this.state
    updates['/users/' + this.state.nickname] = 'Authenticated'
    socket.emit(VERIFY_USER, nickname, this.setUser)
    return this.app.database().ref().update(updates)
  }

  handleChange = (event) => {
    this.setState({nickname:event.target.value})
  }

  setError = (error) => {
    this.setState({error})
  }

  render() {
    const { nickname, error } = this.state
    return (
      <div className="login">
        <form onSubmit={this.handleSubmit} className="login-form hide-login">

          <label htmlFor="nickname">
            <h2>Login</h2>
          </label>
          <input
            ref={(input) => { this.textInput = input }}
            type="text"
            id="nickname"
            value= {nickname}
            onChange={this.handleChange}
            placeholder={'UserName'}
          />
          <div className="error">{error ? error:null}</div>

        </form>
      </div>
    );
  }
}