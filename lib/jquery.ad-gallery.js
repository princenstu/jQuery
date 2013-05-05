images = ['images/1.jpg', 'images/2.jpg', 'images/3.jpg', 'images/4.jpg', 'images/5.jpg', 'images/6.jpg','images/7.jpg','images/8.jpg','images/9.jpg','images/10.jpg','images/11.jpg','images/12.jpg'];


descriptions = ['Image 1', 'Image 2', 'Image 3', 'Image 4', 'Image 5', 'Image 6', 'Image 7', 'Image 8', 'Image 9'];

$(document).ready(function() {


    //setting the width of the imageHolder
    $('#imageHolder').css('width', images.length * 40);

    //adding images to the thumbnails
    $.each(images, function(index, value) {
        $('#imageHolder').append('<img src="' + value + '" />');
    });


    beginNow = setInterval(forwardImage, 4000);
    //adding first description
    $('#description').html(descriptions[0]);


    //Hovering Over Thumbnail Navigation
    $('.thumbnailArrows').hover(function() {
        var whiches = $(this).children('img').attr('id');
        if (whiches == 'Tleft') {
            movingThumbs(2000, '+');
        }
        else {
            movingThumbs(2000, '-');
        }
    }, function() {
        $('#imageHolder').stop();
    });


    //Function for Thumbnails Moving
   function movingThumbs(speed, direction) {
        var currentLeft = $('#imageHolder').position().left;
        //figure out how far to go left - only for right arrow
        var moving = $('#imageHolder').width() - (Math.abs($('#imageHolder').position().left) + $('#window').width());
        if (currentLeft == 0 && direction == '+') {
            //do nothing
        } else if (Math.abs($('#imageHolder').position().left) + $('#window').width() >= $('#imageHolder').width() && direction == '-') {
            //do nothing
        } else if (direction == '+' && currentLeft != 0) {
            $('#imageHolder').animate({
                left: 0,
            }, speed);
        } else {

            $('#imageHolder').animate({
                left: '+='+direction + moving,
            }, speed);
        }
    }

    //Clicking Thumbnail functionality
    $('#imageHolder img ').click(function() {
        var newImage = $(this).attr('src');
        $.each(images, function(index, value) {
            if (value == newImage) {
                descriptionChange(index);
                changeImage(index);
            }
        });
        // comment out line below to keep slideshow moving
        clearInterval(beginNow);
    });


    //function for sliding Description in
    $('#holder').hover(function() {
        $('#description, #descriptionBack').animate({
            bottom: 0,
        }, {
            duration: 400,
            queue: false
        });
    }, function() {
        $('#description, #descriptionBack').animate({
            bottom: -40,
        }, {
            duration: 400,
            queue: false
        });
    });


    //function for changing the description

    function descriptionChange(newDescript) {
        $('#description').stop().animate({
            opacity: 0,
        }, 200, function() {
            $('#description').html(descriptions[newDescript]);
            $('#description').animate({
                opacity: 1,
            }, 200)
        })
    }


    $('#leftArrow').click(function() {
        clearInterval(beginNow);
        backwardsImage();
    });

    $('#rightArrow').click(function() {
        clearInterval(beginNow);
        forwardImage();
    });

    //function for fading in and out the arrows
    $('#leftArrowD, #rightArrowD').hover(function() {
        $(this).stop().animate({
            opacity: 1,
        })
    }, function() {
        $(this).stop().animate({
            opacity: 0,
        })
    })


    //This function will find the key for the current Image

    function currentImageKey() {
        i = jQuery.inArray($('#slideshow').attr('src'), images);
        return i;
    }


    //This function will move the slideshow backwards one

    function backwardsImage() {
        currentImageKey();
        if (i == 0) {
            //uncomment line below to stop the slideshow at the last photo
            //changeImage(images.length - 1);
        } else {
            changeImage(i - 1);
        }
        descriptionChange(i - 1);
        checkArrows(i - 1);
    }


    //This function will move the slideshow forward one

    function forwardImage() {
        currentImageKey();
        if (i < images.length - 1) {
            changeImage(i + 1);
            descriptionChange(i + 1);
        } else {
            //uncomment line below to stop the slideshow at the last photo
            //changeImage(0);
        }
        checkArrows(i + 1);
    }

    //this function checks the arrows

    function checkArrows(i) {
        if (i == 0) {
            $('#leftArrow').css('display', 'none');
            $('#rightArrow').css('display', 'inline');
        } else if (i == images.length - 1) {
            $('#rightArrow').css('display', 'none');
            $('#leftArrow').css('display', 'inline');
        } else {
            $('#rightArrow').css('display', 'inline');
            $('#leftArrow').css('display', 'inline');
        }
    }


    //This function will change to image to whatever the variable i passes to it

    function changeImage(i) {
        $('#slideshow').stop().animate({
            opacity: 0,
        }, 200, function() {
            $('#slideshow').attr('src', images[i]);
            $('#holder img').load(function() {
                $('#slideshow').stop().animate({
                    opacity: 1,
                }, 200)
            })
        })
    }

});