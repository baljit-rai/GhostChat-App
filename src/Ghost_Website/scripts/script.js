$(function() {
    $("#login_button").click(function() {
        $("#login_button").toggleClass('btn btn_change').text('');
        $("#account").toggleClass('zoomIn fadeOutDown');

        window.setTimeout(function() {
            $("#loading").toggleClass('loading loading_view');
        }, 550);

        window.setTimeout(function() {
            $("#loading").toggleClass('loading_view loading');
            $("#login_button").toggleClass('btn_change btn_change2').removeClass('animated zoomIn');
        }, 4000);

        window.setTimeout(function() {
            $("#login").empty().css('background-image', 'none').removeClass('login animated zoomIn').addClass('main_chat');
            $("<div/>").addClass('top_bar').appendTo('#login');
            $("<div/>").addClass('profile_pic animated flipInY').appendTo('.top_bar');
            $("<div/>").addClass('chat_title').addClass('animated fadeIn').text('Company Chatroom').appendTo('.top_bar');

            $("<div/>").addClass('messages').appendTo('#login');
            $("<div/>").addClass('textbar').appendTo('#login');
            $('<textarea />', {
                type: 'text',
                class: 'text_input',
                placeholder: "Type your message"
            }).addClass('animated fadeIn').appendTo('.textbar');
        }, 4500);

        window.setTimeout(function() {
            $("<div/>").addClass('sidebar animated fadeInLeft').appendTo('#container');
            $('<div/>').addClass('sidebar_top').appendTo('.sidebar');
            $('<div/>').addClass('searchbar').appendTo('.sidebar_top');
            $('<i/>').addClass('fa fa-search fa-lg').appendTo('.searchbar');

        }, 5000);
    });

    $("#signup").click(function() {
        $('.input').toggleClass('zoomIn zoomOut')
        $('#login_button').toggleClass('zoomIn fadeOutUp')

        $('.input').remove();
        $('button').remove();
        $('#login').empty();

    });
});