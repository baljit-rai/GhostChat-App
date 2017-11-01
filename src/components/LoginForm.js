import React, { Component } from 'react';
import { VERIFY_USER } from '../Events';
import ghost from '../images/ghost.png';
import icon from '../images/icon.png';
import lock from '../images/lock.png';
import firebase from 'firebase';

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
              account: "account animated zoomIn",
              linkedin:"linkedin linkedinDisplay"},
      visible: true,
      login:false
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

 const txtEmail = document.getElementById('txtEmail')
 const txtPassword = document.getElementById('txtPassword')
 const txtPasswordConfirm = document.getElementById('txtPasswordConfirm')
 const btnLogin = document.getElementById('btnLogin')
 const btnSignUp = document.getElementById('btnSignUp')
 const btnLogout= document.getElementById('btnLogout')

 btnLogin.addEventListener('click', event => {
   //Get email and password
   const email = txtEmail.value;
   const password = txtPassword.value;
   const auth = firebase.auth();

   //Sign In
   const promise = auth.signInWithEmailAndPassword(email,password);
   promise.catch(event => console.log(event.message));
 });

 firebase.auth().onAuthStateChanged(firebaseUser => {
   if(firebaseUser) {
    const { socket } = this.props
    const { nickname } = this.state
      socket.emit(VERIFY_USER, nickname, this.setUser)
   } else {
     console.log('not logged in')
   }

 });

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
    this.setState({login:true})
  }

  render() {
    const { nickname, error } = this.state

    return (
        <div id="container">
        <div id="login" className={this.state.class.login}>
            <div className={this.state.class.logo}>
                <img src={ghost} />
            </div>
            <div className={this.state.visible ? this.state.class.linkedin : 'linkedin animated zoomIn'}><script type="In/Login"></script></div>
            <form>
            <div className={this.state.visible ? this.state.class.username : 'input animated zoomOut'}>
                <img src={icon} />
                <input ref={(input) => { this.textInput = input }} onChange={this.handleChange} id="txtUsername" className="login_input" autoComplete="off" type="text" name="username" placeholder="Username" />

            </div>
            </form>
            <form>
            <div className={this.state.visible ? this.state.class.username : 'input animated zoomOut'}>

                <img src={icon} />
                <input id="txtEmail" className="login_input" autoComplete="off" type="text" name="email" placeholder="Email" />

            </div>
            </form>
            <div className={this.state.visible ? this.state.class.password : 'input input2 animated zoomOut'}>

                <img src={lock} />
                <input id="txtPassword" className="login_input" autoComplete="off" type="password" name="username" placeholder="Password" />

            </div>

            <div className="error">{error ? error:null}</div>

            <button onClick={this.handleSubmit} type="button" id="btnLogin" className={this.state.visible ? this.state.class.button : 'btn animated zoomOut'}>Sign in
            </button>

            <div id="loading" className={this.state.class.loading}>
                <div className="dot1"></div>
                <div className="dot2"></div>
            </div>
            <div id="account" className={this.state.visible ? this.state.class.account : "account animated fadeOutDown"}><span>Don't have an account? <a onClick={(e) => this.signUpClick(e)} id="signup" href="#">Sign up</a></span></div>
        </div>
    </div>


    );
  }
}