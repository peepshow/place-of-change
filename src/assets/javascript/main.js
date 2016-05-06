(function ($) {
  var $poster = $('.poster'),
  //$shine = $('.shine'),
  $layer = $('div[class*="layer-"]'),
  w = $(window).width(), //window width
  h = $(window).height(); //window height

$(window).on('mousemove', function(e) {
  var offsetX = 0.5 - e.pageX / w, //cursor position X
    offsetY = 0.5 - e.pageY / h, //cursor position Y
    dy = e.pageY - h / 2, //@h/2 = center of poster
    dx = e.pageX - w / 2, //@w/2 = center of poster
    theta = Math.atan2(dy, dx), //angle between cursor and center of poster in RAD
    angle = theta * 180 / Math.PI - 90, //convert rad in degrees
    offsetPoster = $poster.data('offset'),
    transformPoster = 'translateY(' + -offsetX * offsetPoster + 'px)'; //poster transform

  //get angle between 0-360
  if (angle < 0) {
    angle = angle + 360;
  }

  //gradient angle and opacity
  //$shine.css('background', 'linear-gradient(' + angle + 'deg, rgba(255,255,255,' + e.pageY / h + ') 0%,rgba(255,255,255,0) 80%)');

  //poster transform
  //$poster.css('transform', transformPoster);

  //parallax foreach layer
  $layer.each(function() {
    var $this = $(this),
      offsetLayer = $this.data('offset') || 0,
      transformLayer = 'translateX(' + offsetX * offsetLayer + 'px) translateY(' + offsetY * offsetLayer + 'px)';

    $this.css('transform', transformLayer);
  });

});
var lFollowX = 0,
    lFollowY = 0,
    x = 0,
    y = 0,
    friction = 1 / 30;

function moveBackground() {
  x += (lFollowX - x) * friction;
  y += (lFollowY - y) * friction;

  translate = 'translate(' + x + 'px, ' + y + 'px) scale(1.1)';

  $('.bg').css({
    '-webit-transform': translate,
    '-moz-transform': translate,
    'transform': translate
  });

  window.requestAnimationFrame(moveBackground);
}

$(window).on('mousemove click', function(e) {

  var lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX));
  var lMouseY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY));
  lFollowX = (20 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
  lFollowY = (10 * lMouseY) / 100;

});

//moveBackground();

var $gallery = $('.gallery').flickity({
  cellAlign: 'left',
  contain: true,
  prevNextButtons: true,
  pageDots: false,
});

$gallery.on( 'staticClick', function( event, pointer, cellElem, cellIndex ) {
  if ( cellIndex !== undefined ) {
    $gallery.flickity( 'select', cellIndex );
  }
});

//
// // Config
// var boxes     = document.querySelectorAll('.js-box'),
//     box_count = boxes.length,
//     perrywax  = document.querySelector('#perrywax'),
//     box_id    = '#js-box';
//
// // Global Controller
// var controller = new ScrollMagic.Controller({
//   globalSceneOptions: {
//     triggerHook: 0,
//     reverse: true,
//     addIndicators: true
//   }
// });
//
// // Pinned Scene. Totes optional
// new ScrollMagic.Scene({
//   triggerElement: perrywax,
//   duration: '100%'
// })
// .setPin(perrywax)
// .addTo(controller);
//
// // Box Scenes
// for (var i = 1, l = box_count; i <= l; i++) {
//   new ScrollMagic.Scene({
//     triggerElement: perrywax,
//     triggerHook: 1,
//     duration: '100%'
//   })
//   .setTween(box_id + i, 0.25, { y: '-300' * i + '%', ease: Linear.easeNone })
//   .addTo(controller);
// }

// $(function() {
//
//   $('.main_video').each(function (index, elem) {
//     // Init ScrollMagic Controller
//     var scrollMagicController = new ScrollMagic.Controller();
//
//     // Create Animations
//     var title = $(elem).find('div'),
//         text = $(elem).find('figcaption'),
//         btn = $(elem).find('a');
//
//     var tl = new TimelineMax({pause: true});
//     tl.add("start") // add timeline label
//       .fromTo(title, 0.4, { y: '40px', opacity: 0 }, { y: 0, opacity: 1, ease: Power2.EaseInOut }, "start")
//       .fromTo(text, 0.4, { y: '60px', opacity: 0 }, { y: 0, opacity: 1, ease: Power2.EaseInOut }, "start")
//       .fromTo(btn, 0.4, { y: '100px', opacity: 0 }, { y: 0, opacity: 1, ease: Power2.EaseInOut }, "start")
//
//     // Create the Scene and trigger when visible
//     var scene = new ScrollMagic.Scene({
//       triggerElement: elem,
//       offset: 0
//     })
//     .setTween(tl)
//     .addTo(scrollMagicController);
//
//     // Add debug indicators fixed on right side
//      scene.addIndicators();
//   });
// });

