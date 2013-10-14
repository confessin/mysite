// vars
// Scrollspeed => seconds per thousand pixels
var scrollSeconds = .25
// scroll pixels where scroll slows down
var slowdownPixels = 800;
// seconds per thousand pixels when slowing down
var slowdownSeconds= 1;
// um wieviel px soll höher gescrollt werden als das ziel
var scrollAdd = 55;

$(document).ready(function() {
		
	// scrollindicator
	var indicatorVisible = true;
	var $indicator = $("#scrollindicator img");
	TweenMax.to($indicator, 0.8, {
		css: {y : "+10"},
		repeat: -1
	});
	$(window).scroll(function() {
		if (indicatorVisible) {
			indicatorVisible = false;
			$indicator.parent().fadeOut();
			TweenMax.killTweensOf($indicator);
		}
	});
	
	// dirty fix for vertical centering of speechbubble contents
	$(".v-center").wrapInner('<table height="100%" width="100%"><tr><td valign="middle"></td></tr></table>');
	
	// page internal links
	$('a[href^="#"]').click(function (e) {
		var $target = $($(this).attr("href"));
		if ($target.length > 0) {
			e.preventDefault();
			var scrollYPos = $target.first().offset().top - scrollAdd;
			if ($target.is(".scene:first")) {
				scrollYPos = 0;
			} else if ($target.is(".scene")) { // wenn das ne szene is dann oberhalb der headline
				scrollYPos = $target.find("h1:visible").first().offset().top - scrollAdd;
			}
			var deltaY = scrollYPos - $(window).scrollTop();
			var scroll = new TimelineLite();
			if (Math.abs(deltaY) > slowdownPixels) {
				var dir = deltaY < 0 ? -1 : 1;
				var speed = (Math.abs(deltaY)-slowdownPixels) / 1000 * scrollSeconds;
				var slowdownSpeed = slowdownPixels / 1000 * slowdownSeconds;
				scroll.append(TweenLite.to(window, speed, {scrollTo:{y:scrollYPos-(slowdownPixels*dir), x:0}, ease:Linear.easeNone}))	
					 .append(TweenLite.to(window, slowdownSpeed, {scrollTo:{y:scrollYPos, x:0}, ease:Power2.easeOut}));	
			} else {
				var speed = (Math.abs(deltaY)) / 1000 * slowdownSeconds;
				scroll.append(TweenLite.to(window, speed, {scrollTo:{y:scrollYPos, x:0}, ease:Power2.easeOut}));
			}
			if ($(this).hasClass("blink")) {
				scroll.append(TweenMax.to($target, .0001, {visibility: "hidden", repeat: 5, yoyo: true, repeatDelay: .2}));
			}
		}
	});
	// automatisch externe links in neuem Fenster oeffnen
	$('a[href^="http://"], a[href^="https://"]').attr("target", "_blank");
	
	
	/*
	// Zum Bezier zeichnen
	//var $targetElem = $(".erde .zug");
	var $targetElem = $(".mapcontainer .convoydot");
	var bezier = new Array();
	
	bezier = [
		{x: -9, y: -7},
		{x: -15, y: -5},
		{x: -22, y: 0},
		{x: -29, y: 0},
		{x: -38, y: 5},
		{x: -35, y: 13},
		{x: -100, y: 80},
		{x: -188, y: 167},
		{x: -235, y: 175},
		{x: -240, y: 162},
		{x: -243, y: 155},
		{x: -247, y: 159},
		{x: -246, y: 166},
		{x: -287, y: 178},
		{x: -289, y: 175},
		{x: -292, y: 175},
		{x: -293, y: 179},
		{x: -336, y: 191},
		{x: -357, y: 168},
		{x: -352, y: 164},
		{x: -338, y: 171},
		{x: -322, y: 188},
	];
	
	//var offsetX = $(".erde .zug").position().left;
	//var offsetY = $(".erde .zug").position().top;
	var offsetX = parseInt($targetElem.css("left"));
	var offsetY = parseInt($targetElem.css("top"));
	
	$targetElem.parent().css({
				"-webkit-touch-callout": "none",
				"-webkit-user-select": "none",
				"-khtml-user-select": "none",
				"-moz-user-select": "none",
				"-ms-user-select": "none",
				"user-select": "none"
	})
	function makePoint (x, y) {
		var $inner = $("<div></div>")
			.css({
			
				backgroundColor: "red",
				width: 2,
				height: 2
			});
		
		var $outer = $("<div></div>")
			.css({
				padding: 10,
				left: x-10,
				top: y-10,
				cursor: "move"
			})
			.addClass("bezierpoint")
			.appendTo($targetElem.parent())
			.append($inner)
			.mousedown(function (e) {
				$dragging = $outer;
			});
		return $outer;
	}
	
	$(bezier).each(function () {
		var x = this.x + offsetX;
		var y = this.y + offsetY;
		makePoint(x, y);
	});
	
	var $dragging = null;
	
	$(document.body).on("mousemove", function(e) {
        if ($dragging) {
            $dragging.offset({
                top: e.pageY-15,
                left: e.pageX-15
            });
        }
    });

    $(document.body).on("mouseup", function (e) {
        $dragging = null;
	   // output all positions on rightclick
	   if (e.which == 3) {
		 var txt = "bezier = [\n";
		$(".bezierpoint").each(function () {
			var x = parseInt($(this).css("left")) - offsetX + parseInt($(this).css("padding"));
			var y = parseInt($(this).css("top")) - offsetY + parseInt($(this).css("padding"));
			txt += "{x: " + x + ", y: " + y + "},\n";
		});
		txt += "];";
		console.log(txt);
	   }
    });
    
    $targetElem.parent().on("dblclick", function(e) {
	    var $new = makePoint(e.offsetX,e.offsetY);
    });
    */
    
    
});