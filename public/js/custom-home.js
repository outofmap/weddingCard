//////////////////////////////////////////
// INDEX ////////////////////////////////
// TABLE OF CONTENT ////////////////////
// 1. Google Map code /////////////////
// 2. Scroll Effect code /////////////
// 3. CountDown /////////////////////
// 4. Background slider ////////////
// 5. Contact Form Validation /////
//////////////////////////////////
/////////// END OF INDEX ////////


(function ($) {

	"use strict";

	////////////////////////////////////////////////
	/////////// 1. code for Google Map /////////////
	///////////////////////////////////////////////

	var map;

	map = new GMaps({
		//37.533734, 126.977623
		el: '#gmap',
		lat: 37.533734,
		lng: 126.977623244174,
		scrollwheel:false,
		zoom: 16,
		zoomControl : true,
		panControl : true,
		streetViewControl : true,
		mapTypeControl: false,
		overviewMapControl: false,
		clickable: true
	});

	var image = '';
	map.addMarker({
		lat: 37.533734,
		lng: 126.977623244174,
		infoWindow: {
			content: '<p class="map-info"><strong>국방컨벤션 1층 에메랄드 홀</strong> <br/>서울시 용산구 이태원로 22<br/>02-748-0707</p>'
		}
	});
	// map.addMarker({
	// 	lat: 34.056459,
	// 	lng: -118.247132,
	// 	infoWindow: {
	// 		content: '<p class="map-info"><strong>Los Angeles</strong> <br/> Olvera Street <br/> (058) 569 3668</p>'
	// 	}
	// });
	// map.addMarker({
	// 	lat: 34.057469,
	// 	lng: -118.237551,
	// 	infoWindow: {
	// 		content: '<p class="map-info"><strong>Los Angeles</strong> <br/> Grand Park <br/> (058) 569 3668</p>'
	// 	}
	// });


	var styles = [

		{
			"featureType": "road",
			"stylers": [
				{ "color": "#ffffff" }
			]
		},{
			"featureType": "water",
			"stylers": [
				{ "color": "#99b3cc" }
			]
		},{
			"featureType": "landscape",
			"stylers": [
				{ "color": "#f2efe9" }
			]
		},{
			"elementType": "labels.text.fill",
			"stylers": [
				{ "color": "#d3cfcf" }
			]
		},{
			"featureType": "poi",
			"stylers": [
				{ "color": "#ded2ac" }
			]
		},{
			"elementType": "labels.text",
			"stylers": [
				{ "saturation": 1 },
				{ "weight": 0.1 },
				{ "color": "#000000" }
			]
		}

	];

	map.addStyle({
		styledMapName:"Styled Map",
		styles: styles,
		mapTypeId: "map_style"
	});

	map.setStyle("map_style");



	//////////////////////////////////////////////////////////////////
	///////////////// 2. navigation scroll effect ///////////////////
	////////////////////////////////////////////////////////////////


	$(window).on('scroll', function(event) {
		Scroll();
	});

	$('.main_navigation ul > li > a').click(function() {
		$(this).addClass('active');
		$('html, body').animate({scrollTop: $(this.hash).offset().top -145}, 1000);
		return false;
	});

	// User define function
	function Scroll() {
		var contentTop      =   [];
		var contentBottom   =   [];
		var winTop      =   $(window).scrollTop();
		var rangeTop    =   200;
		var rangeBottom =   500;
		// $('.main_navigation > ul').find('.scroll > a').each(function(){
		// 	contentTop.push( $( $(this).attr('href') ).offset().top);
		// 	contentBottom.push( $( $(this).attr('href') ).offset().top + $( $(this).attr('href') ).height() );
		// })
		$.each( contentTop, function(i){
			if ( winTop > contentTop[i] - rangeTop ){
				$('.main_navigation > ul > li.scroll')
				.removeClass('active')
				.eq(i).addClass('active');
			}
		})

	};



	///////////////////////////////////////////////////////
	/////////////// 3. code for CountDown ////////////////
	/////////////////////////////////////////////////////

	// add your countdown wrapper and countdown timer
	// first parameter is countdown wrapper and 2nd parameter countdown finisher time
	var futuredate=new cdtime("countdowncontainer", "August 20, 2015 04:30:00");
	futuredate.displaycountdown("days", formatresults);




	//////////////////////////////////////////////////////////
	///////////////// 4. code for Background Slider /////////
	////////////////////////////////////////////////////////


	$(document).on('ready', function() {

		//pretty photo activator
		$("a[data-gal^='prettyPhoto']").prettyPhoto();

		var i =0;
		var images = [
			// add your image url here
			'images/slider/image-1.jpg',
			'images/slider/image-2.jpg',
			'images/slider/image-3.jpg',
			'images/slider/image-4.jpg'
		];
		// grabing the container of slider
		var image = $('#slider');
		//Change image at regular intervals
		setInterval(function(){
			image.fadeOut(500, function () {
				image.css('background-image', 'url(' + images [i++] +')');
				image.fadeIn(500);
			});
			if(i == images.length)
			i = 0;
		}, 6000);
	});




	///////////////////////////////////////////////////
	////////////// 5. contact form validation ////////
	/////////////////////////////////////////////////


	// Function that validates email address through a regular expression.
	function validateEmail(email_val) {
		var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/;
		if (filter.test(email_val)) {
			return true;
		}
		else {
			return false;
		}
	}

	// getting input fields.
	var name = $('.contact-form input.name');
	var password = $('.contact-form input.password');
	var message = $('#message');

	// removing response
	name.on('focus', function () {
		name.removeClass('error');
		$('.contact-form p.output').remove();
	});
	password.on('focus', function () {
		password.removeClass('error');
		$('.contact-form p.output').remove();
	});
	message.on('focus', function () {
		message.removeClass('error');
	});

	//making validation while form submission
	$('.contact-form').on('submit', function (e) {
		e.preventDefault();
		var formURL = $(this).attr("action");
		console.log("postURL"+formURL);
		var postData = $(this).serialize();
		console.log("postData"+postData);
		if (name.val() === '') {
			name.addClass('error');
			return false;
		}
		else if ( password.val() === '' ) {
			password.addClass('error');
			return false;
		}
		else if ( message.val() === '' ) {
			message.addClass('error');
			return false;
		}
		else if (name.val()!=='' && password.val()!=='' && message.val()!=='') {
			var result;
			// sending value with ajax request
			// $.post('/writeMessage', $(this).serialize(), function (response) {
			$.ajax({
				url:"/writeMessage",
				type:"POST",
				data:postData
			}).done(function (data, status) {
				//return data from server
				var writer = data.name;
				var letter = data.message;
				console.log("writer"+data.name);
				console.log("letter "+data.message);
				$('.contact-form').append("<span>전송완료!</span>");
			}).fail(function () {
				alert("message posting error.");
			});
			$(this).find('input').val('');
			$(this).find('textarea').val('');
			// return false;
		}
	});

})(jQuery);