// Init controller
// var controller = new ScrollMagic.Controller({
//   globalSceneOptions: {
//     duration: $('section').height(),
//     triggerHook: .025,
//     reverse: true
//   }
// });
//
//
// /*
// scene_object = {
//   '[scene-name]' : {
//     '[target-scene-id]' : '[anchor-href-value]'
//   }
// }
// */
// var scenes = {
//   'intro': {
//     'intro': 'intro-anchor'
//   },
//   'theme-1': {
//     'theme-1': 'anchor1'
//   },
//   'theme-2': {
//     'theme-2': 'anchor2'
//   },
//   'theme-3': {
//     'theme-3': 'anchor3'
//   }
// }
//
//
//
// for(var key in scenes) {
//   // skip loop if the property is from prototype
//   if (!scenes.hasOwnProperty(key)) continue;
//
//   var obj = scenes[key];
//
//   for (var prop in obj) {
//     // skip loop if the property is from prototype
//     if(!obj.hasOwnProperty(prop)) continue;
//
//     new ScrollMagic.Scene({ triggerElement: '#'+prop })
//         .setClassToggle('#'+obj[prop], 'active')
//         .addTo(controller);
//   }
// }
//
//
// // Change behaviour of controller
// // to animate scroll instead of jump
// controller.scrollTo(function(target) {
//
//   TweenMax.to(window, 0.5, {
//     scrollTo : {
//       y : target,
//       autoKill : true // Allow scroll position to change outside itself
//     },
//     ease : Cubic.easeInOut
//   });
//
// });
//
//
// // Bind scroll to anchor links using Vanilla JavaScript
// var anchor_nav = document.querySelector('.anchor-nav');
//
// anchor_nav.addEventListener('click', function(e) {
//   var target = e.target,
//       id     = target.getAttribute('href');
//
//   if(id !== null) {
//     if(id.length > 0) {
//       e.preventDefault();
//       controller.scrollTo(id);
//
//       if(window.history && window.history.pushState) {
//         history.pushState("", document.title, id);
//       }
//     }
//   }
// });




	// Init ScrollMagic
  var controller = new ScrollMagic.Controller();

    // get all slides
	var slides = ["#theme-1"];

	// get all headers in slides that trigger animation
	var headers = ["#theme-1 header"];

	// get all break up sections
	//var breakSections = ["#cb01", "#cb02", "#cb03"];

	// Enable ScrollMagic only for desktop, disable on touch and mobile devices
	//if (!Modernizr.touch) {

		// SCENE 1
		// create scenes for each of the headers
		// headers.forEach(function (header, index) {
    //
		//     // number for highlighting scenes
		// 	var num = index+1;
    //
		//     // make scene
		//     var headerScene = new ScrollMagic.Scene({
		//         triggerElement: header, // trigger CSS animation when header is in the middle of the viewport
		//         offset: -95 // offset triggers the animation 95 earlier then middle of the viewport, adjust to your liking
		//     })
		//     .setClassToggle('#theme-'+num, 'is-active') // set class to active slide
		//     //.addIndicators() // add indicators (requires plugin), use for debugging
		//     .addTo(controller);
		// });

	    // SCENE 2
	    // change color of the nav for dark content blocks
	  //   breakSections.forEach(function (breakSection, index) {
    //
		//     // number for highlighting scenes
		// 	var breakID = $(breakSection).attr('id');
    //
		//     // make scene
		//     var breakScene = new ScrollMagic.Scene({
		//         triggerElement: breakSection, // trigger CSS animation when header is in the middle of the viewport
		//         triggerHook: 0.75
		//     })
		//     .setClassToggle('#'+breakID, 'is-active') // set class to active slide
		//     .on("enter", function (event) {
		// 	    $('nav').attr('class','is-light');
		// 	})
		//     .addTo(controller);
		// });

	    // SCENE 3
	    // change color of the nav back to dark
		// slides.forEach(function (slide, index) {
    //
		// 	var slideScene = new ScrollMagic.Scene({
		//         triggerElement: slide // trigger CSS animation when header is in the middle of the viewport
		//     })
		//     .on("enter", function (event) {
		// 	    $('nav').removeAttr('class');
		// 	})
		//     .addTo(controller);
	  //   });

	    // SCENE 4 - parallax effect on each of the slides with bcg
	    // move bcg container when slide gets into the view
		// slides.forEach(function (slide, index) {
    //
		// 	var $bcg = $(slide).find('.bcg');
    //
		// 	var slideParallaxScene = new ScrollMagic.Scene({
		//         triggerElement: slide,
		//         triggerHook: 1,
		//         duration: "100%"
		//     })
		//     .setTween(TweenMax.from($bcg, 1, {y: '-40%', autoAlpha: 0.3, ease:Power0.easeNone}))
		//     .addTo(controller);
	  //   });

	    // SCENE 5 - parallax effect on the intro slide
	    // move bcg container when intro gets out of the the view

	    var introTl = new TimelineMax();

	    introTl
	    	.to($('#intro header, .scroll-hint'), 0.2, {autoAlpha: 0, ease:Power1.easeNone})
	    	.to($('#intro .bcg'), 1.4, {y: '20%', ease:Power1.easeOut}, '-=0.2')
	    	.to($('#intro'), 0.7, {autoAlpha: 0.5, ease:Power1.easeNone}, '-=1.4');

		var introScene = new ScrollMagic.Scene({
	        triggerElement: '#head',
	        triggerHook: 0,
	        duration: "100%"
	    })
	    .setTween(introTl)
	    .addTo(controller);

	    // change behaviour of controller to animate scroll instead of jump
		controller.scrollTo(function (newpos) {
			TweenMax.to(window, 1, {scrollTo: {y: newpos}, ease:Power1.easeInOut});
		});

		//  bind scroll to anchor links
		// $(document).on("click", "a[href^='#']", function (e) {
		// 	var id = $(this).attr("href");
		// 	if ($(id).length > 0) {
		// 		e.preventDefault();
    //
		// 		// trigger scroll
		// 		controller.scrollTo(id);
    //     console.log(id);
    //
		// 			// if supported by the browser we can even update the URL.
		// 		if (window.history && window.history.pushState) {
		// 			history.pushState("", document.title, id);
		// 		}
		// 	}
		// });

	//}

}(jQuery));
