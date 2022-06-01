(function ($) {
	"use strict"


	/* 1. Proloder */
	$(window).on('load', function () {
		$('#preloader-active').delay(450).fadeOut('slow');
		$('body').delay(450).css({
			'overflow': 'visible'
		});
	});

	/* 2. sticky And Scroll UP */
	$(window).on('scroll', function () {
		var scroll = $(window).scrollTop();
		if (scroll < 400) {
			$(".header-sticky").removeClass("sticky-bar");
			$('#back-top').fadeOut(500);
		} else {
			$(".header-sticky").addClass("sticky-bar");
			$('#back-top').fadeIn(500);
		}
	});

	// Scroll Up
	$('#back-top a').on("click", function () {
		$('body,html').animate({
			scrollTop: 0
		}, 800);
		return false;
	});


	/* 3. slick Nav */
	// mobile_menu
	var menu = $('ul#navigation');
	if (menu.length) {
		menu.slicknav({
			prependTo: ".mobile_menu",
			closedSymbol: '+',
			openedSymbol: '-',
			closeOnClick: true
		});
	};


	/* 4. MainSlider-1 */
	// h1-hero-active
	function mainSlider() {
		var BasicSlider = $('.slider-active');
		BasicSlider.on('init', function (e, slick) {
			var $firstAnimatingElements = $('.single-slider:first-child').find('[data-animation]');
			doAnimations($firstAnimatingElements);
		});
		BasicSlider.on('beforeChange', function (e, slick, currentSlide, nextSlide) {
			var $animatingElements = $('.single-slider[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
			doAnimations($animatingElements);
		});
		BasicSlider.slick({
			pauseOnHover: true,
			autoplay: true,
			autoplaySpeed: 6000,
			dots: false,
			fade: true,
			arrows: false,
			prevArrow: '<button type="button" class="slick-prev"><i class="ti-angle-left"></i></button>',
			nextArrow: '<button type="button" class="slick-next"><i class="ti-angle-right"></i></button>',
			responsive: [{
				breakpoint: 1024,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					infinite: true,
				}
			},
			{
				breakpoint: 991,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false
				}
			},
			{
				breakpoint: 767,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
					arrows: false
				}
			}
			]
		});

		function doAnimations(elements) {
			var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
			elements.each(function () {
				var $this = $(this);
				var $animationDelay = $this.data('delay');
				var $animationType = 'animated ' + $this.data('animation');
				$this.css({
					'animation-delay': $animationDelay,
					'-webkit-animation-delay': $animationDelay
				});
				$this.addClass($animationType).one(animationEndEvents, function () {
					$this.removeClass($animationType);
				});
			});
		}
	}
	mainSlider();


	/* 4. Testimonial Active*/
	// var testimonial = $('.h1-testimonial-active');
	// if (testimonial.length) {
	// 	testimonial.slick({
	// 		dots: false,
	// 		infinite: true,
	// 		speed: 1000,
	// 		autoplay: true,
	// 		loop: true,
	// 		arrows: false,
	// 		prevArrow: '<button type="button" class="slick-prev"><i class="ti-arrow-top-left"></i></button>',
	// 		nextArrow: '<button type="button" class="slick-next"><i class="ti-arrow-top-right"></i></button>',
	// 		slidesToShow: 1,
	// 		slidesToScroll: 1,
	// 		responsive: [
	// 			{
	// 				breakpoint: 1024,
	// 				settings: {
	// 					slidesToShow: 1,
	// 					slidesToScroll: 1,
	// 					infinite: true,
	// 					dots: false,
	// 					arrow: false
	// 				}
	// 			},
	// 			{
	// 				breakpoint: 600,
	// 				settings: {
	// 					slidesToShow: 1,
	// 					slidesToScroll: 1,
	// 					arrows: false
	// 				}
	// 			},
	// 			{
	// 				breakpoint: 480,
	// 				settings: {
	// 					slidesToShow: 1,
	// 					slidesToScroll: 1,
	// 					arrows: false,
	// 				}
	// 			}
	// 		]
	// 	});
	// }


	// /* 6. Nice Selectorp  */
	// var nice_Select = $('select');
	// if (nice_Select.length) {
	// 	nice_Select.niceSelect();
	// }

	// // Brand Active
	// $('.brand-active').slick({
	// 	dots: false,
	// 	infinite: true,
	// 	autoplay: true,
	// 	speed: 400,
	// 	arrows: false,
	// 	slidesToShow: 4,
	// 	slidesToScroll: 1,
	// 	responsive: [
	// 		{
	// 			breakpoint: 1024,
	// 			settings: {
	// 				slidesToShow: 4,
	// 				slidesToScroll: 3,
	// 				infinite: true,
	// 				dots: false,
	// 			}
	// 		},
	// 		{
	// 			breakpoint: 992,
	// 			settings: {
	// 				slidesToShow: 4,
	// 				slidesToScroll: 3,
	// 				infinite: true,
	// 				dots: false,
	// 			}
	// 		},
	// 		{
	// 			breakpoint: 768,
	// 			settings: {
	// 				slidesToShow: 2,
	// 				slidesToScroll: 1
	// 			}
	// 		},
	// 		{
	// 			breakpoint: 480,
	// 			settings: {
	// 				slidesToShow: 1,
	// 				slidesToScroll: 1
	// 			}
	// 		},
	// 	]
	// });



	// Single Img slder
	// $('.man-slider-active').slick({
	// 	dots: false,
	// 	infinite: true,
	// 	autoplay: true,
	// 	speed: 400,
	// 	arrows: true,
	// 	prevArrow: '<button type="button" class="slick-prev"><i class="ti-angle-left"></i></button>',
	// 	nextArrow: '<button type="button" class="slick-next"><i class="ti-angle-right"></i></button>',
	// 	slidesToShow: 1,
	// 	slidesToScroll: 1,
	// 	responsive: [
	// 		{
	// 			breakpoint: 1024,
	// 			settings: {
	// 				slidesToShow: 1,
	// 				slidesToScroll: 1,
	// 				infinite: true,
	// 				dots: false,
	// 			}
	// 		},
	// 		{
	// 			breakpoint: 992,
	// 			settings: {
	// 				slidesToShow: 1,
	// 				slidesToScroll: 1,
	// 				infinite: true,
	// 				dots: false,
	// 			}
	// 		},
	// 		{
	// 			breakpoint: 768,
	// 			settings: {
	// 				slidesToShow: 1,
	// 				slidesToScroll: 1
	// 			}
	// 		},
	// 		{
	// 			breakpoint: 480,
	// 			settings: {
	// 				slidesToShow: 1,
	// 				slidesToScroll: 1
	// 			}
	// 		},
	// 	]
	// });



	/* 7. data-background */
	$("[data-background]").each(function () {
		$(this).css("background-image", "url(" + $(this).attr("data-background") + ")")
	});


	/* 10. WOW active */
	new WOW().init();

	// // 11. ---- Mailchimp js --------//  
	// function mailChimp() {
	// 	$('#mc_embed_signup').find('form').ajaxChimp();
	// }
	// mailChimp();


	// // 12 Pop Up Img
	// var popUp = $('.single_gallery_part, .img-pop-up');
	// if (popUp.length) {
	// 	popUp.magnificPopup({
	// 		type: 'image',
	// 		gallery: {
	// 			enabled: true
	// 		}
	// 	});
	// }
	// // 12 Pop Up Video
	// var popUp = $('.popup-video');
	// if (popUp.length) {
	// 	popUp.magnificPopup({
	// 		// disableOn: 700,
	// 		type: 'iframe',
	// 		removalDelay: 160,
	// 		preloader: false,
	// 		// fixedContentPos: false,
	// 		iframe: {
	// 			patterns: {
	// 				youtube: {
	// 					index: 'youtube.com',
	// 					id: 'v=',
	// 					src: 'https://www.youtube.com/embed/%id%?rel=0&autoplay=1&controls=0'
	// 				}
	// 			}
	// 		}
	// 	});
	// }

	/* 13. counterUp*/
	// $('.counter').counterUp({
	// 	delay: 10,
	// 	time: 3000
	// });

	/* 14. Datepicker */
	// $('#datepicker1').datepicker();

	// 15. Time Picker
	// $('#timepicker').timepicker();

	//16. Overlay
	// $(".snake").snakeify({
	// 	speed: 200
	// });


	//17.  Progress barfiller

	// $('#bar1').barfiller();
	// $('#bar2').barfiller();
	// $('#bar3').barfiller();
	// $('#bar4').barfiller();
	// $('#bar5').barfiller();
	// $('#bar6').barfiller();


	// Modal Activation
	$('.search-switch').on('click', function () {
		$('.search-model-box').fadeIn(400);
	});

	$('.search-close-btn').on('click', function () {
		$('.search-model-box').fadeOut(400, function () {
			$('#search-input').val('');
		});
	});



})(jQuery);

