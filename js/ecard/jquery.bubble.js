// yay, lets make precious bubbles!! :)
(function ($) {
	var
	defaults = {
		// eigenschaften
		x: 0,
		y: 0,
		scaleStart: 1,
		scaleEnd: 1,
		// animationseigenschaften
		lifetime: 2,
		growtime: .5,
		blowstrength: 1,
		elevation: -100,
		poptime: .2,
		// elementeigenschaften
		className: "bubble",
		classNamePop: "pop",
		elemKind: "div"
	};

	$.fn.addBubble = function (options) {
		options = $.extend({}, defaults, options || {});

		return this.each(function () {
			var $bubble = $("<"+options.elemKind+"/>", {
				"class" : options.className
			}).appendTo(this);
			TweenMax.set($bubble, {css: {
					scale: options.scaleStart,
					x: options.x-($bubble.outerWidth()/2),
					y: options.y-($bubble.outerHeight()/2)
			}})
			var flightpath = {
				curviness: 1.25,
				values: [
						{x: options.x - (150*options.blowstrength), y: options.y + (5*options.blowstrength)},
						{x: options.x - (200*options.blowstrength), y: options.y - (200*options.scaleEnd)}
					]
			}
			var ani = new TimelineLite({onComplete: destroyMe})
				.append([
					TweenMax.to($bubble, options.lifetime, {css:{bezier:flightpath}}),
					TweenMax.to($bubble, options.growtime, {css:{scale: options.scaleEnd}})
				])
				.append([
					TweenMax.to($bubble, .0001, {css:{className: "+="+options.classNamePop}}),
					TweenMax.to($bubble, options.poptime, {css:{autoAlpha: 0, top: "+=5"}, ease: Power1.easeOut})
				]);
			function destroyMe () {
				$bubble.remove();
			}
		});
	};
}(jQuery));