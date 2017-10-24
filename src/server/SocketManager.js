const io = require('./index.js').io

const { VERIFY_USER, USER_CONNECTED, USER_DISCONNECTED, LOGOUT,
  COMMUNITY_CHAT, MESSAGE_RECIEVED, MESSAGE_SENT,
  TYPING, PRIVATE_MESSAGE } = require('../Events')

const { createUser, createMessage, createChat } = require('../Factories')

let connectedUsers = { }

let communityChat = createChat()

module.exports = function(socket) {
  console.log("Socket ID:" + socket.id)

  let sendMessageToChatFromUser;

  let sendTypingFromUser;

  // Verify Username.   ************ isUser is always returning false, fix this / ask for help **************
  socket.on(VERIFY_USER, (nickname, callback) => {
    if(isUser(connectedUsers, nickname)) {
      callback({ isUser:true, user:null})
    } else {
      callback({ isUser:false, user:createUser({name:nickname, socketId: socket.id})})
    }
  })

  // User Connects with username
  socket.on(USER_CONNECTED, (user) => {
    user.socketId = socket.id
    connectedUsers = addUser(connectedUsers, user)
    socket.user = user

    sendMessageToChatFromUser = sendMessageToChat(user.name)
    sendTypingFromUser = sendTypingToChat(user.name)

    io.emit(USER_CONNECTED, connectedUsers)

    console.log(connectedUsers);
  })

  // User disconnects
  socket.on('disconnect', ()=>{
    if("user" in socket){
      connectedUsers = removeUser(connectedUsers, socket.user.name)

      io.emit(USER_DISCONNECTED, connectedUsers)
      console.log("Disconnect", connectedUsers);
    }
  })

   // User logouts
   socket.on(LOGOUT, ()=>{
      connectedUsers = removeUser(connectedUsers, socket.user.name)
      io.emit(USER_DISCONNECTED, connectedUsers)
      console.log("Disconnect", connectedUsers)
   })
  //Get Community Chat
  socket.on(COMMUNITY_CHAT, (callback)=>{
    callback(communityChat)
})

  socket.on(MESSAGE_SENT, ({chatId, message})=>{
    sendMessageToChatFromUser(chatId, message)
  })

  socket.on(TYPING, ({chatId, isTyping})=>{
    console.log(chatId, isTyping)
    sendTypingFromUser(chatId, isTyping)

  })

  socket.on(PRIVATE_MESSAGE, ({reciever, sender, activeChat}) => {
    if(reciever in connectedUsers) {
      const recieverSocket = connectedUsers[reciever].socketId
      if (activeChat === null || activeChat.id === communityChat.id) {
        const newChat = createChat({ name: `${reciever}&${sender}`, users:[reciever, sender] })
        socket.to(recieverSocket).emit(PRIVATE_MESSAGE, newChat)
        socket.emit(PRIVATE_MESSAGE, newChat)
      } else {
        socket.to(recieverSocket).emit(PRIVATE_MESSAGE, activeChat)
      }
    }

  })

}
//**Returns a function that will take chatId and a boolean isTyping
//**and emits broadcast to the chatId where sender is typing

function sendTypingToChat(user){
  return (chatId, isTyping)=>{
    io.emit(`${TYPING}-${chatId}`, {user, isTyping})

  }
}

//**Returns a function that will take a chat id and message
//and emit them to the chat id**
function sendMessageToChat(sender){
  return (chatId, message)=>{
    io.emit(`${MESSAGE_RECIEVED}-${chatId}`, createMessage({message, sender}))
  }

}




//**Adds user to list passed in.**
function addUser(userList, user) {
  let newList = Object.assign({}, userList)
  newList[user.name] = user
  return newList


}

//**Removes user from the list passed in.**
function removeUser(userList, username) {
  let newList = Object.assign({}, userList)
  delete newList[username]
  return newList
}

//**Checks if the user is in the list passed in.**
function isUser(userList, username) {
  return username in userList
}