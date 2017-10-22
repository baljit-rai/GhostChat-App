import React, { Component } from 'react';
import io from 'socket.io-client'
import {USER_CONNECTED, LOGOUT } from '../Events'
import LoginForm from './LoginForm'

const socketURL = "http://localhost:3001"

export default class Layout extends Component {

  constructor(props) {
    super(props);

    this.state = {
      socket: null,
      user: null,
    }
  }

  // ** Connect to and intializes the socket. **

  initSocket = () => {
    const socket = io(socketURL)
    console.log(socket)

    socket.on('connect', () => {
      console.log("Connected")
    })

    this.setState({socket})
  }

 componentWillMount() {
    this.initSocket()
  }
  //** Sets the user property in state, @param user {id:number, namestring}

  setUser = (user) => {
    const { socket } =this.state
    socket.emit(USER_CONNECTED, user);
    this.setState({user})
  }

  //** Sets the user property in state to null

  logout = () => {
    const { socket } = this.state
    socket.emit(LOGOUT)
    this.setState({user:null})
  }



  render() {
    const { title } = this.props
    const { socket } = this.state
    return (
      <div className="container">
        <LoginForm socket = {socket} setUser={this.setUser} />
      </div>

      );
  }


}
