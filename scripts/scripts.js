(function($) {
    "use strict";
    
    /* SMOOTH SCROLL */
    $('.nav-link').click(function(event){		
        event.preventDefault();
        $('html,body').animate({scrollTop:$(this.hash).offset().top}, 500);
    });
    
    /* BACKGROUND PARALLAX */
    function parallax() {
        var scrolled = $(window).scrollTop();
        $('.background').css('top', -(scrolled * 0.5) + 'px');
    }
    $(window).scroll(function(e) {
        parallax();
    });
    
    /* FlexSlider */
    $('.flexslider').flexslider({
        prevText: '<i class="fa fa-chevron-left"></i>',
        nextText: '<i class="fa fa-chevron-right"></i>'
    });
    
    /* FITVIDS */
    $(".video-container").fitVids();
    
    /* TOOLTIPS */
    $('.tool-tip').tooltip();
    
    /* CONTACT FORM */
	$('#contact-form').ketchup().submit(function() {
        if ($(this).ketchup('isValid')) {
            var action = $(this).attr('action');
            $.ajax({
                type: "POST",
                url : action,
                data: {
                    contactname: $('#contact-name').val(),
                    contactemail: $('#contact-email').val(),
                    contactwebsite: $('#contact-website').val(),
                    contactmessage: $('#contact-message').val()
                },
                success: function() {
                    $('#contact-error').fadeOut();
                    $('#contact-success').fadeOut();
                    $('#contact-success').html('Success! Thanks for contacting us!').fadeIn();
                },
                error: function() {
                    $('#contact-error').fadeOut();
                    $('#contact-success').fadeOut();
                    $('#contact-error').html('Sorry, an error occurred.').fadeIn();
                }
            });
        }
        return false;
    });
	
	/* NEWSLETTER FORM */
	$('#newsletter-form').ketchup().submit(function() {
		if ($(this).ketchup('isValid')) {
			var action = $(this).attr('action');
			$.ajax({
				url: action,
				type: 'POST',
				data: {
					newsletter_email: $('#newsletter-email').val()
				},
				success: function(data) {
                    $('#newsletter-error').fadeOut();
                    $('#newsletter-success').fadeOut();
                    $('#newsletter-success').html(data).fadeIn();
                },
                error: function() {
                    $('#newsletter-error').fadeOut();
                    $('#newsletter-success').fadeOut();
                    $('#newsletter-error').html('Sorry, an error occurred.').fadeIn();
                }
			});
		}
		return false;
	});
    
    /* ANIMATIONS */
    $('.navbar-brand').bind('inview', function (event, visible) {
		if (visible === true) {
			$(this).addClass('animated fadeInLeft');
		}
	});
    $('.navbar-nav a').bind('inview', function (event, visible) {
		if (visible === true) {
			$(this).addClass('animated fadeInRight');
		}
	});
    $('.main').bind('inview', function (event, visible) {
		if (visible === true) {
			$(this).addClass('animated fadeInUp');
		}
	});
    $('.feature-item').bind('inview', function (event, visible) {
		if (visible === true) {
			$(this).addClass('animated fadeInUp');
		}
	});
    $('.heading').bind('inview', function (event, visible) {
		if (visible === true) {
			$(this).addClass('animated fadeInDown');
		}
	});
    $('#newsletter-form').bind('inview', function (event, visible) {
		if (visible === true) {
			$(this).addClass('animated bounceIn');
		}
	});
    $('.feature-section-left').bind('inview', function (event, visible) {
		if (visible === true) {
			$(this).addClass('animated fadeInLeft');
		}
	});
    $('.feature-section-right').bind('inview', function (event, visible) {
		if (visible === true) {
			$(this).addClass('animated fadeInRight');
		}
	});
    $('.pricing-table').bind('inview', function (event, visible) {
		if (visible === true) {
			$(this).addClass('animated fadeInUp');
		}
	});
    $('.pricing-table').bind('inview', function (event, visible) {
		if (visible === true) {
			$(this).addClass('animated fadeInUp');
		}
	});
    $('.grid li').bind('inview', function (event, visible) {
		if (visible === true) {
			$(this).addClass('animated fadeIn');
		}
	});
    $('.contact-infos').bind('inview', function (event, visible) {
		if (visible === true) {
			$(this).addClass('animated fadeInLeft');
		}
	});
    $('#contact-form').bind('inview', function (event, visible) {
		if (visible === true) {
			$(this).addClass('animated fadeInRight');
		}
	});
    $('.copyright').bind('inview', function (event, visible) {
		if (visible === true) {
			$(this).addClass('animated fadeInLeft');
		}
	});
    $('.footer-middle').bind('inview', function (event, visible) {
		if (visible === true) {
			$(this).addClass('animated bounceIn');
		}
	});
    $('.social-icons').bind('inview', function (event, visible) {
		if (visible === true) {
			$(this).addClass('animated fadeInRight');
		}
	});
    
})(jQuery);