$(document).ready(function () {

	// Menu
	$('#menuitems li a[href^="#"]').each (function () {
		var $target = $(".scene"+$(this).attr("href"));
		// killen wenn es target nicht gibt (hu)
		if ($target.length == 0) {
			$(this).parent().remove();
		}
	});

	// login/out
	$("#logindata a").click(
		function (e) {
			e.preventDefault();
			if ($("#logout").is(":visible")) {
				$("#logout").animate({width: 'hide'});
			} else {
				$("#logout").animate({width: 'show'});
			}
		}
	);
	var $space = $("<div></div>");
	$space.css({
		width: "25px",
		display: "inline-block"
	});
	$("#logout").append($space);
});