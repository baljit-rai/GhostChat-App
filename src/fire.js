(function() {
   // Initalize FireBase
    var config = {
     apiKey: "AIzaSyA1LeSMzIAdNE3WHeLi73zX4BEf1yp8PkU",
     authDomain: "ghost-84d4d.firebaseapp.com",
     databaseURL: "https://ghost-84d4d.firebaseio.com",
     projectId: "ghost-84d4d",
     storageBucket: "ghost-84d4d.appspot.com",
     messagingSenderId: "473083667760"
   };

 var fire = firebase.initializeApp(config);

 //Get Elements
 const txtEmail = document.getElementById('txtEmail')
 const txtPassword = document.getElementById('txtPassword')
 const txtPasswordConfirm = document.getElementById('txtPasswordConfirm')
 const btnLogin = document.getElementById('btnLogin')
 const btnSignUp = document.getElementById('btnSignUp')
 const btnLogout= document.getElementById('btnLogout')

 //Add Login event

 // Add logout event
 btnLogout.addEventListener('click', event => {
   firebase.auth().signOut();
 })

 //Add a realtime listner
 firebase.auth().onAuthStateChanged(firebaseUser => {
   if(firebaseUser) {
     console.log(firebaseUser);
     btnLogout.classList.remove('hide');
   } else {
     console.log('not logged in')
     btnLogout.classList.add('hide');
   }

 });

})();
