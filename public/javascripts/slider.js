/**
 * Created by lt-117 on 24/5/16.
 */


var previewProfilePic = function(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            $('.round-profile-image-edit').css('background-image', 'none');
            $('.round-profile-image-edit').attr('src', e.target.result);
            var a = $('.round-profile-image-edit').attr('src');
            // $('#user_avatar').attr('value', a);
            $('#pro_img').attr('value', a);
            console.log(a);
            // console.log( $('.round-profile-image-edit').attr('src'));
        };
        reader.readAsDataURL(input.files[0]);
    }
};

var circleImageClick = function() {
    $('#user_avatar').trigger('click');
    $('#user_avatar').change(function() {
        previewProfilePic(this);
    });
};
$(document).ready(function () {
    $('#edit').on('click',function () {
        $('.media').hide();
        $('.media-edit').fadeIn(500);
    });

    
    
    $('.round-profile-image-edit,.glyphicon-camera').on('click', circleImageClick);
    
    $('.carousel').carousel({
        interval: 2000
    
    });


    $('.basic-demo').on('click', function ( e ) {
        e.preventDefault();
        $.toast({
            text : "Thanks for your interest! Check mail and click on the given link to be a verified user to our site",
            showHideTransition: 'slide',
            loader: false,
            stack: 1,
            hideAfter: 6000,
            textColor: 'yellow',
            allowToastClose:true,
            position: 'top-center'

        });

    });



});
