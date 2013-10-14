(function ($) {
	$.aniDrehbuch = function () {
		var aniDrehbuch = this;

		// CONSTRUCTOR
		function init() {}
		
		// PUBLIC METHODS
		aniDrehbuch.initScene = function (scene) {
			var $scene = scene.$self;
			var $stage = $scene.find(".stage");
			// ein extra div in jedes paar und guest div packen zum einfacheren aendern.
			$stage.find(".paar, .guest").append("<div id=\"img\"></div>");
			var $guest = $stage.find(".guest div#img");
			var $paar = $stage.find(".paar div#img");
			var sceneHeight = $scene.outerHeight();
			var sceneWidth = $scene.outerWidth();
			switch (scene.name) {
				case "start":
					var lesen = new TimelineMax({repeat: 2})
						.append(TweenMax.to($guest, .2, {css:{className:"lesen1"}}))
						.append(TweenMax.to($guest, .2, {css:{className:"lesen2"}}))
						.append(TweenMax.to($guest, .2, {css:{className:"lesen3"}}));
					var freuen = new TimelineMax()
						.append(TweenMax.to($guest, .2, {css:{className:""}}))
						.append(TweenMax.to($guest, .2, {css:{className:"freuen"}}));
					var startAni = new TimelineMax()
						.append(lesen)
						.append(freuen);

					
					var papierhinundher = new TimelineMax ()
						.append(TweenMax.to($stage.find(".papier"), 0.1, {css: {left: "-=45", rotation: 60}, ease: Power1.easeInOut}))
						.append(TweenMax.to($stage.find(".papier"), 0.1, {css: {left: "+=90", rotation: 40}, ease: Power1.easeInOut}))
						.append(TweenMax.to($stage.find(".papier"), 0.1, {css: {left: "-=30", rotation: 65}, ease: Power1.easeInOut}));
					
					var papierfallen = new TimelineMax ()
						.append([
							TweenMax.to($stage.find(".papier"), 0.3, {css:{top: "+=160"}, ease: Power1.easeOut}),
							papierhinundher
						]);
					
					scene.addAnimation(1, 130, $scene, startAni);
					scene.addAnimation(210, 250, $scene, papierfallen);
					
					var nextscene = $scene.nextAll(".scene").first().attr("id");
					var fallen = new TimelineMax()
							.append(TweenMax.to($stage, .0001, {css:{className:"+=fallen"}}));
					if (nextscene == "vonanachb") {
						fallen
							.append(TweenMax.to($guest, 1, {css:{scale: .55, rotation: -65}}));
						scene.addTransfer(30, -530, fallen, true);
					} else {
						fallen
							.append(TweenMax.fromTo($guest, .3, {css: {left: 0, top: 0}}, {css:{scale: .8, rotation: -20, left: -20, top: -50}}))
							.append([
								TweenMax.to($guest, .0001, {css: {className: "+=changepose"}}),
								TweenMax.fromTo($guest, .6, {css: {rotation: 50, left: -140, top: 50, scale: .75}}, {css: {rotation: 65, left: -220, top: -120, scale: .6}})
							]);
						scene.addTransfer(30, 400, fallen);
					}
					

					break;
				case "vonanachb":
					
					// zum erde Testen
					//TweenMax.to($stage.find(".erde"), 0.1, {css:{left: 300, scale: 0.2}});
					//TweenMax.to($stage.find(".erde > div"), 0.1, {css:{backgroundColor:"#FF0000"}});
					
					var flugpfade = {
						anflug : {
							curviness: 1.25,
							autoRotate: true,
							values: [
									{x: 100,	y: -20},
									{x: 200,	y: 10}
								]
						},
						looping : {
							curviness: 1.25,
							autoRotate: true,
							values: [
									{x: 410,	y: 60},
									{x: 520,	y: -60},
									{x: 400,	y: -100},
									{x: 280,	y: 20},
									{x: 400,	y: 60},
									{x: 480,	y: 20},
									{x: 520,	y: 15}
								]
						},
						leaving : {
							curviness: 1.25,
							autoRotate: true,
							values: [
									{x: 560,	y: 20},
									{x: 700,	y: 130},
									{x: sceneWidth + 300,	y: -100},
								]
						}
					};
					
					var papierflieger = new TimelineMax()
						.append(TweenMax.to($stage.find(".papierflieger"), 1.2, {css:{bezier:flugpfade.anflug}, ease:Power1.easeInOut}))
						.append(TweenMax.to($stage.find(".papierflieger"), 2, {css:{bezier:flugpfade.looping}, ease:Power1.easeInOut}))
						.append(TweenMax.to($stage.find(".papierflieger"), 1, {css:{bezier:flugpfade.leaving}, ease:Power1.easeInOut}));
					

					//TweenMax.set($stage.find(".erde > div"), {css:{rotation: 32}});
					var drehen = new TimelineLite        ()
						.append(TweenMax.fromTo($stage.find(".erde > div"), 2, {css:{rotation: 32}, immediateRender: true}, {css:{rotation: -9}, ease:Linear.easeNone}))
						.append(TweenMax.to($stage.find(".erde > div"), .2, {css:{autoAlpha: 1}})); // is eh schon sichtbar - ich brauch nur .2 am ende, wo die erde nicht mehr dreht.
					
					//console.log(schienenBezier);
					var schienen = {
						curviness: 1.2,
						autoRotate: true,
						values:  [
							{x: 75, y: -12},
							{x: 111, y: -25},
							{x: 127, y: -67},
							{x: 173, y: -114},
							{x: 243, y: -123},
							{x: 325, y: -124},
							{x: 383, y: -164},
							{x: 444, y: -179},
							{x: 499, y: -149},
							{x: 558, y: -92},
							{x: 592, y: -129},
							{x: 645, y: -171},
							{x: 728, y: -138},
							{x: 811, y: -98},
							{x: 967, y: -116},
							{x: 1106, y: -91}
						]
					};
					
					var zugfahren = new TimelineLite()
						.append(TweenMax.to($stage.find(".erde .zug"), 2, {css:{bezier:schienen}, ease:Linear.easeNone}));
						
					var wagen = new Array();	
					var anzahlWagen = 4;
					var delayBetween = .09;
					
					for (var i = 1; i<=anzahlWagen; i++) {
						var $wagen = $("<div class=\"bahn wagen\"></div>").appendTo($stage.find(".erde .kugel"));
						wagen[i-1] = new TimelineLite({delay: .09*i})
							.append(TweenMax.to($wagen, 2, {css:{bezier:schienen}, ease:Linear.easeNone}))
					}
					
					
					function stopearly (when) {
						if (this.time() > when) {
							this.time(when);
						}
					}
					var bahn = new TimelineMax({onUpdate: stopearly, onUpdateParams: [2]})
						.append([zugfahren, wagen]);
					
					

					var autofahren = new TimelineLite()
						.append(TweenMax.to($stage.find(".auto"), 1, {css:{rotation: 9, left: 125, top: "+=20"}, ease:Power1.easeIn}))
						.append(TweenMax.to($stage.find(".auto"), 1, {css:{rotation: 17, left: 293, top: "+=33"}, ease:Power1.easeOut}));
					
					var flugzeug = new TimelineLite({delay: .5})
						.append(TweenMax.to($stage.find(".flugzeug"), .9, {css:{scale: .9, rotation: 10, left: 300, top: -100}, ease:Power1.easeIn}))
						.append(TweenMax.to($stage.find(".flugzeug"), .6, {css:{scale: .7, rotation: 40, left: 430, top: 180}, ease:Power1.easeOut}));

					
					var jumpfromcar = new TimelineLite({delay: .01, ease:Power1.easeOut})
						.append([
							TweenMax.to($guest, .0001, {css:{className:"fallen"}}),
							TweenMax.to($stage.find(".auto"), .0001, {css:{className:"+=leer"}}),
							TweenMax.fromTo($guest, .2, {css:{scale: .5, top: "-1", rotation: -60, left: -10}}, {css:{scale: .8, top: "-=150", left: "-=150", rotation: -90}})
						]);
						
					var ende = new TimelineLite()
						.append([
							TweenMax.to($stage.find(".erde"), .2, {css:{top: "+=280"}, ease:Power1.easeIn}),
							TweenMax.to($stage.find(".flugzeug"), .2, {css:{top: "+=280"}, ease:Power1.easeIn}),
							TweenMax.to($stage.find(".auto"), .2, {css:{top: "+=280"}, ease:Power1.easeIn}),
							jumpfromcar
						])
						.append(TweenMax.to($stage, .0001, {css:{className:"+=onlyguest"}}));

					var ani = new TimelineMax()
						.append([autofahren, flugzeug])
						.append(ende);
					 
					var fallen = new TimelineLite({ease:Power1.easeOut})
						.append(TweenMax.to($guest, .7, {css:{scale: .9, rotation: -65, top: -300, left: 0}}))
						.append(TweenMax.to($guest, .0001, {css:{className:"+=insbett"}}))
						.append(TweenMax.fromTo($guest, .29, {css: {rotation: 10, top: -100, left: -30}}, {css:{rotation: 0, top: -100, left: -30}}));
					
					scene.addAnimation(0, 1500, $scene, ani);
					scene.addAnimation(0, 1600, $scene, bahn);
					scene.addAnimation(100, 1500, $scene, papierflieger);
					scene.addPin(0, 1500, $stage.find(".pinelements"), drehen);
					var transferOffsetBottom = 550;
					scene.addTransfer($(window).innerHeight()-transferOffsetBottom, -150, fallen, true);
					
					// updaten bei Resize:
					$(document).on("UpdateOnTick", function() {
						scene.updateTransfer($(window).innerHeight()-transferOffsetBottom);
					});
					
					break;
				case "unterkunft":
					var schlafen = new TimelineMax({repeat: 5})
						.append(TweenMax.to($stage, .0001, {css:{className:"+=schlafloop"}, delay: .2}))
						.append(TweenMax.to($stage, .0001, {css:{className:"-=schlafloop"}, delay: .2}));
					
					TweenMax.set($scene.find(".zeiger.klein"), {css: {rotation: -26}}); // Uhr stellen :)
					TweenMax.set($scene.find(".zeiger.gross"), {css: {rotation: 94}}); // Uhr stellen :)
					var ticktack = new TimelineMax()
						.append([
							TweenMax.to($scene.find(".zeiger.klein"), .5, {css: {rotation: "+=120"}, ease:Linear.easeNone}),
							TweenMax.to($scene.find(".zeiger.gross"), .5, {css: {rotation: "+=1440"}, ease:Linear.easeNone})
						]);
					
					var initklingeln = TweenMax.to($stage, .0001, {css: {className: "+=klingeln"}});
					var klingeln = new TimelineMax({repeat: -1, yoyo: true})
						.append(TweenMax.to($scene.find(".wecker"), .1, {css: {className: "+=loop"}}))
						.append(TweenMax.to($scene.find(".wecker"), .1, {css: {className: "-=loop"}}));
							
					var wackeln = new TimelineMax({repeat: -1})
						.append(TweenMax.to($scene.find(".wecker"), .1, {css: {left: "+=2"}}));
						
					var fallen = new TimelineMax()
						.append(TweenMax.to($stage, .00001, {css:{className:"+=fallen"}}))
						.append(TweenMax.fromTo($guest, .3, {css:{scale: 1, top: 120, left: -10, rotation: -15}}, {css:{scale: .9, rotation: -60, top: -50, left: -70}}))
						.append(TweenMax.to($guest.parent(), .00001, {css:{className:"+=changepose"}}))
						.append(TweenMax.fromTo($guest, .69, {css:{scale: .9, rotation: -130, top: -95, left: -145}}, {css:{scale: .6, rotation: -350, top: -190, left: -100}}));
					
					scene.addAnimation(-165, 350, $scene, schlafen);
					scene.addAnimation(-365, 550, $scene, ticktack);
					scene.addAnimation(186, 0, $scene, initklingeln);
					scene.addAnimation(185, 500, $scene, klingeln);
					scene.addAnimation(185, 500, $scene, wackeln);
					scene.addTransfer(-10, 400, fallen);
					break;
				case "vorort":
					var autofahren = TweenMax.to($scene.find(".auto"), .1, {css:{y: "+=2"}, roundProps: "y", repeat: -1, yoyo: true});
					var zugfahren = TweenMax.to($scene.find(".tram"), .4, {css:{y: "-=1"}, roundProps: "y", repeat: -1, yoyo: true});
				
					var fahrgastzeigen = TweenMax.to($scene.find(".tram"), .0001, {css:{className:"+=mitfahrgast"}});
					var winken = new TimelineMax({repeat: 6})
						.append(TweenMax.to($scene.find(".fahrgast"), .2, {css:{className:"+=winken"}}))
						.append(TweenMax.to($scene.find(".fahrgast"), .2, {css:{className:"-=winken"}}));
						
					var aussteigen = new TimelineMax()
						.append(TweenMax.to($stage, .00001, {css:{className:"+=aussteigen"}}))
						.append([
							TweenMax.to($stage, .00001, {css:{className:"+=tuer"}, delay: .25}),
							TweenMax.to($guest, 1, {css: {x: "-=87", y: "+=20"}})
						]);
					
					var fallen = new TimelineMax()
						.append([
							TweenMax.to($stage, .00001, {css:{className:"+=fallen"}}),
							TweenMax.to($guest, .00001, {css:{scale: .5, top: -210, left: -230, rotation: -20}})
						])
						.append(TweenMax.to($guest, .39, {css:{scale: .8, rotation: -60, top: -180, left: -130}}))
						.append(TweenMax.to($guest, .59, {css:{scale: 1, rotation: 0, top: -70, left: 70}}));
											
					scene.addAnimation(-160, 1160, $scene, autofahren);
					scene.addAnimation(1000, 110, $scene, aussteigen);
					scene.addAnimation(-800, $scene.outerHeight(true), $scene, zugfahren);
					scene.addAnimation(0, 0, $scene, fahrgastzeigen);
					scene.addAnimation(0, 1000, $scene, winken);
					scene.addPin(100, 900, $stage.find(".pinelements"));
					scene.addTransfer(100, 200, fallen);
					
					break;
				case "geld":
					var werfenloop = new TimelineMax({repeat: 4})
						.append(TweenMax.to($guest, .0001, {css: {className: "+=werfen2"}, delay: .3}))
						.append(TweenMax.to($guest, .0001, {css: {className: "-=werfen2"}, delay: .3}));
					
					var geldwerfen = new TimelineMax({delay: .5})
						.append(TweenMax.to($guest, .0001, {css: {className: "+=werfen"}}))
						.append(werfenloop)
						.append([
							TweenMax.to($guest, .0001, {css: {className: "-=werfen"}}),
							TweenMax.to($guest, .0001, {css: {className: "-=werfen2"}}),
						]);
					
					
					var shrink = new TimelineMax()
						.append([
							TweenMax.to($stage.find(".floor"), .8, {css: {scale: 0.7, left: "-=170", top: "-=50"}, delay: .5}),
							TweenMax.to($guest, .8, {css: {scale: 0.7, left: -221, top: 10}, delay: .5})
						]);
					
					var erschrecken = new TimelineMax()
						.append([
							TweenMax.to($guest.parent(), .0001, {css: {className: "+=surprise"}})
						]);
					
					var happynshrink = new TimelineMax()
						.append([geldwerfen, shrink])
						.append(erschrecken);
					
					var doorappears = new TimelineMax()
						.append(TweenMax.fromTo($stage.find(".doorcontainer"), .2, {css: {opacity: 0}, immediateRender: true}, {css: {opacity: 1}}))
						.append([
							TweenMax.to($stage.find(".door"), .0001, {css: {className: "+=open"}}),
							TweenMax.fromTo($stage.find(".opening .maid"), .3, {css: {rotation: -20, left: 400}, immediateRender: true}, {css: {left: "-=90"}})
						]);
					
					// conversation
					
					TweenMax.set($stage.find(".sprechblasen>div"), {css: {autoAlpha: 0}}); // sprechblasen ausblenden
					
					var startTalking = new TimelineMax()
						.append([
							TweenMax.to($scene, .0001, {css: {className: "+=talking"}}),
							TweenMax.to($guest.parent(), .0001, {css: {className: "-=surprise"}})
						]);
						
					var stopTalking = new TimelineMax()
						.append([
								TweenMax.to($stage.find(".sprechblasen .gast"), .3, {css: {autoAlpha: 0}})
							]);
					
					
					// dialog
					var repeat = 3; // how often do they go?
					var startat = 800; // where does the conversation start?
					var step = 290; // how much space between saying something
					
					var maidtalks = new Array();
					var guesttalks = new Array();
					var curPos = startat;
					
					var nextText = function (elem) {
						var $elem = $(elem);
						var $visible = $elem.find("div:visible");
						var $next = $visible.length == 0 ? $elem.find("div:first") : $visible.next();
						if ($next.length > 0) {
							$visible.hide();
							$next.show();
						}
					}
					var prevText = function (elem) {
						var $elem = $(elem);
						var $visible = $elem.find("div:visible");
						var $prev = $visible.prev();
						if ($prev.length > 0) {
							$prev.show();
						}
						$visible.hide();
					}
					
					for (var i = 1; i<=repeat; i++) {
						maidtalks[i] = new TimelineMax({
								onStart: nextText, onStartParams: $stage.find(".sprechblasen .maid .textcontainer"),
								onReverseComplete: prevText, onReverseCompleteParams: $stage.find(".sprechblasen .maid .textcontainer")
							})
							.append([
								TweenMax.to($stage, .0001, {css: {className: "+=maidsturn"}}),
								TweenMax.to($stage.find(".sprechblasen .maid"), .3, {css: {autoAlpha: 1}}),
								TweenMax.to($stage.find(".sprechblasen .gast"), .3, {css: {autoAlpha: 0}})
							]);

						guesttalks[i] = new TimelineMax({
								onStart: nextText, onStartParams: $stage.find(".sprechblasen .gast .textcontainer"),
								onReverseComplete: prevText, onReverseCompleteParams: $stage.find(".sprechblasen .gast .textcontainer")
							})
							.append([
								TweenMax.to($stage, .0001, {css: {className: "-=maidsturn"}}),
								TweenMax.to($stage.find(".sprechblasen .maid"), .3, {css: {autoAlpha: 0}}),
								TweenMax.to($stage.find(".sprechblasen .gast"), .3, {css: {autoAlpha: 1}})
							]);
							
						scene.addAnimation(curPos, 0, $stage, maidtalks[i]);
						curPos += step;
						scene.addAnimation(curPos, 0, $stage, guesttalks[i]);
						curPos += step;
					}
					
					var tuerweg = TweenMax.to($stage.find(".doorcontainer"), .2, {css:{opacity: 0}});
						
					var startKippen = new TimelineLite()
						.append([
							TweenMax.to($scene, .00001, {css: {className: "-=talking"}}),
							TweenMax.to($guest, .00001, {css: {className: "kippen"}})
						]);
					var wanneauskippen = new TimelineMax()
						.append([
							TweenMax.to($scene.find(".wanne"), .4, {css: {rotation: 35, left: "+=88", top: "-=40"}}),
							TweenMax.fromTo($guest, .4, {css: {left: -221, top: 10, rotation: 0}}, {css: {rotation: 35, left: -158, top: 43}})
						])
						.append([
							TweenMax.to($stage, .0001, {css:{className: "+=fallen"}}),
							TweenMax.fromTo($guest, .0001, {css: {rotation: 35, left: -158, top: 43, scale: .7}}, {css:{left: -30, top: 30, scale: .85, rotation: 60}}),
						])
						.append([
							TweenMax.to($guest, .5, {css:{left: 200, top: 70}, ease: Power1.easeOut}),
							TweenMax.to($guest, .6, {css:{rotation: 160}, ease: Linear.easeNone})
						]);
			
					var fallen = new TimelineMax()
						.append([
							TweenMax.to($guest, .3, {css:{left: 90, top: -60}, ease: Power1.easeIn}),
							TweenMax.fromTo($guest, .3, {css:{rotation: 125}}, {css:{rotation: 260}, ease: Linear.easeNone})
						])
						.append([
							TweenMax.to($stage, .0001, {css: {className: "+=changepose"}}),
							TweenMax.fromTo($guest, .69, {css:{rotation: 0, left: 60, top: -20, scale: .85}}, {css:{rotation: 65, left: -120, top: -110, scale: .55}, ease: Linear.easeNone})
						]);
					
					scene.addAnimation(-50, 650, $stage, happynshrink);
					scene.addAnimation(450, 250, $stage, doorappears);
					scene.addAnimation(startat, 0, $stage, startTalking);
					// rede animation ist oben im loop
					scene.addAnimation(curPos, 0, $stage, stopTalking);
					scene.addAnimation(curPos+100, 100, $stage, tuerweg);
					scene.addAnimation(curPos+249, 0, $stage, startKippen);
					scene.addAnimation(curPos+250, 200, $stage, wanneauskippen);
					
					scene.addPin(0, curPos+250+100, $stage.find(".pinelements"));
					scene.addTransfer(30, 400, fallen);
					break;
				case "location":
					
					var buskommt = TweenMax.from($stage.find(".bus"), .6, {css: {left: -440}, ease: Power1.easeOut});
					var buswackeln = TweenMax.to($scene.find(".bus"), .3, {css:{top: "+=2"}, ease: Linear.easeNone, repeat: -1, yoyo: true});
					var autokommt = TweenMax.from($stage.find(".auto"), .5, {css: {left: -500}, ease: Power1.easeOut});
					var autowackeln = TweenMax.to($scene.find(".auto"), .26, {css:{top: "+=2"}, ease: Linear.easeNone, repeat: -1, yoyo: true});
					
					var routebezier = {
						curviness: .5,
						autoRotate: false,
						values: [
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
						]
					};
					
					var movingdot = TweenMax.to($scene.find(".mapcontainer .convoydot"), 2, {css:{bezier:routebezier}, ease:Linear.easeNone});
					
					var fallen = new TimelineMax()
						.append([
							TweenMax.to($stage, .0001, {css: {className: "+=fallen"}}),
							TweenMax.fromTo($guest, .3, {css: {scale: .65, top: -140, left: -60, rotation: -15}}, {css: {scale: .7, top: "-20", left: "-70", rotation: -10}}),
						])
						.append(TweenMax.to($guest, .7, {css: {scale: 1, top: -30, left: 40, rotation: 0}}));
					
					var wegfahren = TweenMax.to($scene.find(".auto, .paar, .publikum, .bus"), .2, {left: "+="+(sceneWidth*1.5), ease: Linear.easeNone});
					
					scene.addPin(400-213-30, 2400, $stage.find(".pinelements")); // 400 = ende des gastsprnungs, 213 ist gastoffset innerhalb pinelements. kA wo die 30 herkommen
					scene.addPin(100, 700, $scene.find(".convoymap"), movingdot);
					scene.addAnimation(700-213-30+0, 400, $stage, autokommt); // 0 nach pin
					scene.addAnimation(700-213-30+170, 400, $stage, buskommt);
					scene.addAnimation(700-213-30+0, 2400, $stage, buswackeln); // 70 nach pin
					scene.addAnimation(700-213-30+170, 2400, $stage, autowackeln);
					scene.addAnimation(-300, sceneWidth, $scene.find(".bus"), wegfahren);
					scene.addTransfer(60, 250, fallen);
					break;
				case "dresscode":
					
					var outfitCnt = 4;
					var start = 10;
					var step = 250;
					
					// hide at start
					TweenMax.set($stage.find(".klamotte"), {visibility: "hidden"});
					
					var changeOutfit = new Array();
					for (var i = 1; i<=outfitCnt; i++) {
						changeOutfit[i] = new TimelineMax()
							.append([
								TweenMax.to($stage.find(".klamotte"), .0001, {css: {visibility: "visible"}}),
								TweenMax.fromTo($stage.find(".klamotte"), .4, {css: {left: 385}}, {css: {left: "-=250"}, ease: Power0.easeIn, immediateRender: true})
							])
							.append(TweenMax.to($stage.find(".klamotte"), .0001, {css: {visibility: "hidden"}}))
							.append([
								TweenMax.to($stage, .0001, {css: {className: "+=outfit"+i}})
							])
							scene.addAnimation(start + ((i-1) * step), 0, $stage, changeOutfit[i]);
					}
					
					
					scene.addPin(250-175, step*(outfitCnt), $stage.find(".pinelements")); // ende des gastsprungs, 75 is guestoffset
					scene.addTransfer(250-100, 250+50);
					break;
				case "traditionen":
					
					var flugpfade = {
						blumenstrauss : {
							curviness: 1.25,
							values: [
									{x: 150,	y: -100},
									{x: 300,	y: -30}
								]
						},
						strumpfband : {
							curviness: 1.25,
							values: [
									{x: 40,	y: 0},
									{x: 200,	y: -110},
									{x: 350,	y: -50}
								]
						},
						pustefix : {
							curviness: 1.25,
							values: [
									{x: 50,	y: 20},
									{x: 250,	y: 0},
									{x: 340,	y: 140}
								]
						}
					};
					
					//hide throws
					TweenMax.set($stage.find(".thrown"), {css: {autoAlpha: 0}});
					
					var showthrows = TweenMax.to($stage.find(".thrown"), .2, {css: {autoAlpha: 1}});
					var hidethrows = new TimelineMax ()
						.append(TweenMax.to($stage.find(".thrown"), .2, {css: {autoAlpha: 0}}))
						.append([
							TweenMax.to($guest, .0001, {css:{className: ""}}),
							TweenMax.to($stage, .0001, {css:{className: "-=seifenblasen"}})
						]);
					
					var blumenstrauss = new TimelineMax()
						.append([
							TweenMax.fromTo($stage.find(".blumenstrauss"), .1, {css:{opacity: 0}}, {css:{opacity: 1}, immediateRender: true}),
							TweenMax.to($stage.find(".blumenstrauss"), .6, {css:{rotation: 360, bezier:flugpfade.blumenstrauss}, ease:Power0.easeIn}),
							TweenMax.to($guest, .0001, {css:{className: "+=inyourface"}, delay: .45})
						])
						.append([
							TweenMax.to($guest, .0001, {css:{className: ""}, delay: .7}),
							TweenMax.to($stage.find(".blumenstrauss"), 1, {css: {top: "+=260"}, ease: Bounce.easeOut, delay: .2}),
							TweenMax.to($stage.find(".blumenstrauss"), 1, {css: {left: "-=75", rotation: 220}, ease: Power0.easeOut, delay: .2})
						]);
					
					var strumpfbandhinundher = new TimelineMax({delay: .2}) 
						.append(TweenMax.to($stage.find(".strumpfband"), .5, {css:{left: "-=80", rotation: 200}, ease: Power1.easeInOut}))
						.append(TweenMax.to($stage.find(".strumpfband"), .4, {css:{left: "+=70", rotation: 160}, ease: Power1.easeInOut}))
						.append(TweenMax.to($stage.find(".strumpfband"), .4, {css:{left: "-=60", rotation: 200}, ease: Power1.easeInOut}))
						.append(TweenMax.to($stage.find(".strumpfband"), .4, {css:{left: "+=60", rotation: 160}, ease: Power1.easeInOut}))
						.append(TweenMax.to($stage.find(".strumpfband"), .3, {css:{left: "-=25", rotation: 200}, ease: Power1.easeInOut}));
										
					var strumpfband = new TimelineMax()
						.append([
							TweenMax.fromTo($stage.find(".strumpfband"), .1, {css:{opacity: 0}}, {css:{opacity: 1}, immediateRender: true}),
							TweenMax.to($stage.find(".strumpfband"), 1, {css:{rotation: 120, bezier:flugpfade.strumpfband}, ease:Power1.easeOut}),
							TweenMax.to($guest, .0001, {css:{className: "+=verlegen"}, delay: .7})
						])
						.append([
							TweenMax.to($guest, .0001, {css:{className: ""}, delay: 1}),
							strumpfbandhinundher,
							TweenMax.to($stage.find(".strumpfband"), strumpfbandhinundher.duration(), {css:{top: "+=220"}, delay: strumpfbandhinundher.delay(), ease: Power0.easeIn})
						]);
					
					TweenMax.set($stage.find(".pustefix"), {css:{rotation: -60}});
					var pustefix = new TimelineMax({delay: 2})
						.append([
							TweenMax.fromTo($stage.find(".pustefix"), .1, {css:{opacity: 0}}, {css:{opacity: 1}, immediateRender: true}),
							TweenMax.to($stage.find(".pustefix"), 1, {css:{rotation: -27, scale: .6, bezier:flugpfade.pustefix}, ease:Power1.easeIn})
						])
						.append(TweenMax.to($stage, .0001, {css:{className: "+=seifenblasen"}}))
						.append(TweenMax.to($guest, .0001, {css:{className: "+=blasenmachen"}, delay: .7}));
					
					function rand (min, max, round) {
						if (typeof round == "undefined") round = false;
						var r = (Math.random() * (max - min)) + min;
						if (round)
							r = Math.round(r);
						return r;
				    }
					function makeBubbles () {
						var params = {
							blowMin: .4,
							blowMax: 1.5,
							lifeMin: 1,
							lifeMax: 3,
							scaleMin: .5,
							scaleMax: 1.5,
							elevateMin: 50,
							elevateMax: 200
						};
						var options = {
							// alle gleich
							scaleStart: .5,
							x: 342,
							y: 155,
							// randoms
							scaleEnd: rand(params.scaleMin, params.scaleMax),
							lifetime: rand(params.lifeMin, params.lifeMax),
							blowstrength: rand(params.blowMin, params.blowMax),
							elevation: -rand(params.elevateMin, params.elevateMax)
						};
						$stage.find(".thrown").addBubble(options);
					}
					
					var dobubbles = TweenMax.to($guest, 3.5, {css: {alpha: 1}, onUpdate: makeBubbles});
					
					// wurfanimationen. Laengen berechnen, damit die gleich schnell sind
					var speed = 160; // scroll px per sekunde animation
					var startpos = 25;
					var dur = 0;
					
					var reihenfolge = [blumenstrauss, strumpfband, pustefix, dobubbles];
					
					$(reihenfolge).each(function() {
						startpos += dur;
						dur = this.totalDuration()*speed;
						scene.addAnimation(startpos, dur, $stage, this);
					});
					var endpoint = startpos + dur;
					
					endpoint += 100;
					
					scene.addPin(0, endpoint+75+74, $stage.find(".pinelements"));
					scene.addAnimation(-75, 0, $stage, showthrows);
					scene.addAnimation(endpoint, 0, $stage, hidethrows);
					scene.addTransfer(74, 300-149);
					break;
				case "mitbringen":
					var koffererscheint = TweenMax.to($stage.find(".koffer"), .4, {css: {autoAlpha: 1}});
					
					var phasen = new Array("lampe", "amboss", "katze", "kamera");
					
					var rauskramen = new TimelineMax();
					for (var i = 0; i<phasen.length; i++) {
						rauskramen
							.append(TweenMax.to($guest, .0001, {css: {className : "buecken"}, delay: .1}))
							.append([
								TweenMax.to($stage, .0001, {css: {className: "+="+phasen[i]}}),
								TweenMax.to($guest, .0001, {css: {className: "inderhand"}, delay: .6})
							])
							.append(TweenMax.to($guest, .0001, {css: {className: "werfen"}, delay: .8}));
						switch (phasen[i]) {
							case "lampe":
								rauskramen.append([
									TweenMax.to($scene.find(".lampe"), .0001, {css: {display: "block"}}),
									TweenMax.fromTo($scene.find(".lampe"), 1, {css: {x: 20, y: -500, rotation: 40, scale: 1}}, {css: {x: "+=450", y: "-=200", rotation: "+=130", scale: .7}, ease: Power1.easeOut})
								]);
								break;
							case "amboss":
								var hochundrunter = new TimelineMax ()
									.append(TweenMax.fromTo($scene.find(".amboss"), .2, {css: {y: -380}}, {css: {y: "-=100"}, ease: Power1.easeOut}))
									.append(TweenMax.to($scene.find(".amboss"), .8, {css: {y: "+=300"}, ease: Power1.easeIn}));
								rauskramen.append([
									TweenMax.to($scene.find(".amboss"), .0001, {css: {display: "block"}}),
									TweenMax.fromTo($scene.find(".amboss"), 1, {css: {x: -120, rotation: 30, scale: 1}}, {css: {x: "+=500", rotation: "+=160", scale: .6}, ease: Power1.easeOut}),
									hochundrunter
								]);
								break;
							case "katze":
								rauskramen.append([
									TweenMax.to($scene.find(".katze"), .0001, {css: {display: "block"}}),
									TweenMax.fromTo($scene.find(".katze"), 1, {css: {x: -30, y: -380, rotation: -30, scale: 1}}, {css: {x: "+=500", y: "-=100", rotation: "+=270", scale: .8}, ease: Power1.easeOut})
								]);
								break;
							case "kamera":
								rauskramen.append([
									TweenMax.to($stage, .0001, {css: {className: "+=photos"}}),
								]);
								break;
						}
					}
					
					var photostart = 1100;
					var photodur = 600;
					var photocnt = 3;
					
					// nu noch fotos machen
					var photographs = new Array();
					var step = 500/photocnt;
					
					for (var i=0; i<=photocnt; i++) {
						photographs[i] = new TimelineMax()
							.append([
								TweenMax.to($scene.find(".flash"), .05, {css: {autoAlpha: .9}}),
								TweenMax.to($scene.find(".blitz"), .05, {css: {autoAlpha: 1}})
							])
							.append([
								TweenMax.to($scene.find(".flash"), .2, {css: {autoAlpha: 0}, delay: .1}),
								TweenMax.to($scene.find(".blitz"), .15, {css: {autoAlpha: 0}, delay: .3})
							]);
						scene.addAnimation(photostart+(step*i), 0, $stage, photographs[i]);
					}
					
					// position flash
					TweenMax.set($scene.find(".flash"), {css: {y: photostart, height: photostart+photodur+1000}});
					// ende
					var ende = TweenMax.to($stage, .0001, {css: {className: "-=photos"}});
					
					
					scene.addAnimation(30, 0, $stage, koffererscheint);
					scene.addAnimation(150, 1000, $stage, rauskramen);
					scene.addAnimation(photostart+photodur, 0, $stage, ende);
					scene.addPin(50-101, photostart+photodur, $stage.find(".pinelements")); // ende des gastsprungs, 75 is guestoffset
					scene.addPin(170, photodur, $stage.find(".pinpaar"));
					scene.addTransfer(169, 170*2);
					break;
				case "rsvp":
					var loop = new TimelineMax({repeat: -1})
						.append(TweenMax.to($stage, .00001, {css: {className: "+=loop"}, delay: .3}))
						.append(TweenMax.to($stage, .00001, {css: {className: "-=loop"}, delay: .3}));
					
					var backtonormal = TweenMax.to($stage, .0001, {css: {className: "+=normal"}});
					
					scene.addAnimation (-200, 700, $stage, loop);
					scene.addAnimation (-200+700, 0, $stage, backtonormal);
					scene.addPin(170, 1300, $stage.find(".pinpaar"));
					scene.addTransfer(169, 170*2);
					break;
				case "kontakt":
					var startKissing = TweenMax.to($stage, .0001, {css: {className: "+=kissing"}});
					var kissingloop = new TimelineMax({repeat: -1})
						.append(TweenMax.to($paar, .0001, {css: {className: "+=loop"}, delay: .8}))
						.append(TweenMax.to($paar, .0001, {css: {className: "-=loop"}, delay: .3}));
					var stopKissing = TweenMax.to($stage, .0001, {css: {className: "-=kissing"}});
						
					
					
					TweenMax.set($scene.find(".noten"), {css:{autoAlpha: 0}});
					var mobile = TweenMax.to($stage.find(".noten"), .7, {css: {autoAlpha: 1}, repeat: -1, yoyo: true});
					
					var voefelykommt = TweenMax.from($stage.find(".voefely"), .5, {css: {left: -350}, ease: Power0.easeOut});
					var voefelywinkt = new TimelineMax({repeat: 3})
						.append(TweenMax.to($stage.find(".voefely"), .0001, {css: {className: "+=loop"}, delay: .3}))
						.append(TweenMax.to($stage.find(".voefely"), .0001, {css: {className: "-=loop"}, delay: .3}));
					var voefelygeht = TweenMax.to($stage.find(".voefely"), .5, {css: {left: -350}, ease: Power0.easeOut});
					
					var ende = TweenMax.to($stage, .0001, {css: {className: "+=ende"}});
					
					var zoomtoMiddle = new TimelineMax()
						.append([
							TweenMax.to($scene.find(".paar"), .4, {css: {scale: .886}}),
							TweenMax.to($scene.find(".brautpaar"), .4, {css: {left: "50%", marginLeft: -230, top: "50%", marginTop: -240}})
						])
						.append(TweenMax.to($scene.find(".paar"), .0001, {css: {className: "+=waving", scale: 1}, delay: .3}));
					
					var bodenWeg = TweenMax.to($scene.find(".floor"), .3, {css: {autoAlpha: 0}});
					
					var torkommt = TweenMax.fromTo($scene.find(".tor"), .3, {css: {autoAlpha: 0}}, {css: {autoAlpha: 1}, immediateRender: true});
						
					var paarwinkt = new TimelineMax({repeat: -1})
						.append(TweenMax.to($paar, .0001, {css: {className: "+=loop"}, delay: .3}))
						.append(TweenMax.to($paar, .0001, {css: {className: "-=loop"}, delay: .3}));
					
					scene.addAnimation(-100, 0, $stage, startKissing);
					scene.addAnimation(-100, 400, $stage, kissingloop);
					scene.addAnimation(300, 0, $stage, stopKissing);
					scene.addAnimation(-50, 350, $stage, mobile);
					scene.addAnimation(100, 100, $stage, voefelykommt);
					scene.addAnimation(150, 400, $stage, voefelywinkt);
					scene.addAnimation(550, 100, $stage, voefelygeht);
					
					scene.addAnimation(400, 330, $stage, zoomtoMiddle);
					scene.addAnimation(400, 0, $stage, ende);
					scene.addAnimation(700, 0, $stage, bodenWeg);
					scene.addAnimation(730, 0, $stage, torkommt);
					scene.addAnimation(800, 0, $stage, paarwinkt);
					scene.addPin(20, 1800, $stage.find(".pinpaar"));
					break;
			}
		}

		// INIT
		init();
		return aniDrehbuch;
	}
})(jQuery);