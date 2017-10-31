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
      error:"",
      class: {login: "login animated zoomIn",
              logo: "logo animated zoomIn",
              username: "input animated zoomIn",
              password: "input input2 animated zoomIn",
              button: "btn animated zoomIn",
              loading: "loading",
              account: "account animated zoomIn"},
      visible: true
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

  signInClick() {
    console.log('OMG THIS WORKS.WOOHOO!!');
  }

  signUpClick() {
    this.setState({visible:false})
  }

  render() {
    const { nickname, error } = this.state
    return (
        <div id="container">
        <div id="login" className={this.state.class.login}>
            <div className={this.state.class.logo}>
                <img src={ghost} />
            </div>

            <form>
            <div className={this.state.visible ? this.state.class.username : 'input animated zoomOut'}>
                <img src={icon} />
                <input ref={(input) => { this.textInput = input }} onChange={this.handleChange} id="txtEmail" className="login_input" autoComplete="off" type="text" name="username" placeholder="Username" />

            </div>

            <div className={this.state.visible ? this.state.class.password : 'input input2 animated zoomOut'}>

                <img src={lock} />
                <input id="txtPassword" className="login_input" autoComplete="off" type="password" name="username" placeholder="Password" />

            </div>
            </form>
            <div className="error">{error ? error:null}</div>

            <button onClick={this.handleSubmit} type="button" id="btnLogout" className={this.state.visible ? this.state.class.button : 'btn animated zoomOut'}>Sign in
            </button>

            <div id="loading" className={this.state.class.loading}>
                <div className="dot1"></div>
                <div className="dot2"></div>
            </div>
            <div id="account" className={this.state.visible ? this.state.class.account : "account animated fadeOutDown"}><span>Don't have an account? <a onClick={(e) => this.signUpClick(e)}id="signup" href="#">Sign up</a></span></div>
        </div>
    </div>

    );
  }
}