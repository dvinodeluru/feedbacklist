$(function () {
    'use strict';
    //Navigation Scrolling
    $('.nav a').click(function (e) {
        $('#navigation li').removeClass('active');
        $(this).parent().addClass('active');
        $scroll = $(this.hash).offset().top;
        $scroll = $scroll - 80;
        $('html,body').animate({
            scrollTop: $scroll
        }, 500);
        e.preventDefault();
    });

    //this code is for smooth scroll and nav selector         
    $(document).on("scroll", onScroll);

    // Scroll to top button	
    $('#scroll-top').click(function () {
        $('html,body').animate({
            scrollTop: 0
        }, 500);
        return false;
    });

    //Portfolio
    $('.tiles .view').each(function () {
        var boxWidth = $(this).attr('data-imgWidth'),
            boxHeight = $(this).attr('data-imgHeight');
        (boxWidth > boxHeight) ? $(this).parent().attr('style', "width:" + parseInt(boxWidth * 200 / boxHeight) + "px"): $(this).parent().attr('style', "width:" + parseInt(180 / boxHeight * boxWidth) + "px");
        $(this).attr('data-pos', parseInt($(this).position().top) + 320);
    });

    //Filters
    $('#filters > .filter_button').click(function () {
        var thisFilter = $(this).attr('data-filter');
        $('#filters .filter_button').removeClass('filter_current');
        $(this).addClass('filter_current');
        $(thisFilter).not().hide();
        return false;
    });


    //form submit
    //Contact form
    $("#sendFeedback").click(function () {
        var spamChk = $('#spamChk').val();
        if (spamChk == '7') {
            $.ajax({
                type: "POST",
                url: "../contact.php",
                //process to mail
                data: $('form.contact-form').serialize(),
                success: function (msg) {
                    $("#thanks").html(msg);
                    //hide button and show thank you
                    $('.modal-header, form.contact-form, .modal-footer').hide();
                    setTimeout(function () {
                        $('#contactForm').modal('hide');
                    }, 2000);
                    //hide popup  
                },
                error: function () {
                    $("#thanks").html("Your message isn't deliverd!");
                }
            });
        }
    });

});

//Scrolling function 
function onScroll(event) {
    var scrollPos = $(document).scrollTop();
    $('.navbar-default .navbar-nav>li>a').each(function () {
        var currLink = $(this.hash);
        var $target = parseInt($(currLink).offset().top);
        if (scrollPos >= $target) {
            $('.navbar-default .navbar-nav>li>a').removeClass("active");
            currLink.parent().addClass("active");
        } else {
            currLink.parent().removeClass("active");
        }
    });
}

var googleMap = document.getElementById("map_canvas");
var myCenter = new google.maps.LatLng(17.504245, 78.389667);
//map Longitude and Latitude   
//Google Maps initialization
function initialize() {

    //Map Options    
    var mapProp = {
        center: myCenter,
        zoom: 12,
        disableDefaultUI: false
    };
    map = new google.maps.Map(googleMap, mapProp);

    var contentString = '<div id="info-div"><h4><strong>Graphicguru India</strong></h4>' + '<h5 class="text-book"><i class="fa fa-map-marker">&nbsp; </i>Hyderabad, INDIA </h5><h5 class="text-book"><i class="fa fa-mobile">&nbsp; </i>+91 9849 1801 563 </h5></div>' + '<ul class="social list-inline"><li class="email" data-toggle="tooltip" data-placement="top" title="Send us your request"><a href="#contactForm" data-toggle="modal"><i class="fa fa-envelope"></i></a></li><li class="twitter"><a href="https://twitter.com/dvinodeluru" target="_blank"><i class="fa fa-twitter"></i></a></li><li class="google-plus"><a href="https://plus.google.com/116799622992799001973/about" target="_blank"><i class="fa fa-google-plus"></i></a></li><li class="linkedin"><a href="http://in.linkedin.com/in/dvinodeluru" target="_blank"><i class="fa fa-linkedin"></i></a></li></ul>';

    var infowindow = new google.maps.InfoWindow({
        content: contentString,
        disableAutoPan: false,
        pixelOffset: new google.maps.Size(0, 0)

    });
    var marker = new google.maps.Marker({
        position: myCenter,
        map: map

    });
    google.maps.event.addListener(map, 'tilesloaded', function () {

        // map.panTo(marker.getPosition());
        // infowindow.setContent(contentString);
        // map.setCenter(myCenter);
        infowindow.open(map, marker);

    });
    google.maps.event.addListener(infowindow, 'domready', function () {
        $(".gm-style-iw").next("div").hide();
    });

}
google.maps.event.addDomListener(window, 'load', initialize);
