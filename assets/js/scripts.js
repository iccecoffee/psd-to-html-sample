(function(){

	// Init global DOM elements, functions and arrays
  	window.app 			 				= {el : {}, fn : {}};
	app.el['window']     				= $(window);
	app.el['document']   				= $(document);
	app.el['back-to-top'] 				= $('.back-to-top');
	app.el['html-body'] 				= $('html,body');
	app.el['animated']   				= $('.animated');
	app.el['loader']        			= $('#loader');
	app.el['mask']          			= $('#mask');
	app.el['header']          			= $('header');
	app.el['navbar-nav'] 				= $('.navbar-nav li.dropdown');
	app.el['mobile-menu']               = $('#mobile-menu');
	app.el['mixit']               		= $('#mixit');
	app.el['filters']               	= $('.filters li a, .mobile-filters li a');
	app.el['dropdown-mobile']           = $('.dropdown-mobile');

	app.fn.screenSize = function() {
		var size, width = app.el['window'].width();
		if(width < 320) size = "Not supported";
		else if(width < 480) size = "Mobile portrait";
		else if(width < 768) size = "Mobile landscape";
		else if(width < 960) size = "Tablet";
		else size = "Desktop";
		// $('#screen').html( size + ' - ' + width );
		// console.log( size, width );
	};

	$(function() {	
	    //Preloader
	    app.el['loader'].delay(700).fadeOut();
	    app.el['mask'].delay(1200).fadeOut("slow");   

  		app.el['mobile-menu'].sidr({
  			side: 'right'
  		});

		app.el['dropdown-mobile'].hide();
		$(document).on('click', '.dropdown-toggle-mobile', function(e) {
			e.preventDefault();
			var $this = $(this);
			$this.next().toggle();
			var fa = $this.find('.fa');
			if( fa.hasClass('fa-plus') ) {
				fa.removeClass('fa-plus').addClass('fa-minus');
			} else {
				fa.removeClass('fa-minus').addClass('fa-plus');
			}
		});

		// Resized based on screen size
		app.el['window'].resize(function() {
			app.fn.screenSize();

			app.el['header'].unstick();
			app.el['header'].sticky({ topSpacing: 0 });

	      	$.sidr('close', 'sidr');      			
		});	

		// fixed header
		app.el['header'].sticky({ topSpacing: 0 });

		// Resize logo to smaller
		var navBarYOffset = app.el['header'].offset().top;
		$(window).scroll(function() {
			var width = app.el['window'].width();
			if( ( $(window).scrollTop() > navBarYOffset+100 ) && width >= 768 ) {
				app.el['header'].addClass('smaller');
			} else {
				app.el['header'].removeClass('smaller');
			}
		});

	    app.el['navbar-nav'].on({
	        mouseenter: function() {
	          $(this).addClass('open');
	        }, mouseleave: function() {
	          $(this).removeClass('open');
	        }
	    });

		// fade in .back-to-top
		$(window).scroll(function () {
			if ($(this).scrollTop() > 500) {
				app.el['back-to-top'].fadeIn();
			} else {
				app.el['back-to-top'].fadeOut();
			}
		});

		// scroll body to 0px on click
		app.el['back-to-top'].click(function () {
			app.el['html-body'].animate({
				scrollTop: 0
			}, 1500);
			return false;
		});

		// Elements animation
		app.el['animated'].appear(function() {
			var element = $(this);
			var animation = element.data('animation');
			var animationDelay = element.data('delay');
			if(animationDelay) {
				setTimeout(function(){
					element.addClass( animation + " visible" );
					element.removeClass('hiding');
				}, animationDelay);
			} else {
				element.addClass( animation + " visible" );
				element.removeClass('hiding');
			}    			
		}, {accY: -150});

		// Mix it up - sortable
		app.el['filters'].click(function(e) {
			e.preventDefault();
		});
		if( app.el['mixit'].length ) {
			app.el['mixit'].mixItUp();
		}
		
	});

})();