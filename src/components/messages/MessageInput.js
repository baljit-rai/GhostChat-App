import React, { Component } from 'react';
import firebase from 'firebase/app'
import 'firebase/database';

export default class MessageInput extends Component {

  constructor(props){
    super(props);
    this.app = firebase.apps[0];
    this.database = this.app.database().ref().child('chats');
    this.database2 = this.app.database().ref().child('private');


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
    var updates = {};

    this.props.sendMessage(this.state.message)
    updates['/chats/' + this.props.allData.user.name + '/' + new Date()] = this.state.message
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
            placeholder = "Enter a message"
            onKeyUp = { event => { event.keyCode !== 13 && this.sendTyping() } }
            onChange = {
              ({target})=>{
                this.setState({message:target.value})
              }
            }
            />
        </form>

</div>
    );
  }
}