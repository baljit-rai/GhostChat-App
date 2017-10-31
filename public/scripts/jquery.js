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

      });
  });