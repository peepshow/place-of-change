(function ($) {

$('#scene').parallax({
  relativeInput: false,
  clipRelativeInput: false,
  calibrationThreshold: 100,
  calibrationDelay: 500,
  supportDelay: 500,
  calibrateX: false,
  calibrateY: true,
  invertX: true,
  invertY: true,
  limitX: false,
  limitY: false,
  scalarX: 5.0,
  scalarY: 5.0,
  frictionX: 0.1,
  frictionY: 0.1,
  originX: 0.5,
  originY: 0.5
});





$(document).ready(function () {
  var player = null;
  $("#video-toggler").click(function () {
      console.log("clicked");
      var url = $(this).attr('data-url');

      $.featherlight('#video-lightbox', {
          afterContent: function (event) {
              console.log("open");
              $('.featherlight-inner').append(createPlayerDOM(url));
              console.log("DOM added");
          },
          afterOpen: function (event) {
              player = videojs('#video-player', {"controls": true, "autoplay": false, "preload": "meta_data"}, function () {
                  console.log('Good to go!');
                  // if you don't trust autoplay for some reason
              });
          },
          beforeClose: function (event) {
              player.pause();
              player.dispose();
          }});
  });

  function createPlayerDOM(url) {
      var playerContainer = null;
      playerContainer = document.createElement('div');
      var playerDOM = null;
      playerDOM = document.createElement('video');
      playerDOM.id = 'video-player';
      playerDOM.className += 'video-js vjs-polyzor-skin';
      playerDOM.setAttribute('preload', 'meta_data');
      playerDOM.controls = true;
      // Create the video sources
      var video_mp4 = document.createElement('source');
      video_mp4.setAttribute('src', url +'.mp4');
      video_mp4.setAttribute('type', 'video/mp4');
      var video_webm = document.createElement('source');
      video_webm.setAttribute('src', url +'.webm');
      video_webm.setAttribute('type', 'video/webm');
      playerDOM.appendChild(video_mp4);
      playerDOM.appendChild(video_webm);
      playerContainer.appendChild(playerDOM);
      return playerContainer;
  }
});
jQuery(document).ready(function($){
	//trigger the animation - open modal window
	$('[data-type="modal-trigger"]').on('click', function(){
		var actionBtn = $(this),
			scaleValue = retrieveScale(actionBtn.next('.cd-modal-bg'));

		actionBtn.addClass('to-circle');
		actionBtn.next('.cd-modal-bg').addClass('is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			animateLayer(actionBtn.next('.cd-modal-bg'), scaleValue, true);
		});

		//if browser doesn't support transitions...
		if(actionBtn.parents('.no-csstransitions').length > 0 ) animateLayer(actionBtn.next('.cd-modal-bg'), scaleValue, true);
	});

	//trigger the animation - close modal window
	$('.cd-section .cd-modal-close').on('click', function(){
		closeModal();
	});
	$(document).keyup(function(event){
		if(event.which=='27') closeModal();
	});

	$(window).on('resize', function(){
		//on window resize - update cover layer dimention and position
		if($('.cd-section.modal-is-visible').length > 0) window.requestAnimationFrame(updateLayer);
	});

	function retrieveScale(btn) {
		var btnRadius = btn.width()/2,
			left = btn.offset().left + btnRadius,
			top = btn.offset().top + btnRadius - $(window).scrollTop(),
			scale = scaleValue(top, left, btnRadius, $(window).height(), $(window).width());

		btn.css('position', 'fixed').velocity({
			top: top - btnRadius,
			left: left - btnRadius,
			translateX: 0,
		}, 0);

		return scale;
	}

	function scaleValue( topValue, leftValue, radiusValue, windowW, windowH) {
		var maxDistHor = ( leftValue > windowW/2) ? leftValue : (windowW - leftValue),
			maxDistVert = ( topValue > windowH/2) ? topValue : (windowH - topValue);
		return Math.ceil(Math.sqrt( Math.pow(maxDistHor, 2) + Math.pow(maxDistVert, 2) )/radiusValue);
	}

	function animateLayer(layer, scaleVal, bool) {
		layer.velocity({ scale: scaleVal }, 400, function(){
			$('body').toggleClass('overflow-hidden', bool);
			(bool)
				? layer.parents('.cd-section').addClass('modal-is-visible').end().off('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend')
				: layer.removeClass('is-visible').removeAttr( 'style' ).siblings('[data-type="modal-trigger"]').removeClass('to-circle');
		});
	}

	function updateLayer() {
		var layer = $('.cd-section.modal-is-visible').find('.cd-modal-bg'),
			layerRadius = layer.width()/2,
			layerTop = layer.siblings('.btn').offset().top + layerRadius - $(window).scrollTop(),
			layerLeft = layer.siblings('.btn').offset().left + layerRadius,
			scale = scaleValue(layerTop, layerLeft, layerRadius, $(window).height(), $(window).width());

		layer.velocity({
			top: layerTop - layerRadius,
			left: layerLeft - layerRadius,
			scale: scale,
		}, 0);
	}

	function closeModal() {
		var section = $('.cd-section.modal-is-visible');
		section.removeClass('modal-is-visible').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
			animateLayer(section.find('.cd-modal-bg'), 1, false);
		});
		//if browser doesn't support transitions...
		if(section.parents('.no-csstransitions').length > 0 ) animateLayer(section.find('.cd-modal-bg'), 1, false);
	}
});//   var $poster = $('.poster'),
//   //$shine = $('.shine'),
//   $layer = $('div[class*="layer-"]'),
//   w = $(window).width(), //window width
//   h = $(window).height(); //window height
//
// $(window).on('mousemove', function(e) {
//   var offsetX = 0.5 - e.pageX / w, //cursor position X
//     offsetY = 0.5 - e.pageY / h, //cursor position Y
//     dy = e.pageY - h / 2, //@h/2 = center of poster
//     dx = e.pageX - w / 2, //@w/2 = center of poster
//     theta = Math.atan2(dy, dx), //angle between cursor and center of poster in RAD
//     angle = theta * 180 / Math.PI - 90, //convert rad in degrees
//     offsetPoster = $poster.data('offset'),
//     transformPoster = 'translateY(' + -offsetX * offsetPoster + 'px)'; //poster transform
//
//   //get angle between 0-360
//   if (angle < 0) {
//     angle = angle + 360;
//   }
//
//   //gradient angle and opacity
//   //$shine.css('background', 'linear-gradient(' + angle + 'deg, rgba(255,255,255,' + e.pageY / h + ') 0%,rgba(255,255,255,0) 80%)');
//
//   //poster transform
//   //$poster.css('transform', transformPoster);
//
//   //parallax foreach layer
//   $layer.each(function() {
//     var $this = $(this),
//       offsetLayer = $this.data('offset') || 0,
//       transformLayer = 'translateX(' + offsetX * offsetLayer + 'px) translateY(' + offsetY * offsetLayer + 'px)';
//
//     $this.css('transform', transformLayer);
//   });
//
// });
//
// var lFollowX = 0,
//     lFollowY = 0,
//     x = 0,
//     y = 0,
//     friction = 1 / 30;
//
// function moveBackground() {
//   x += (lFollowX - x) * friction;
//   y += (lFollowY - y) * friction;
//
//   translate = 'translate(' + x + 'px, ' + y + 'px) scale(1.1)';
//
//   $('.bg').css({
//     '-webit-transform': translate,
//     '-moz-transform': translate,
//     'transform': translate
//   });
//
//   window.requestAnimationFrame(moveBackground);
// }
//
// $(window).on('mousemove click', function(e) {
//
//   var lMouseX = Math.max(-100, Math.min(100, $(window).width() / 2 - e.clientX));
//   var lMouseY = Math.max(-100, Math.min(100, $(window).height() / 2 - e.clientY));
//   lFollowX = (20 * lMouseX) / 100; // 100 : 12 = lMouxeX : lFollow
//   lFollowY = (10 * lMouseY) / 100;
//
// });

