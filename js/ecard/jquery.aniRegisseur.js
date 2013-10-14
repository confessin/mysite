(function ($) {
	$.aniRegisseur = function () {
		var aniRegisseur = this;

		// PRIVATE VARS
		var aniDrehbuch = $.aniDrehbuch();
		var preloader = $.preloader();
		var preloadOffset = 1500;	// 1500 pixel bevor die szene erreicht wird, werden die bilder der szene geladen
		var scrollorama = $.superscrollorama({triggerAtCenter: false, playoutAnimations: false});
		var scenes = {};
		var doResizeUpdate = false;



		// CONSTRUCTOR
		function init() {
			$(window).resize(function () {
				doResizeUpdate = true;
			});
			TweenLite.ticker.addEventListener("tick", tickHandler); // nur on Tick die Position updaten (Performance)
		}

		// PRIVATE METHODS
		function tickHandler() {
			if (doResizeUpdate) {
				updateScenes ();
				scrollorama.triggerCheckAnim();
				$(document).triggerHandler("UpdateOnTick");
				doResizeUpdate = false;
			}
		}

		function updateScenes () {
			for (var sName in scenes) {
				scenes[sName].updateTransfer();
			}
		}


		// PUBLIC METHODS
		aniRegisseur.addScene = function(el, images) {
			if (typeof(el) === 'string') el = $(el).first();
			if (typeof(images) === 'undefined') images = new Array();
			if (el.length > 0) {
				var id = el.attr("id");
				if (scenes[id]) {
					alert("FEHLER: Die Szene mit der ID \"" + id + "\" wurde mehrfach hinzugefügt.")
				} else {
					var scene = new $.aniSzene(el, scrollorama);
					aniDrehbuch.initScene(scene);
					scenes[id] = scene;
					preloader.addElement(el, images, preloadOffset);
				}
				return scene;
			} else {
				return false;
			}
		}

		// INIT
		init();
		return aniRegisseur;
	}
})(jQuery);