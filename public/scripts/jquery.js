$(function() {
      $("#signup").click(function() {
         window.setTimeout(function() {
          $(".input").remove()
          $("#btnLogin").remove()
          $("#account").remove()
          $("form").remove()
          $(".error").remove()
          $("#loading").remove()
        }, 1500);


$( "#login" ).on( "click", "#btnSignUp", function() {


   // Get email and password
   const email = txtEmail.value;
   const password = txtPassword.value;
   const confirm = txtPasswordConfirm.value;
   const auth = firebase.auth();

   //Sign Up
   const promise = auth.createUserWithEmailAndPassword(email, password);
   promise.catch(event => console.log(event.message));

   location.reload();

    })

  });
});