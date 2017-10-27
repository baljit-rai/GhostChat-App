import React, { Component } from 'react';
import SideBar from './SideBar'
import {COMMUNITY_CHAT, MESSAGE_SENT, MESSAGE_RECIEVED, TYPING, PRIVATE_MESSAGE} from '../../Events'
import ChatHeading from './ChatHeading'
import Messages from '../messages/Messages'
import MessageInput from '../messages/MessageInput'
import firebase from 'firebase/app'
import 'firebase/database';

export default class ChatContainer extends Component {
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
    this.database = this.app.database().ref().child('chats');

    this.state = {
      chats: [],
      activeChat: null
    };
  }

  componentWillMount() {
    const { socket } = this.props
    this.initSocket(socket)

    const chats = this.state.chats;
    //Data Snapshot
    this.database.on('child_added', snap => {
      chats.push({
        id: snap.key,
        chats: snap.val().chats,
        activeChat: snap.val().activeChat
      })
      this.setState({
        chats: [...this.state.chats, ...chats]
      })
    })
    console.log(this.app)
  }

  componentDidMount() {
    const chatHistory = [];
    this.database.once('value').then((data) => {
      data.forEach((chat) => {
        chatHistory.push(chat.val());
      })

      const activeChat = { messages: [], typingUsers: []};
      activeChat.messages = chatHistory.map((chatString, index) => {
        return { message: chatString, id: `${chatString}-${index}` }
      })

      this.setState({ activeChat });
    })
  }

  initSocket(socket) {
    const { user } = this.props
    socket.emit(COMMUNITY_CHAT, this.resetChat)
    socket.on(PRIVATE_MESSAGE, this.addChat)
    socket.on( 'connect', () => {
      socket.emit(COMMUNITY_CHAT, this.resetChat)
    })
  }

  sendOpenPrivateMessage = (reciever) => {
    const { socket, user } = this.props
    const { activeChat } = this.state
    socket.emit(PRIVATE_MESSAGE, {reciever, sender:user.name, activeChat})
  }
  //** Reset the chat back to only the chat passed in. **//
  resetChat = (chat) => {
    return this.addChat(chat, true)
  }

  //** Adds chat to the chat container, if reset is true removes all chats and sets that chat to the main chat. Sets the message and typing socket events for that chat. **//
  //** Adds a message to the specified chat **//

  addChat = (chat, reset = false) => {

    const { socket } =this.props
    const { chats } = this.state

    const newChats = reset ? [chat] : [...chats, chat]
    this.setState({chats:newChats})
    //this.setState({chats:newChats, activeChat:reset ? chat : this.state.activeChat})

    const messageEvent = `${MESSAGE_RECIEVED}-${chat.id}`
    const typingEvent = `${TYPING}-${chat.id}`

    socket.on(typingEvent, this.updateTypingInChat(chat.id))
    socket.on(messageEvent, this.addMessageToChat(chat.id))

  }

  //** Returns a function that will add message to chat with the chatId passed in. **//
  addMessageToChat = (chatId) => {
    return message => {
      const { chats } = this.state
      let newChats = chats.map((chat) => {
        if(chat.id === chatId)
          chat.messages.push(message)
        return chat
      })

      this.setState({chats:newChats})
    }

  }

  //** Updates the typing of chat with id passed in. **//
  updateTypingInChat = (chatId) =>{
    return ({isTyping, user})=>{
      if(user !== this.props.user.name){

        const { chats } = this.state

        let newChats = chats.map((chat)=>{
          if(chat.id === chatId){
            if(isTyping && !chat.typingUsers.includes(user)){
              chat.typingUsers.push(user)
            }else if(!isTyping && chat.typingUsers.includes(user)){
              chat.typingUsers = chat.typingUsers.filter(u => u !== user)
            }
          }
          return chat
        })
        this.setState({chats:newChats})
      }
    }
  }

  //** Adds a message to the specified chat. **//
  sendMessage = (chatId, message) => {
    const { socket } = this.props
    socket.emit(MESSAGE_SENT, {chatId, message})
  }

  //** Sends typing status to server **//
  sendTyping = (chatId, isTyping) => {
    const { socket } = this.props
    socket.emit(TYPING, {chatId, isTyping})
  }

  setActiveChat = (activeChat)=>{
    this.setState({activeChat})
  }

  render() {
    const { user, logout } = this.props
    const { chats, activeChat } = this.state
      return (
       <div className="container">
         <SideBar
           logout={logout}
           chats={chats}
           user={user}
           activeChat={activeChat}
           setActiveChat={this.setActiveChat}
           onSendPrivateMessage={this.sendOpenPrivateMessage}
           />
        <div className="chat-room-container">
          {
            activeChat !== null ? (

                <div className="chat-room">
                  <ChatHeading name={activeChat.name} />
                  <Messages
                    messages={activeChat.messages}
                    user={user}
                    typingUsers={activeChat.typingUsers}
                    />
                  <MessageInput data={this.props}
                    sendMessage={
                      (message) => {
                          this.sendMessage(activeChat.id, message)
                      }
                    }
                    sendTyping={
                      (isTyping) => {
                        this.sendTyping(activeChat.id, isTyping)
                      }
                    }
                    />
                </div>

              ): (
              <div className="chat-room choose">
                <h3>Choose a chat!</h3>
              </div>
              )
          }
        </div>
        </div>
    );
  }
}