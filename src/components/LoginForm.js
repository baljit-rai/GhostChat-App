import React, { Component } from 'react';
import { VERIFY_USER } from '../Events';
import ghost from '../images/ghost.png';
import icon from '../images/icon.png';
import lock from '../images/lock.png';


export default class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      nickname:"",
      error:""

    };
  }

  setUser = ({user, isUser}) => {
    if(isUser) {
      this.setError("User name taken")
    } else {
      this.setError("")
      this.props.setUser(user)
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { socket } = this.props
    const { nickname } = this.state
    socket.emit(VERIFY_USER, nickname, this.setUser)
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
      <div id="container">
        <div id="login" className="login animated zoomIn">
            <div className="logo animated zoomIn">
                <img src={ghost} />
            </div>

            <div id="username" className="input animated zoomIn">
              <form>
                <img src={icon} />
                <input className="login_input" autoComplete="off" type="text" name="username" placeholder="Username" />
              </form>
            </div>

            <div id="password" className="input input2 animated zoomIn">
              <form>
                <img src={lock} />
                <input className="login_input" autoComplete="off" type="password" name="username" placeholder="Password" />
              </form>
            </div>

            <button type="button" id="login_button" className="btn animated zoomIn">Sign in
            </button>
            <div id="loading" className="loading">
                <div className="dot1"></div>
                <div className="dot2"></div>
            </div>
            <div id="account" className="account animated zoomIn"><span>Don't have an account? <a id="signup" href="#">Sign up</a></span></div>
        </div>
    </div>
    );
  }
}