// Google Map
function initMap() {
	var mapEl = document.getElementById('map');

	if (mapEl && typeof google !== "undefined") {
		// var mapLatlng = new google.maps.LatLng(50.426841223319435, 30.519955240981083);
		var mapLatlng = new google.maps.LatLng(50.426663941629734, 30.519974016270343);
		var map;

		var Styles = [
			{
				"elementType": "labels.text.fill",
				"stylers": [
					{
						"color": "#4f71ad"
					}
				]
			},
			{
				"featureType": "administrative",
				"elementType": "geometry",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "poi",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "road",
				"elementType": "labels.icon",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			},
			{
				"featureType": "transit",
				"stylers": [
					{
						"visibility": "off"
					}
				]
			}
		];

		try {
			map = new google.maps.Map(mapEl, {
				center: mapLatlng,
				zoom: 17,
				disableDefaultUI: true,
				zoomControl: true,
				scaleControl: false,
				scrollwheel: false,
				disableDoubleClickZoom: true,
				styles: Styles,
			});

			const svgMarker = {
				path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
				fillColor: "#294b87",
				fillOpacity: 0.6,
				strokeWeight: 0,
				rotation: 0,
				scale: 2,
				anchor: new google.maps.Point(10, 15),
			};

			new google.maps.Marker({
				position: map.getCenter(),
				icon: svgMarker,
				map: map,
			});

			// marker.setVisible(true);
		} catch (e) {
			console.log('Error:' + e.message);
		}
	}

}