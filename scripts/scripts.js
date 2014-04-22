(function($) {
	"use strict";

	/* YandexMaps */
	ymaps.ready(function() {
		var myMap = new ymaps.Map('YMapsID', {
			center: [58.021918, 56.226271],
			zoom: 11.5,
			controls: ['geolocationControl', 'zoomControl', 'fullscreenControl']
		});

		var placemarks = [{
				coords: [58.0080, 56.186129],
				header: 'Корпус №8 Пермского университета ПГНИУ',
				text: 'Семиэтажный геолого-географический корпус. Рядом находится фонтан<br>Аудитория 208',
				schedule: 'По будням с 9 до 19 ч. (тел. 239-62-42)',
				address: 'улица Генкеля, 8',
				imageUrl: 'http://s.properm.ru/localStorage/collection/cc/c2/ee/f0/ccc2eef0_resizedScaled_659to439.jpg',
				footerText: '<a href="http://properm.ru/news/society/78466/" target="_blank">Фото © http://properm.ru/news/society/78466/</a>'
			}, {
				coords: [57.994357, 56.238606],
				header: 'Благотворительный Экологический Фонд "Обитаемый Урал" совместно с Фондом "Нанук"',
				text: '<a href="https://vk.com/ecour" target="_blank">https://vk.com/ecour</a><br><a href="https://vk.com/ethnoecocentr" target="_blank">https://vk.com/ethnoecocentr</a><br>Также cюда вы можете принести пластик, стекло, металл и макулатуру.',
				address: 'улица Елькина, 45',
				schedule: 'По будням, с 9 до 21 ч.',
				imageUrl: 'https://pp.vk.me/c607422/v607422629/4af3/GCbPDslaT5E.jpg'
			}, {
				coords: [58.008507, 56.287343],
				header: 'Пермский Центр природного земледелия "Сияние"',
				text: 'Цокольный этаж, вход с ул. Макаренко.',
				address: 'улица Макаренко 50 / улица Крупской, 61',
				schedule: 'По будням, с 9 до 21 ч.',
				imageUrl: 'http://s.properm.ru/localStorage/collection/8c/2e/2b/96/8c2e2b96_resizedScaled_659to439.jpg',
				footerText: '<a href="http://properm.ru/news/society/78466/" target="_blank">Фото © http://properm.ru/news/society/78466/</a>'
			}, {
				coords: [58.003719, 56.295197],
				header: 'Контейнер у сада соловьев',
				text: '<a href="https://vk.com/uinka" target="_blank">https://vk.com/uinka</a><br>Первый подъезд дома',
				address: 'улица Аркадия Гайдара, 3',
				schedule: 'Круглосуточно',
				imageUrl: 'http://s.properm.ru/localStorage/collection/1a/bb/6a/6./1abb6a6_resizedScaled_659to439.jpg',
				footerText: '<a href="http://properm.ru/news/society/78466/" target="_blank">Фото © http://properm.ru/news/society/78466/</a>'
			}, {
				coords: [58.056934, 56.226106],
				header: 'Кафедра «Охрана окружающей среды» ПНИПУ',
				text: '',
				address: 'улица Профессора Поздеева, 14',
				schedule: '',
				imageUrl: ''
			}
			/*Непроверенная информация
			, {
				coords: [57.982336, 56.193053],
				header: 'Общежитие №3',
				text: '',
				address: 'улица 9 Мая, 13',
				schedule: '',
				imageUrl: ''
			}*/
			, {
				coords: [58.000950, 56.221158],
				header: 'Языковой центр "Диалог"',
				text: 'Необходимо предварительно позвонить: 288-05-33 Мария',
				address: 'улица Крылова, 4',
				schedule: 'Часы работы: 9.00-18.00',
				imageUrl: 'images/photos/iRTHMuHo7zE.jpg'
			}, {
				coords: [58.017181, 56.242511],
				header: 'Подъезд №2',
				text: '',
				address: 'Сибирская улица, 1',
				schedule: 'Круглосуточно',
				imageUrl: 'images/photos/PIC002686.jpg'
			}, {
				coords: [58.005938, 56.195919],
				header: 'Общежитие №6 ПГНИУ',
				text: 'Холл общежития перед проходной',
				address: 'Петропавловская улица, 117',
				schedule: 'Часы работы: 6.00 - 24.00',
				imageUrl: 'images/photos/IMG_0788.jpg'
			}, {
				coords: [57.984906, 56.203982],
				header: 'Центр детского творчества "Сигнал"',
				text: '<a href="https://vk.com/signal_perm" target="_blank">https://vk.com/signal_perm</a><br>',
				address: 'улица Мира, 8а',
				schedule: ''
			}, {
				coords: [58.006284, 56.207138],
				header: 'Хостел П',
				text: '<a href="https://vk.com/hostelp" target="_blank">https://vk.com/hostelp</a>',
				address: 'улица Ленина, 67',
				schedule: 'Круглосуточно, обращаться к администратору',
				imageUrl: 'images/photos/aZZXBeUtLvw.jpg'
			}, {
				coords: [57.989236, 56.253743],
				header: 'Прокат туристического снаряжения "Рассвет Пармы"',
				text: 'Вход с торца',
				address: 'Комсомольский проспект, 90',
				schedule: 'Часы работы:<br>Суббота, воскресенье: 09:00–21:00<br>Будние дни 12:00–20:00',
				imageUrl: 'images/photos/DSC_3857.JPG'
			}

			/*, {
				coords: [],
				header: '',
				text: '',
				address: '',
				schedule: '',
				imageUrl: ''
			}
			*/
			/*Нужно фото
			, {
				coords: [57.962548, 56.178893],
				header: 'Магазин ярких вещей CARROT',
				text: '',
				address: 'улица Космонавта Леонова, 68',
				schedule: 'Часы работы: Понедельник–суббота — 11:00–20:00<br>Воскресенье — 11:00–18:00',
				imageUrl: ''
			}*/
			/*, {
			coords: [58.000950, 56.221158],
			header: 'Подъезд дома №?',
			text: '',
			address: 'Сергинская улица, 38а',
			schedule: 'Круглосуточно',
			imageUrl: ''
		}*/
		];

		var http = location.protocol;
		var slashes = http.concat("//");
		var host = slashes.concat(window.location.host);
		var iconImageHref = host + '/images/battery_map_icon.png';
		for (var index = 0; index < placemarks.length; index++) {
			var placeInfo = placemarks[index];

			var html = "";

			if (placeInfo.header) {
				html += "<strong>" + placeInfo.header + "</strong><br>";
			}
			if (placeInfo.address) {
				html += placeInfo.address + "<br>";
			}
			if (placeInfo.text) {
				html += placeInfo.text + "<br>";
			}
			if (placeInfo.schedule) {
				html += placeInfo.schedule + "<br>";
			}
			if (placeInfo.imageUrl) {
				html += '<img class="map_baloon_image" src="' + placeInfo.imageUrl + '" /><br>';
			}
			if (placeInfo.footerText) {
				html += placeInfo.footerText;
			}

			var myPlacemark = new ymaps.Placemark(placeInfo.coords, {
				hintContent: placeInfo.header,
				balloonContentBody: html,

			}, {
				// preset: 'islands#redDotIcon'
				iconLayout: 'default#image',
				iconImageHref: iconImageHref,
				iconImageSize: [40, 53],
				iconImageOffset: [-20, -42]
			});

			myMap.geoObjects.add(myPlacemark);
		}
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
		if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
			return;
		}
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

})(jQuery);