//moveBackground();


// var $gallery = $('.gallery').flickity({
//   cellAlign: 'left',
//   contain: true,
//   prevNextButtons: true,
//   pageDots: false,
// });
//
// $gallery.on( 'staticClick', function( event, pointer, cellElem, cellIndex ) {
//   if ( cellIndex !== undefined ) {
//     $gallery.flickity( 'select', cellIndex );
//   }
// });




$( document ).ready( function() {
  // scrollTo('.mainMenu-links')		;
  scrollTo();
  scrollToTop();
});

function scrollTo () {
  $('#theme_nav li a').click(function(e) {
      e.preventDefault();
      $('.mainMenu a').removeClass('active');
      $(this).addClass('active');

     var distanceTopToSection = $( '#' +  $(this).data('target')).offset().top;

    		 $( 'body, html' ).animate({scrollTop:distanceTopToSection }, 'slow');
  });
}

/*function scrollTo (classLink) {
   $('a', classLink).on('click', function(e) {
     e.preventDefault();
     var distanceTopToSection = $( '#' +  $(this).data('target')).offset().top;
     $( 'body, html' ).animate({scrollTop:distanceTopToSection }, 'slow');
  });
}*/

function scrollToTop () {
  var backToTop = $('.backToTop');
  var showBackTotop = $(window).height();
  backToTop.hide();

  var children = $("#theme_nav li").children();
  var tab = [];
  for (var i=0; i < children.length; i++) {
    console.log(children[i]);
    var child = children[i];
    var ahref = $(child).attr('href');
    console.log(ahref);
    tab.push(ahref);
  }


  $(window).scroll( function() {
    var windowScrollTop = $(window).scrollTop();
    if( windowScrollTop > showBackTotop  ) {
      backToTop.fadeIn('slow');
    } else {
      backToTop.fadeOut('slow');
    }

    var windowHeight = $(window).height();
    var docHeight = $(document).height();

    for (var i=0; i < tab.length; i++) {
        var link = tab[i];
        var divPos = $(link).offset().top;
        var divHeight = $(link).height();
        if (windowScrollTop >= divPos && windowScrollTop < (divPos + divHeight)) {
            $("#theme_nav a[href='" + link + "']").addClass("active");
        } else {
            $("#theme_nav a[href='" + link + "']").removeClass("active");
        }
    }

    if(windowScrollTop + windowHeight == docHeight) {
        if (!$("#theme_nav li:last-child a").hasClass("active")) {
            var navActive = $(".active").attr("href");
            $("#theme_nav a[href='" + navActive + "']").removeClass("active");
            $("#theme_nav li:last-child a").addClass("active");
        }
    }
  });

  backToTop.click( function(e) {
    e.preventDefault();
    $(' #theme_nav li a ').removeClass( 'active' );
    $(' #theme_nav li a:first ').addClass( 'active' );
    $(' body, html ').animate( {scrollTop : 0}, 'slow' );
  });
}

