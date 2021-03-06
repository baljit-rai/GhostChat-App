<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Firebase Web QuickStart</title>
        <link href="https://fonts.googleapis.com/css?family=Roboto:300,500" rel="stylesheet">
        <script src="https://www.gstatic.com/firebasejs/live/3.1/firebase.js"></script>
        <link rel="stylesheet" href="style.css">

    </head>
    <body>

        <div class="Registration">
            <input id="txtEmail" type="email" placeholder="Email">

            <input id="txtPassword" type="passowrd" placeholder="Password">

            <button id="btnLogin" class="btn btn-action">Login</button>

            <button id="btnSignUp" class="btn btn-secondary">Sign Up</button>

            <button id="btnLogout" class="btn btn-action hide">Log Out</button>

        </div>
        <div id="container"></div>
    <script src="/scripts/fire.js"></script>
    </body>
</html>