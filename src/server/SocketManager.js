const io = require('./index.js').io

const { VERIFY_USER, USER_CONNECTED, USER_DISCONNECTED, LOGOUT,
  COMMUNITY_CHAT, MESSAGE_RECIEVED, MESSAGE_SENT } = require('../Events')

const { createUser, createMessage, createChat } = require('../Factories')

let connectedUsers = { }

let communityChat = createChat()

module.exports = function(socket) {
  console.log("Socket ID:" + socket.id)

  let sendMessageToChatFromUser;

  // Verify Username.   ************ isUser is always returning false, fix this / ask for help **************
  socket.on(VERIFY_USER, (nickname, callback) => {
    if(isUser(connectedUsers, nickname)) {
      callback({ isUser:true, user:null})
    } else {
      callback({ isUser:false, user:createUser({name:nickname})})
    }
  })

  // User Connects with username
  socket.on(USER_CONNECTED, (user) => {
    connectedUsers = addUser(connectedUsers, user)
    socket.user = user

    sendMessageToChatFromUser = sendMessageToChat(user.name)

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