$("#flat").flipster({
    style: 'flat',
    buttons: true,
    scrollwheel: false,
    spacing: 0
});


}(jQuery));


var Modal = (function() {

  var trigger = $qsa('.modal__trigger'); // what you click to activate the modal
  var modals = $qsa('.modal'); // the entire modal (takes up entire window)
  var modalsbg = $qsa('.modal__bg'); // the entire modal (takes up entire window)
  var content = $qsa('.modal__content'); // the inner content of the modal
	var closers = $qsa('.modal__close'); // an element used to close the modal
  var w = window;
  var isOpen = false;
	var contentDelay = 400; // duration after you click the button and wait for the content to show
  var len = trigger.length;

  // make it easier for yourself by not having to type as much to select an element
  function $qsa(el) {
    return document.querySelectorAll(el);
  }

  var getId = function(event) {

    event.preventDefault();
    var self = this;
    // get the value of the data-modal attribute from the button
    var modalId = self.dataset.modal;
    var len = modalId.length;
    // remove the '#' from the string
    var modalIdTrimmed = modalId.substring(1, len);
    // select the modal we want to activate
    var modal = document.getElementById(modalIdTrimmed);
    // execute function that creates the temporary expanding div
    makeDiv(self, modal);
  };

  var makeDiv = function(self, modal) {

    var fakediv = document.getElementById('modal__temp');

    /**
     * if there isn't a 'fakediv', create one and append it to the button that was
     * clicked. after that execute the function 'moveTrig' which handles the animations.
     */

    if (fakediv === null) {
      var div = document.createElement('div');
      div.id = 'modal__temp';
      self.appendChild(div);
      moveTrig(self, modal, div);
    }
  };

  var moveTrig = function(trig, modal, div) {
    var trigProps = trig.getBoundingClientRect();
    var m = modal;
    var mProps = m.querySelector('.modal__content').getBoundingClientRect();
    var transX, transY, scaleX, scaleY;
    var xc = w.innerWidth / 2;
    var yc = w.innerHeight / 2;

    // this class increases z-index value so the button goes overtop the other buttons
    trig.classList.add('modal__trigger--active');

    // these values are used for scale the temporary div to the same size as the modal
    scaleX = mProps.width / trigProps.width;
    scaleY = mProps.height / trigProps.height;

    scaleX = scaleX.toFixed(3); // round to 3 decimal places
    scaleY = scaleY.toFixed(3);


    // these values are used to move the button to the center of the window
    transX = Math.round(xc - trigProps.left - trigProps.width / 2);
    transY = Math.round(yc - trigProps.top - trigProps.height / 2);

		// if the modal is aligned to the top then move the button to the center-y of the modal instead of the window
    if (m.classList.contains('modal--align-top')) {
      transY = Math.round(mProps.height / 2 + mProps.top - trigProps.top - trigProps.height / 2);
    }


		// translate button to center of screen
		trig.style.transform = 'translate(' + transX + 'px, ' + transY + 'px)';
		trig.style.webkitTransform = 'translate(' + transX + 'px, ' + transY + 'px)';
		// expand temporary div to the same size as the modal
		div.style.transform = 'scale(' + scaleX + ',' + scaleY + ')';
		div.style.webkitTransform = 'scale(' + scaleX + ',' + scaleY + ')';


		window.setTimeout(function() {
			window.requestAnimationFrame(function() {
				open(m, div);
			});
		}, contentDelay);

  };

  var open = function(m, div) {

    if (!isOpen) {
      // select the content inside the modal
      var content = m.querySelector('.modal__content');
      // reveal the modal
      m.classList.add('modal--active');
      // reveal the modal content
      content.classList.add('modal__content--active');

      /**
       * when the modal content is finished transitioning, fadeout the temporary
       * expanding div so when the window resizes it isn't visible ( it doesn't
       * move with the window).
       */

      content.addEventListener('transitionend', hideDiv, false);

      isOpen = true;
    }

    function hideDiv() {
      // fadeout div so that it can't be seen when the window is resized
      div.style.opacity = '0';
      content.removeEventListener('transitionend', hideDiv, false);
    }
  };

  var close = function(event) {

		event.preventDefault();
    event.stopImmediatePropagation();

    var target = event.target;
    var div = document.getElementById('modal__temp');

    /**
     * make sure the modal__bg or modal__close was clicked, we don't want to be able to click
     * inside the modal and have it close.
     */

    if (isOpen && target.classList.contains('modal__bg') || target.classList.contains('modal__close')) {

      // make the hidden div visible again and remove the transforms so it scales back to its original size
      div.style.opacity = '1';
      div.removeAttribute('style');

			/**
			* iterate through the modals and modal contents and triggers to remove their active classes.
      * remove the inline css from the trigger to move it back into its original position.
			*/

			for (var i = 0; i < len; i++) {
				modals[i].classList.remove('modal--active');
				content[i].classList.remove('modal__content--active');
				trigger[i].style.transform = 'none';
        trigger[i].style.webkitTransform = 'none';
				trigger[i].classList.remove('modal__trigger--active');
			}

      // when the temporary div is opacity:1 again, we want to remove it from the dom
			div.addEventListener('transitionend', removeDiv, false);

      isOpen = false;

    }

    function removeDiv() {
      setTimeout(function() {
        window.requestAnimationFrame(function() {
          // remove the temp div from the dom with a slight delay so the animation looks good
          div.remove();
        });
      }, contentDelay - 50);
    }

  };

  var bindActions = function() {
    for (var i = 0; i < len; i++) {
      trigger[i].addEventListener('click', getId, false);
      closers[i].addEventListener('click', close, false);
      modalsbg[i].addEventListener('click', close, false);
    }
  };

  var init = function() {
    bindActions();
  };

  return {
    init: init
  };

}());

Modal.init();
