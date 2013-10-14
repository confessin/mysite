(function ($) {
	$.preloader = function () {
		var preloader = this;

		// PRIVATE VARS
		var loadElements = new Array();
		var doScrollUpdate = true;


		// CONSTRUCTOR
		function init() {
			$(window).scroll(function () {
				doScrollUpdate = true;
			});
			window.setInterval(tickHandler, 100);
		}

		// PRIVATE METHODS
		function tickHandler() {
			if (doScrollUpdate) {
				checkElements();
				doScrollUpdate = false;
			}
		}
		
		function checkElements() {
			for (var i in loadElements) {
				obj = loadElements[i];
				if (!obj.loaded && obj.$el.offset().top - obj.offset <= $(window).scrollTop()) {
					obj.loaded = true;
					$(obj.images).each(function(){
						$('<img/>')[0].src = this; // yeah
					});
				}
			}
		}


		// PUBLIC METHODS
		preloader.addElement = function($el, images, offset) {
			if (typeof offset === "undefined") {
				offset = 0;
			}
			if (typeof($el) === 'string') $el = $($el).first();
			loadElements.push({
				$el: $el,
				images: images,
				offset: offset,
				loaded: false
			});
		}

		// INIT
		init();
		return preloader;
	}
})(jQuery);