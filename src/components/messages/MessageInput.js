import React, { Component } from 'react';
import firebase from 'firebase/app'
import 'firebase/database';

export default class MessageInput extends Component {

  constructor(props){
    super(props);

/*    var config = {
    apiKey: "AIzaSyA1LeSMzIAdNE3WHeLi73zX4BEf1yp8PkU",
    authDomain: "ghost-84d4d.firebaseapp.com",
    databaseURL: "https://ghost-84d4d.firebaseio.com",
    projectId: "ghost-84d4d",
    storageBucket: "ghost-84d4d.appspot.com",
    messagingSenderId: "473083667760"
    };

    if (!firebase.apps.length) {
    this.app = firebase.initializeApp(config);

    }*/

    this.app = firebase.apps[0];
    this.database = this.app.database().ref().child('chats');

    this.state = {
      message:"",
      isTyping:false
    };
}

  handleSubmit = (event)=>{
    event.preventDefault()
    this.sendMessage()
    this.setState({message:""})
  }



  sendMessage = ()=>{
    //this.database.push().update(this.props.sendMessage(this.state.message))

    //this.props.sendMessage(this.state.message)
    var updates = {};
    this.props.sendMessage(this.state.message)
    updates['/chats/' + this.state.message] = this.state.message
    return this.app.database().ref().update(updates)



  }

  componentWillUnmount() {
    this.stopCheckingTyping()
  }

  sendTyping = ()=>{
    this.lastUpdateTime = Date.now()
    if(!this.state.isTyping){
      this.setState({isTyping:true})
      this.props.sendTyping(true)
      this.startCheckingTyping()
    }
  }

  //Start an interval to check if user is typing
  startCheckingTyping = ()=>{
    console.log("Typing...");
    this.typingInterval = setInterval(()=>{
      if((Date.now() - this.lastUpdateTime) > 300){
        this.setState({isTyping:false})
        this.stopCheckingTyping()
      }
    }, 300)
}

 //Clear interval if user is not typing
  stopCheckingTyping = ()=>{
    console.log("Stopped typing.")
    if(this.typingInterval){
      clearInterval(this.typingInterval)
      this.props.sendTyping(false)
    }
  }

  render() {
    const { message } = this.state
    return (
      <div className="message-input">
        <form
          onSubmit={ this.handleSubmit }
          className="message-form">

          <input
            id = "message"
            ref = {"messageinput"}
            type = "text"
            className = "form-control"
            value = { message }
            autoComplete = {'off'}
            placeholder = "Type something interesting"
            onKeyUp = { event => { event.keyCode !== 13 && this.sendTyping() } }
            onChange = {
              ({target})=>{
                this.setState({message:target.value})
              }
            }
            />
          <button
            disabled = { message.length < 1 }
            type = "submit"
            className = "send"

          > Send </button>
        </form>

</div>
    );
  }
}