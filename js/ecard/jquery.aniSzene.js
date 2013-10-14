(function ($) {
    $.aniSzene = function (jqueryObj, superscrollorama) {
	// PRIVATE VARs
	var aniSzene = this;
	var $scene = jqueryObj;
	var hasTransfer = false;
	var transferDiv = {
		$el: 0,
		$parent: {},
		pinAni: null,
		pinOffset: 0,
		pinDuration: 0,
		pinTarget: {top: 0, left: 0, fromBottom: false},
		relPos: {top: 0, left: 0},
		parentPin: {from: 0, to: 0}
	};
	var transferTarget = {
		$el: 0,
		$parent: {},
		$scene: {},
		relPos: {top: 0, left: 0}
	};
	var scrollorama = superscrollorama;

	// PUBLIC VARs
	aniSzene.name = $scene.attr("id");
	aniSzene.$self = $scene;


	// CONSTRUCTOR
	function init() {
		transferDiv.$el = $scene.find(".stage .transferDiv");
		
		if (transferDiv.$el.length != 1 && "console" in window) {
			console.log("Achtung! Szene \"" + $scene.attr("id") + "\" hat "+ transferDiv.$el.length +" Transfer DIVs.")
		}
		transferDiv.$parent = transferDiv.$el.parent();
		transferDiv.relPos = transferDiv.$el.contentPosition();
		// find the next scene that has a transferDiv (or a transferTarget)
		transferTarget.$scene = $scene.nextAll(".scene").has(".stage .transferTarget, .stage .transferDiv").first();
		transferTarget.$scene.addClass("waiting")
		// man braucht ein Element als ziel, dass sich nicht bewegt (entweder aktiv, oder wenn das parent gepinned wird) darum gibt es manchmal .transferTarget
		transferTarget.$el = transferTarget.$scene.find(".stage .transferTarget");
		if (transferTarget.$el.length == 0) { // wenn kein transfer target, dann nach transferDiv schauen
			transferTarget.$el = transferTarget.$scene.find(".stage .transferDiv");
		}
		transferTarget.$parent = transferTarget.$el.parent();
		transferTarget.relPos = transferTarget.$el.contentPosition();
	}

	// PRIVATE METHODS
	function getTransferData () { // Die aktuellen Sprungdaten einholen
		transferDiv.pinTarget.left = transferTarget.$parent.offset().left + transferTarget.relPos.left;

		// zielY - startY = deltaAni + OffsetZiel - OffsetStart
		// =>
		// deltaAni = zielY - startY - OffsetZiel + OffsetStart
		// startY und zielY muss vom parent aus berechnet werden, da sich das Element ja bewegt => Y = parentY + transferDivRelY

		var transferDivY = (transferDiv.$parent.offset().top + transferDiv.relPos.top); // weil ja während des Transfers sich die Position des Gastes auch ändert.
		var transferTargetY = (transferTarget.$parent.offset().top  + transferTarget.relPos.top);
		var targetTop = transferDiv.pinTarget.top;
		if (transferDiv.pinTarget.fromBottom) {
			targetTop += $(window).innerHeight();
		}
		transferDiv.pinDuration = transferTargetY - transferDivY - targetTop + transferDiv.pinOffset;
		
		var ani = TweenMax.to(transferDiv.$el, 1, {css:{left:transferDiv.pinTarget.left, top:targetTop}});
		
		if (transferDiv.pinAni != null){
			ani = new TimelineMax ()
				.append([
					ani,
					transferDiv.pinAni
				]);
		}
		
		return ani;
	}

	// PUBLIC METHODS
	aniSzene.addAnimation = function (aniOffset, aniDuration, $el, animation) {
		scrollorama.addTween($el, animation, aniDuration, aniOffset);
	}
	aniSzene.addPin = function (pinOffset, pinDuration, $el, animation) {
		var options = {
			anim: animation,
			offset: -pinOffset,
			pushFollowers: false
		}
		if (transferDiv.$el.parents().is($el)) {// wenn der Gast also mit gepinnt wird.
			options.onUnpin = function (ending) { // wenn der Pin durch ist, dann muss ich den jump updaten, damit das ziel stimmt
				if (ending)
					aniSzene.updateTransfer();
			}
		}
		scrollorama.pin($el, pinDuration, options);
	}
	aniSzene.addTransfer = function (pinOffset, pinTargetY, animation, fromBottom) { // animation die während des Fallens stattfinden soll. Der Fall selbst hat die Duration 1
		transferDiv.pinOffset = pinOffset;
		transferDiv.pinTarget.top = pinTargetY - pinOffset;
		transferDiv.pinTarget.fromBottom = (fromBottom == true);

		if (typeof animation != "undefined") {
			transferDiv.pinAni = animation;
		}
		var ani = getTransferData();
		hasTransfer = true;

		scrollorama.pin(transferDiv.$el, transferDiv.pinDuration, {
			anim: ani,
			offset: -transferDiv.pinOffset,
			pushFollowers: false,
			onPin: function (ending) {
				$scene.removeClass("finished");
				transferTarget.$scene.addClass("waiting");
			},
			onUnpin: function (ending) {
				if (ending) {
					$scene.addClass("finished");
					transferTarget.$scene.removeClass("waiting");
				}
			}
		});
	}
	aniSzene.updateTransfer = function (pinOffset) {
		var vars = {};
		if (typeof pinOffset != "undefined") {
			transferDiv.pinOffset = pinOffset
			vars.offset = -pinOffset;
		}
		if (hasTransfer) {
			vars.anim = getTransferData();
			scrollorama.updatePin(transferDiv.$el, transferDiv.pinDuration, vars);
		}
	}

	// INIT
	init();
	return aniSzene;
    }
})(jQuery);