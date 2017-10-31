
(function() {

  setTimeout(function(){
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
  const btnLogin = document.getElementById('btnLogin')
  const btnSignUp = document.getElementById('btnSignUp')
  const btnLogout= document.getElementById('btnLogout')

  //Add Login event
  btnLogin.addEventListener('click', event => {
    //Get email and password
    const email = txtEmail.value;
    const password = txtPassword.value;
    const auth = firebase.auth();

    console.log(email)
    console.log(password)
    //Sign In
    const promise = auth.signInWithEmailAndPassword(email,password);
    promise.catch(event => console.log(event.message));
  });

  // Add signup event
 /* btnSignUp.addEventListener('click', event => {
    console.log('click');
    // Get email and password
    // TODO: Check 4 real email
    const email = txtEmail.value
    const password = txtPassword.value;
    const auth = firebase.auth();

    //Sign Up
    const promise = auth.createUserWithEmailAndPassword(email, password);
    promise.catch(event => console.log(event.message));
  });

  // Add logout event
  btnLogout.addEventListener('click', event => {
    firebase.auth().signOut();
  })*/

  //Add a realtime listner
  firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser) {
      console.log(firebaseUser);
      /*btnLogout.classList.remove('hide');*/
    } else {
      console.log('not logged in')
     /* btnLogout.classList.add('hide');*/
    }

  });

   }, 5000);

})();


