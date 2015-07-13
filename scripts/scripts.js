(function($) {
    "use strict";

    hs.graphicsDir = '/scripts/highslide_graphics/';

    /* YandexMaps */
    ymaps.ready(function() {
        var myMap = new ymaps.Map('YMapsID', {
            center: [58.037918, 56.226271],
            zoom: 11,
            controls: ['geolocationControl', 'zoomControl', 'fullscreenControl']
        });
        myMap.behaviors.disable('scrollZoom');

        $.getJSON("data/battery_points_perm.json?t=" + Math.random(), function(data) {
            var placemarks = data;

            var http = location.protocol;
            var slashes = http.concat("//");
            var host = slashes.concat(window.location.host);
            var iconImageHref = host + '/images/battery_map_icon.png';
            var iconImageSpecialHref = host + '/images/battery_map_icon_special.png';
            for (var index = 0; index < placemarks.length; index++) {
                var placeInfo = placemarks[index];

                var html = "";

                if (placeInfo.header) {
                    html += "<strong>" + placeInfo.header + "</strong><br>";
                }
                if (placeInfo.address) {
                    html += placeInfo.address + "<br>";
                }
                if (placeInfo.links) {
                    for (var urlIndex in placeInfo.links) {
                        var url = placeInfo.links[urlIndex];
                        html += "<a href='" + url + "' target='_blank'>" + url + "</a>" + "<br>";
                    }
                }
                if (placeInfo.text) {
                    html += placeInfo.text + "<br>";
                }
                if (placeInfo.schedule) {
                    html += placeInfo.schedule + "<br>";
                }
                if (placeInfo.imageUrl) {
                    var id = 'mapImage' + index;
                    html += '<a href="' + placeInfo.imageUrl + '" class="highslide" onclick="return hs.expand(this)">' +
                        '<img class="map_baloon_image highslide" id="' + id + '" src="' + placeInfo.imageUrl + '" />' +
                        '</a>' +
                        '<br>';
                }
                if (placeInfo.footerText) {
                    html += placeInfo.footerText;
                }
                if (placeInfo.footerLinks) {
                    for (var urlIndex in placeInfo.footerLinks) {
                        var url = placeInfo.footerLinks[urlIndex];
                        html += "<a href='" + url.link + "' target='_blank'>" + url.text + "</a>" + "<br>";
                    }
                }

                var icon = placeInfo.special == true ? iconImageHref ? iconImageSpecialHref;
                var myPlacemark = new ymaps.Placemark(placeInfo.coords, {
                    hintContent: placeInfo.header,
                    balloonContentBody: html,

                }, {
                    // preset: 'islands#redDotIcon'
                    iconLayout: 'default#image',
                    iconImageHref: icon,
                    iconImageSize: [40, 53],
                    iconImageOffset: [-20, -42]
                });

                myMap.geoObjects.add(myPlacemark);
            }
        });

    });

    var http = location.protocol;
    var slashes = http.concat("//");
    var host = slashes.concat(window.location.hostname);
    var title = "Не выбрасывай батарейку! Узнай, где можно сдать её в утилизацию";
    var url = host;
    var imageUrl = host + "/images/battery_logo_vk.png";

    $('#twitter-share-button').click(function(event) {
        var shareUrl = "https://twitter.com/intent/tweet?" + "text=" + encodeURIComponent(title + " #batterymap #perm") + "&url=" + url;
        window.open(shareUrl, 'newwindow', 'width=550, height=550');
    });

    $('#vk-share-button').click(function(event) {
        var shareUrl = "http://vkontakte.ru/share.php?url=" + url + "&image=" + imageUrl;
        window.open(shareUrl, 'newwindow', 'width=550, height=550');
    });

    $('#facebook-share-button').click(function(event) {
        var shareUrl = "https://facebook.com/sharer.php?u=" + url;
        window.open(shareUrl, 'newwindow', 'width=550, height=550');
    });

    $('#gplus-share-button').click(function(event) {
        var shareUrl = "https://plus.google.com/share?url=" + url;
        window.open(shareUrl, 'newwindow', 'width=550, height=550');
    });

    /* Yandex events */
    $("[data-yandex-event]").click(function() {
        window.yaCounter24634694.reachGoal(this.getAttribute("data-yandex-event"));
    });

    /* SMOOTH SCROLL */
    $('.nav-link').click(function(event) {
        event.preventDefault();
        $('html,body').animate({
            scrollTop: $(this.hash).offset().top - $('.navbar-header').height()
        }, 500);
    });

    /* BACKGROUND PARALLAX */
    function parallax() {
        var scrolled = $(window).scrollTop();
        $('.background').css('top', -(scrolled * 0.5) + 'px');
    }
    $(window).scroll(function(e) {
        if ($(window).width() > 500) {
            parallax();
        }
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
                url: action,
                data: {
                    contactname: $('#contact-name').val(),
                    contactemail: $('#contact-email').val(),
                    contactwebsite: $('#contact-website').val(),
                    contactmessage: $('#contact-message').val()
                },
                success: function() {
                    $('#contact-error').fadeOut();
                    $('#contact-success').fadeOut();
                    $('#contact-success').html('Сообщение успешно отправлено! Спасибо за участие').fadeIn();
                },
                error: function() {
                    $('#contact-error').fadeOut();
                    $('#contact-success').fadeOut();
                    $('#contact-error').html('Извините, возникла ошибка.').fadeIn();
                }
            });
        }
        return false;
    });

    if ($(window).width() > 500) {
        /* ANIMATIONS */
        $('.navbar-brand').bind('inview', function(event, visible) {
            if (visible === true) {
                $(this).addClass('animated fadeInLeft');
            }
        });
        $('.navbar-nav a').bind('inview', function(event, visible) {
            if (visible === true) {
                $(this).addClass('animated fadeInRight');
            }
        });
        $('.main').bind('inview', function(event, visible) {
            if (visible === true) {
                $(this).addClass('animated fadeInUp');
            }
        });
        $('.feature-item').bind('inview', function(event, visible) {
            if (visible === true) {
                $(this).addClass('animated fadeInUp');
            }
        });
        $('.heading').bind('inview', function(event, visible) {
            if (visible === true) {
                $(this).addClass('animated fadeInDown');
            }
        });
        $('#newsletter-form').bind('inview', function(event, visible) {
            if (visible === true) {
                $(this).addClass('animated bounceIn');
            }
        });
        $('.feature-section-left').bind('inview', function(event, visible) {
            if (visible === true) {
                $(this).addClass('animated fadeInLeft');
            }
        });
        $('.feature-section-right').bind('inview', function(event, visible) {
            if (visible === true) {
                $(this).addClass('animated fadeInRight');
            }
        });
        $('.pricing-table').bind('inview', function(event, visible) {
            if (visible === true) {
                $(this).addClass('animated fadeInUp');
            }
        });
        $('.pricing-table').bind('inview', function(event, visible) {
            if (visible === true) {
                $(this).addClass('animated fadeInUp');
            }
        });
        $('.grid li').bind('inview', function(event, visible) {
            if (visible === true) {
                $(this).addClass('animated fadeIn');
            }
        });
        $('.contact-infos').bind('inview', function(event, visible) {
            if (visible === true) {
                $(this).addClass('animated fadeInLeft');
            }
        });
        $('#contact-form').bind('inview', function(event, visible) {
            if (visible === true) {
                $(this).addClass('animated fadeInRight');
            }
        });
        $('.copyright').bind('inview', function(event, visible) {
            if (visible === true) {
                $(this).addClass('animated fadeInLeft');
            }
        });
        $('.footer-middle').bind('inview', function(event, visible) {
            if (visible === true) {
                $(this).addClass('animated bounceIn');
            }
        });
        $('.social-icons').bind('inview', function(event, visible) {
            if (visible === true) {
                $(this).addClass('animated fadeInRight');
            }
        });
    }

})(jQuery);