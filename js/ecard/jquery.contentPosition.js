/* 
$.(elem).position() doesnt include borders, margins and paddings - this one does
 */
(function ($) {
	var
	defaults = {
		// eigenschaften
		includeMargin: true,
		includeBorder: true,
		includePadding: true
	};

	$.fn.contentPosition = function (options) {
		options = $.extend({}, defaults, options || {});
		
		var pos = this.position();
		if(typeof pos != "undefined") {
			if (options.includeMargin) {
				pos.left += parseInt(this.css("margin-left"));
				pos.top += parseInt(this.css("margin-top"));
			}
			if (options.includeBorder) {
				pos.left += parseInt(this.css("border-left-width"));
				pos.top += parseInt(this.css("border-top-width"));
			}
			if (options.includeMargin) {
				pos.left += parseInt(this.css("padding-left"));
				pos.top += parseInt(this.css("padding-top"));
			}
		}
		return pos;
	};
}(jQuery));