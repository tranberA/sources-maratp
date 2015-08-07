// Navigation.

	jQuery('#navigation li span.button').each(function () {
		// Gestion des boutons permettant d'ouvrir les sous-menus.
		jQuery(this).attr('aria-label', jQuery(this).text() + ', afficher le sous-menu ci-après');
		jQuery(this).attr('role', 'button');
		jQuery(this).attr('tabindex', '0');
		// Evénements des boutons.
		jQuery(this).click(function () {
			if (jQuery(this).next().is('div[hidden]')) {
				// Masquage du sous-menu précédemment affiché.
				jQuery('#navigation span[role="button"] + div').not('div[hidden]').prev().click();
				jQuery(this).next().removeAttr('hidden');
				jQuery(this).attr('aria-label', jQuery(this).text() + ', masquer le sous-menu');
			}
			else {
				jQuery(this).next().attr('hidden', 'hidden');
				jQuery(this).attr('aria-label', jQuery(this).text() + ', afficher le sous-menu ci-après');
			}
			jQuery(this).toggleClass('expanded');
		}).keydown(function (event) { // keypress
			// Gestion des touches Entrée (13) et Espace (32).
			if (event.which == 13 || event.which == 32) {
				jQuery(this).click();
				event.preventDefault();
			}
		});
		// Sous-menus masqués par défaut.
		jQuery(this).next().attr('hidden', 'hidden');
	});

	jQuery(document).click(function (event) {
		// Clic extérieur à la navigation : fermeture du sous-menu affiché.
		if(document.getElementById('navigation') !== null)
		{
			if (!(jQuery.contains(document.getElementById('navigation'), event.target))) {
				jQuery('#navigation span[role="button"] + div').not('div[hidden]').prev().click();
			}
		}

	});

// Navigation (Responsive).

	jQuery('<p id="navigationbutton"><span role="button" tabindex="0"><img src="img/navigation/mobile/burger.png" alt="Afficher le menu principal ci-après" /></span></p>').prependTo('#navigation');
	jQuery('#navigationbutton span').first().click(function () {
		if (jQuery(this).parent().next().attr('hidden') == 'hidden') {
			jQuery(this).find('img').attr('alt', 'Masquer le menu principal');
			jQuery(this).parent().next().removeAttr('hidden');
		}
		else {
			jQuery(this).find('img').attr('alt', 'Afficher le menu principal ci-après');
			jQuery(this).parent().next().attr('hidden', 'hidden');
		}
	}).keydown(function (event) {
		if (event.which == 13 || event.which == 32) {
			jQuery(this).click();
			event.preventDefault();
		}
	});
	jQuery('#navigation a').last().keypress(function (event) {
		var navigationbutton = jQuery('#navigationbutton');
		if (!navigationbutton.is('[hidden]')) {
			if (event.keyCode == 9 && !event.shiftKey) {
				navigationbutton.find('span[role="button"]').click();
				window.setTimeout(function () {
					jQuery('#main').focus();
				}, 1);
			}
		}
	});
	

	// A déporter dans un fichier commun pour gérer le responsive en contexte script.
	var navviewportwidth = 800;
	var navoldviewportwidth = false;

	function manageResponsiveNavigation() {
		if (jQuery(window).width() != navoldviewportwidth) {
			if (jQuery(window).width() <= navviewportwidth) {
				jQuery('#navigationbutton').removeAttr('hidden');
				jQuery('#navigationbutton img').first().attr('alt', 'Afficher le menu principal ci-après');
				jQuery('#navigation > ul').first().attr('hidden', 'hidden');
			}
			else {
				jQuery('#navigationbutton').attr('hidden', 'hidden');
				jQuery('#navigation > ul').first().removeAttr('hidden');
			}
		}
		navoldviewportwidth = jQuery(window).width();
	}
	jQuery(window).ready(manageResponsiveNavigation);
	jQuery(window).resize(manageResponsiveNavigation);
