import React, { Component } from 'react';
import FAChevronDown from 'react-icons/lib/md/keyboard-arrow-down'
import FAMenu from 'react-icons/lib/fa/list-ul'
import FASearch from 'react-icons/lib/fa/search'
import MdEject from 'react-icons/lib/md/eject'

export default class SideBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reciever:""
    }
  }
  handleSubmit = (event) => {
    event.preventDefault()
    const { reciever } = this.state
    const { onSendPrivateMessage } = this.props

    onSendPrivateMessage(reciever)
    this.setState({reciever:""})
  }


  render() {
    const { chats, activeChat, user, setActiveChat, logout } = this.props
    const { reciever } = this.state
    return (
      <div id="side-bar">
        <div className="heading">
          <div className="app-name"> Ghost <FAChevronDown /></div>
          <div className="menu">
            <FAMenu />
          </div>
        </div>
        <form onSubmit={this.handleSubmit} className="search">

          <i className="search-icon"><FASearch /></i>
          <input className="search_input"
            placeholder="Search"
            type="text"
            value={reciever}
            onChange={(event) => { this.setState({reciever:event.target.value}) }}/>

        </form>
        <div
          className="users"
          ref='users'
          onClick={(event)=>{ (event.target === this.refs.user) && setActiveChat(null) }}>

          {
            chats.map((chat)=>{
              if(chat.name){
                const lastMessage = chat.messages[chat.messages.length - 1];
                const chatSideName = chat.users.find((name) => {
                  return name !== user.name
                }) || "Company Chat"
                const classNames = (activeChat && activeChat.id === chat.id) ? 'active' : ''

                return(
                  <div
                    key={chat.id}
                    className={`user ${classNames}`}
                    onClick={ () => { setActiveChat(chat) } }
                    >
                    <div className="user-photo">{chatSideName[0].toUpperCase()}</div>
                    <div className="user-info">
                      <div className="name">{chatSideName}</div>
                      {lastMessage && <div className="last-message">{lastMessage.message}</div>}
                    </div>

                  </div>

                  )
              }
                return null
            })
          }
      </div>
      <div className="current-user">
        <span>{user.name}</span>
        <div onClick={()=>{logout()}} title="Logout" className="logout">
          <MdEject/>
        </div>
      </div>
    </div>

    );
  }
}