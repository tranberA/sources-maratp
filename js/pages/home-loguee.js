// Horaires (Slider).
	
	var horaires = $('#horaires');
	horaires.attr('class', 'horaires-js');
	var horairesitems = horaires.find('div');
	if (horairesitems.length > 1) {
		$('<p class="horaire-precedent disabled"><button type="button" disabled="disabled"><img src="img/horaire-precedent.png" alt="Horaire précédent" title="Horaire précédent" /></button></p>').prependTo(horaires);
		$('.horaire-precedent button').click(function () {
			var horairenext = $(this).parent().parent().find('.horaire-suivant');
			horairenext.removeClass('disabled');
			horairenext.find('button').removeAttr('disabled');
			var horairescurrentitem = $(this).parent().parent().find('div:not([aria-hidden])');
			horairescurrentitem.attr('aria-hidden', 'true');
			var horairespreviousitem = horairescurrentitem.prev();
			var n = horairespreviousitem.attr('data-index');
			horairescurrentitem.parent().find('div').each(function () {
				$(this).css('left', '-' + (100 * n) + '%');
			});
			horairespreviousitem.removeAttr('aria-hidden');
			if (!horairespreviousitem.prev().is('div')) {
				$(this).attr('disabled', 'disabled');
				$(this).parent().addClass('disabled');
			}
			horairespreviousitem.focus();
		});
		horairesitems.each(function (index) {
			if (index > 0) {
				$(this).attr('aria-hidden', 'true');
			}
			$(this).attr('data-index', index);
			$(this).attr('tabindex', '-1');
		});
		$('<p class="horaire-suivant"><button type="button"><img src="img/horaire-suivant.png" alt="Horaire suivant" title="Horaire suivant" /></button></p>').appendTo(horaires);
		$('.horaire-suivant button').click(function () {
			var horaireprevious = $(this).parent().parent().find('.horaire-precedent');
			horaireprevious.removeClass('disabled');
			horaireprevious.find('button').removeAttr('disabled');
			var horairescurrentitem = $(this).parent().parent().find('div:not([aria-hidden])');
			horairescurrentitem.attr('aria-hidden', 'true');
			var horairesnextitem = horairescurrentitem.next();
			var n = horairesnextitem.attr('data-index');
			horairescurrentitem.parent().find('div').each(function () {
				$(this).css('left', '-' + (100 * n) + '%');
			});
			horairesnextitem.removeAttr('aria-hidden');
			if (!horairesnextitem.next().is('div')) {
				$(this).attr('disabled', 'disabled');
				$(this).parent().addClass('disabled');
			}
			horairesnextitem.focus();
		});
	}
	
// Inputs Focus (Block).

	$('.donnees-remplies input[type="text"]').focus(function () {
		$(this).parent().addClass('focus');
	}).blur(function () {
		$(this).parent().removeClass('focus');
	});

// Responsive Dashboard.

	var personalhomeviewportwidth = 800;
	var personalhomeoldviewportwidth = false;
	
	function manageResponsivePersonalHome() {
		if ($(window).width() != personalhomeoldviewportwidth) {
			if ($(window).width() <= personalhomeviewportwidth) {
				$('.dashboard span.button').each(function () {
					$(this).attr('role', 'button').attr('tabindex', '0').attr('aria-label', $(this).parent().text() + ', afficher le contenu ci-après');
					var parent = $(this).parent();
					if (parent.hasClass('visually-hidden')) {
						parent.attr('data-class', 'visually-hidden');
						parent.removeAttr('class');
					}
					parent.next().attr('hidden', 'hidden');
					$(this).click(function () {
						var content = $(this).parent().next();
						if (content.is('[hidden]')) {
							$(this).attr('aria-label', $(this).parent().text() + ', masquer le contenu');
							content.removeAttr('hidden');
						}
						else {
							$(this).attr('aria-label', $(this).parent().text() + ', afficher le contenu ci-après');
							content.attr('hidden', 'hidden');
						}
					}).keydown(function (event) {
						if (event.which == 13 || event.which == 32) {
							$(this).click();
							event.preventDefault();
						}
					});
				});
			}
			else {
				$('.dashboard span.button').each(function () {
					$(this).removeAttr('role').removeAttr('tabindex').removeAttr('aria-label');
					var parent = $(this).parent();
					if (parent.attr('data-class') != '') {
						parent.attr('class', parent.attr('data-class'));
						parent.removeAttr('data-class');
					}
					parent.next().removeAttr('hidden');
					$(this).off();
				});
			}	
		}
		personalhomeoldviewportwidth = $(window).width();
	}
	$(window).ready(manageResponsivePersonalHome);
	$(window).resize(manageResponsivePersonalHome);


// // Responsive Dashboard.

// 	var personalhomeviewportwidth = 800;
// 	var personalhomeoldviewportwidth = false;
	
// 	function manageResponsivePersonalHome() {
// 		if (jQuery(window).width() != personalhomeoldviewportwidth) {
// 			if (jQuery(window).width() <= personalhomeviewportwidth) {
// 				jQuery('.dashbord span.button').each(function () {
// 					jQuery(this).attr('role', 'button').attr('tabindex', '0').attr('aria-label', jQuery(this).parent().text() + ', afficher le contenu ci-après');
// 					var parent = jQuery(this).parent();
// 					if (parent.hasClass('visually-hidden')) {
// 						parent.attr('data-class', 'visually-hidden');
// 						parent.removeAttr('class');
// 					}
// 					parent.next().attr('hidden', 'hidden');
// 					jQuery(this).click(function () {
// 						var content = jQuery(this).parent().next();
// 						if (content.is('[hidden]')) {
// 							jQuery(this).attr('aria-label', jQuery(this).parent().text() + ', masquer le contenu');
// 							content.removeAttr('hidden');
// 						}
// 						else {
// 							jQuery(this).attr('aria-label', jQuery(this).parent().text() + ', afficher le contenu ci-après');
// 							content.attr('hidden', 'hidden');
// 						}
// 					}).keydown(function (event) {
// 						if (event.which == 13 || event.which == 32) {
// 							jQuery(this).click();
// 							event.preventDefault();
// 						}
// 					});
// 				});
// 			}
// 			else {
// 				jQuery('.dashbord span.button').each(function () {
// 					jQuery(this).removeAttr('role').removeAttr('tabindex').removeAttr('aria-label');
// 					var parent = jQuery(this).parent();
// 					if (parent.attr('data-class') != '') {
// 						parent.attr('class', parent.attr('data-class'));
// 						parent.removeAttr('data-class');
// 					}
// 					parent.next().removeAttr('hidden');
// 					jQuery(this).off();
// 				});
// 			}	
// 		}
// 		personalhomeoldviewportwidth = jQuery(window).width();
// 	}
// 	jQuery(window).ready(manageResponsivePersonalHome);
// 	jQuery(window).resize(manageResponsivePersonalHome);