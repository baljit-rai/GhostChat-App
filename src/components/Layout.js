import React, { Component } from 'react';
import io from 'socket.io-client'
import {USER_CONNECTED, LOGOUT } from '../Events'
import LoginForm from './LoginForm'
import ChatContainer from './chats/ChatContainer'
import firebase from 'firebase';

const socketUrl = "http://localhost:3001"

export default class Layout extends Component {

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

    this.state = {
      socket: null,
      user: null,
    }
  }

 componentWillMount() {
    this.initSocket()
  }
  // ** Connect to and intializes the socket. **

  initSocket = ()=>{
    const socket = io(socketUrl)

    socket.on('connect', ()=>{
      console.log("Connected");
    })

    this.setState({socket})
}

  //** Sets the user property in state, @param user {id:number, namestring}

  setUser = (user)=>{
    const { socket } = this.state
    socket.emit(USER_CONNECTED, user);
    this.setState({user})
  }

  //** Sets the user property in state to null

  logout = ()=>{

    firebase.auth().signOut();
    const { socket } = this.state
    socket.emit(LOGOUT)
    this.setState({user:null})

  }



  render() {
    const { title } = this.props
    const { socket, user } = this.state
    return (
      <div className="container">
        {
          !user ?
          <LoginForm socket={socket} setUser={this.setUser} />
          :
          <ChatContainer socket={socket} user={user} logout={this.logout}/>
        }
      </div>
    );
  }
}
