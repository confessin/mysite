$(document).ready(function () {
	// deactivate public form
	$("div.public form input").prop("disabled", true);
	
	
	// form settings
	// ajax setup
	$("form").data("retries", 0);
	$("form").data("maxretries", 3);
	$.ajaxSetup({
		url: 'ajax.php',
		type: "POST",
		cache: false,
		error: function () {
				if (typeof this.context != "undefined") {
					var $form = $(this.context);
					$form.removeClass("sending")
					if ($form.data("retries") < $form.data("maxretries")) {
						$form.data("retries", $form.data("retries") + 1);
						console.log($form.data("retries"));
						$form.submit();
					} else {
						$form.find("button").prop("disabled", true)
							.text(langVars["btn_failed"])
							.addClass("successful");
						window.setTimeout(function(){
							$form.find("button")
								.text(langVars["btn_speichern"])
								.prop("disabled", false)
								.removeClass("successful");
						}, 3000);
						$form.data("retries", 0);
					}
				}
			}
	});
	$("div:not(.public) form button").click(function () {
		$($(this).parents("form").get(0)).submit();
	});
	function updateNames(namen) {
		if (typeof namen != "undefined") {
			var begleitungPrimary = $(".scene#adressdaten").hasClass("begleitung_only");

			$(".scene#rsvp label[for=s-allein] span").text(begleitungPrimary ? namen.begleitung.vorname : namen.gast.vorname);
			$(".scene#rsvp label[for=s-mitgast] span").text(namen.gast.vorname);
			$(".scene#rsvp label[for=a-guest] span").text(namen.gast.vorname);
			$(".scene#rsvp label[for=a-anhang] span").text(namen.begleitung.vorname);
			$(".scene#adressdaten form input[name=vorname_begleitung]").val(namen.begleitung.vorname);
			$(".scene#adressdaten form input[name=nachname_begleitung]").val(namen.begleitung.nachname);
		}
	}
	
	// RSVP Formular
	// form button deaktivieren
	$(".scene#rsvp form").change(function() {
		$("form button").attr("disabled", false);
	});
	// show rsvp 2 oder nicht
	function checkShowRsvp2 () {
		if ($(".scene#rsvp form #rsvp1 input#r-yes").is(":checked")) {
			$(".scene#rsvp form #rsvp2").slideDown();
		} else {
			$(".scene#rsvp form #rsvp2").slideUp();
		}
	}
	$(".scene#rsvp form #rsvp1 input").change(checkShowRsvp2);
	checkShowRsvp2();

	// zeremonie / Feier buttons
	var $zeremonie = $(".scene#rsvp input#zeremonie");
	var $feier = $(".scene#rsvp input#feier");
	function bothOut () {
		return !$zeremonie.prop("checked") && !$zeremonie.prop("checked");
	}
	$zeremonie.change(function () {
		if (bothOut())
			$feier.prop("checked", true);
	});
	$feier.change(function () {
		if (bothOut())
			$zeremonie.prop("checked", true);
	});

	// Anhang Bereich
	$(".scene#rsvp #rsvp2 input.paar, .scene#rsvp #rsvp2 input.allein").change(function () {
		var $input = $(".scene#rsvp #rsvp-singular input.paar:first");
		var $target = $(".scene#rsvp #rsvp-singular .optional");
		if ($(this).is(".scene#rsvp #rsvp-plural input")) {
			$input = $(".scene#rsvp #rsvp-plural input.allein");
			$target = $(".scene#rsvp #rsvp-plural .optional");
		}
		var sign = "."
		if ($input.is(":checked")) {
			$target.slideDown();
			sign = ":";
		} else {
			$target.slideUp();
		}
		var txt = $input.next("label").html();
		if (txt[txt.length-1] == "." || txt[txt.length-1] == ":") txt = txt.substr(0, txt.length-1);
		$input.next("label").html(txt + sign);
	});

	// form speichern

	$(".scene#rsvp form").submit(function (e) {
		e.preventDefault();
		var $form = $(this);
		var $rsvpScene = $(".scene#rsvp");
		if (!$form.hasClass("sending")) {
			$form.addClass("sending");
			var array = $form.serializeArray();
			var data = new Object();
			$.each(array, function (i, field) {
				data[field.name] = field.value;
			});
			data["countas"] = $rsvpScene.hasClass("plural") ? data["p-countas"] : data["s-countas"];
			$.ajax({
				data: data,
				context: $form,
				success: function (data, str) {
					$form.data("retries", 0);
					//console.log(data, str);
					if (data.success) {
						$form.removeClass("sending");
						// reset
						$form.find("input#p-paar").prop("checked", true).change();
						$form.find("input#s-allein").prop("checked", true).change();

						// Inhalte anpassen
						$rsvpScene
							.attr("class", "scene")
							.addClass(data.numerus)
							.addClass("rsvp-"+data.response);

						var $adressScene = $(".scene#adressdaten")
							.attr("class", "scene")
							.addClass(data.numerus)
							.addClass("rsvp-"+data.response);

						if (data.begleitung_only == 1) {
							$rsvpScene.addClass("begleitung_only");
							$adressScene.addClass("begleitung_only");
						}

						// namen updaten
						updateNames(data.namen);	


						// Button

						$form.find("button").prop("disabled", true);
						$form.find("button")
							.text(langVars["btn_gespeichert"])
							.addClass("successful");
						window.setTimeout(function(){
							$form.find("button")
								.text(langVars["btn_speichern"])
								.removeClass("successful");
						}, 2000);
					}
				}
			});
		}
	});
	
	// Adressdaten
	$(".scene#adressdaten form").submit(function (e) {
		e.preventDefault();
		var $form = $(this);
		var $rsvpScene = $(".scene#rsvp");
		if (!$form.hasClass("sending")) {
			$form.addClass("sending");
			var array = $form.serializeArray();
			var data = new Object();
			$.each(array, function (i, field) {
				data[field.name] = field.value;
			});
			$.ajax({
				data: data,
				context: $form,
				success: function (data, str) {
					//console.log(data, str);
						$form.removeClass("sending");
					if (data.success) {
						updateNames(data.namen);
						// Button
						$form.find("button").prop("disabled", true);
						$form.find("button")
							.text(langVars["btn_gespeichert"])
							.addClass("successful");
						window.setTimeout(function(){
							$form.find("button")
								.text(langVars["btn_speichern"])
								.prop("disabled", false)
								.removeClass("successful");
						}, 2000);

					}
				}
			});
		}
	});
});