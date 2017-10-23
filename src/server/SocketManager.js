const io = require('./index.js').io

const { VERIFY_USER, USER_CONNECTED, USER_DISCONNECTED, LOGOUT, COMMUNITY_CHAT } = require('../Events')

const { createUser, createMessage, createChat } = require('../Factories')

let connectedUsers = { }

let communityChat = createChat()

module.exports = function(socket) {
  console.log("Socket ID:" + socket.id)


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