// Horaires (Slider).
	
	var horaires = jQuery('#horaires');
	horaires.attr('class', 'horaires-js');
	var horairesitems = horaires.find('div');
	if (horairesitems.length > 1) {
		jQuery('<p class="horaire-precedent disabled"><button type="button" disabled="disabled"><img src="img/horaire-precedent.png" alt="Horaire précédent" title="Horaire précédent" /></button></p>').prependTo(horaires);
		jQuery('.horaire-precedent button').click(function () {
			var horairenext = jQuery(this).parent().parent().find('.horaire-suivant');
			horairenext.removeClass('disabled');
			horairenext.find('button').removeAttr('disabled');
			var horairescurrentitem = jQuery(this).parent().parent().find('div:not([aria-hidden])');
			horairescurrentitem.attr('aria-hidden', 'true');
			var horairespreviousitem = horairescurrentitem.prev();
			var n = horairespreviousitem.attr('data-index');
			horairescurrentitem.parent().find('div').each(function () {
				jQuery(this).css('left', '-' + (100 * n) + '%');
			});
			horairespreviousitem.removeAttr('aria-hidden');
			if (!horairespreviousitem.prev().is('div')) {
				jQuery(this).attr('disabled', 'disabled');
				jQuery(this).parent().addClass('disabled');
			}
			horairespreviousitem.focus();
		});
		horairesitems.each(function (index) {
			if (index > 0) {
				jQuery(this).attr('aria-hidden', 'true');
			}
			jQuery(this).attr('data-index', index);
			jQuery(this).attr('tabindex', '-1');
		});
		jQuery('<p class="horaire-suivant"><button type="button"><img src="img/horaire-suivant.png" alt="Horaire suivant" title="Horaire suivant" /></button></p>').appendTo(horaires);
		jQuery('.horaire-suivant button').click(function () {
			var horaireprevious = jQuery(this).parent().parent().find('.horaire-precedent');
			horaireprevious.removeClass('disabled');
			horaireprevious.find('button').removeAttr('disabled');
			var horairescurrentitem = jQuery(this).parent().parent().find('div:not([aria-hidden])');
			horairescurrentitem.attr('aria-hidden', 'true');
			var horairesnextitem = horairescurrentitem.next();
			var n = horairesnextitem.attr('data-index');
			horairescurrentitem.parent().find('div').each(function () {
				jQuery(this).css('left', '-' + (100 * n) + '%');
			});
			horairesnextitem.removeAttr('aria-hidden');
			if (!horairesnextitem.next().is('div')) {
				jQuery(this).attr('disabled', 'disabled');
				jQuery(this).parent().addClass('disabled');
			}
			horairesnextitem.focus();
		});
	}
	
// Inputs Focus (Block).

	jQuery('.donnees-remplies input[type="text"]').focus(function () {
		if (!jQuery(this).is('[data-firstfocus]')) {
			jQuery(this).val('');
			jQuery(this).attr('data-firstfocus', 'true');
		}
		jQuery(this).parent().addClass('focus');
	}).blur(function () {
		jQuery(this).parent().removeClass('focus');
	});

// Responsive Dashboard.

	var personalhomeviewportwidth = 800;
	var personalhomeoldviewportwidth = false;
	
	function manageResponsivePersonalHome() {
		if (jQuery(window).width() != personalhomeoldviewportwidth) {
			if (jQuery(window).width() <= personalhomeviewportwidth) {
				jQuery('.dashboard span.button').each(function () {
					jQuery(this).attr('role', 'button').attr('tabindex', '0').attr('aria-label', jQuery(this).parent().text() + ', afficher le contenu ci-après');
					var parent = jQuery(this).parent();
					if (parent.hasClass('visually-hidden')) {
						parent.attr('data-class', 'visually-hidden');
						parent.removeAttr('class');
					}
					parent.next().attr('hidden', 'hidden');
					jQuery(this).click(function () {
						var content = jQuery(this).parent().next();
						if (content.is('[hidden]')) {
							jQuery(this).attr('aria-label', jQuery(this).parent().text() + ', masquer le contenu');
							content.removeAttr('hidden');
						}
						else {
							jQuery(this).attr('aria-label', jQuery(this).parent().text() + ', afficher le contenu ci-après');
							content.attr('hidden', 'hidden');
						}
					}).keydown(function (event) {
						if (event.which == 13 || event.which == 32) {
							jQuery(this).click();
							event.preventDefault();
						}
					});
				});
			}
			else {
				jQuery('.dashboard span.button').each(function () {
					jQuery(this).removeAttr('role').removeAttr('tabindex').removeAttr('aria-label');
					var parent = jQuery(this).parent();
					if (parent.attr('data-class') != '') {
						parent.attr('class', parent.attr('data-class'));
						parent.removeAttr('data-class');
					}
					parent.next().removeAttr('hidden');
					jQuery(this).off();
				});
			}	
		}
		personalhomeoldviewportwidth = jQuery(window).width();
	}
	jQuery(window).ready(manageResponsivePersonalHome);
	jQuery(window).resize(manageResponsivePersonalHome);


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