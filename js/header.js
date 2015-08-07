// Header.


	// Skiplinks.
	jQuery('#skiplinks').attr('class', 'hide');
	jQuery('#skiplinks a').each(function () {
		jQuery(this).blur(function () {
			jQuery('#skiplinks').attr('class', 'hide');
		});
		jQuery(this).focus(function () {
			jQuery('#skiplinks').attr('class', 'show');
		});
	});
		
	// Login.
	jQuery('#lang + ul li + li a').mouseover(function () {
		jQuery(this).find('img').attr('src', 'img/header/maRATP-log-hover.png');
	}).focus(function () {
		jQuery(this).mouseover();
	}).mouseout(function () {
		jQuery(this).find('img').attr('src', 'img/header/maRATP-log.png');
	}).blur(function () {
		jQuery(this).mouseout();
	});
	
// Header (Responsive).
		
	// Search.

	jQuery('<p id="searchbutton"><span role="button" tabindex="0"><img src="img/header/mobile/search.png" alt="Afficher le champ de recherche ci-après" /></span></p>').prependTo('#search');
	jQuery('#searchbutton span').first().click(function () { 
		if (jQuery(this).parent().next().attr('hidden') == 'hidden') {
			jQuery(this).find('img').attr('alt', 'Masquer le champ de recherche');
			jQuery(this).parent().next().removeAttr('hidden');
		}
		else {
			jQuery(this).find('img').attr('alt', 'Afficher le champ de recherche ci-après');
			jQuery(this).parent().next().attr('hidden', 'hidden');
		}
	}).keydown(function (event) {
		if (event.which == 13 || event.which == 32) {
			jQuery(this).click();
			event.preventDefault();
		}
	});
	jQuery('#search input[type="image"]').keypress(function (event) {
		var searchbutton = jQuery('#searchbutton');
		if (!searchbutton.is('[hidden]')) {
			if (event.keyCode == 9 && !event.shiftKey) {
				searchbutton.find('span[role="button"]').click();
				window.setTimeout(function () {
					jQuery('#langbutton span[role="button"]').focus();
				}, 1);
			}	
		}
	});
		
	// Lang.
	jQuery('<p id="langbutton"><span role="button" lang="en" tabindex="0"><img src="img/header/mobile/lang.png" alt="Choose your language (display languages below)" /></span></p>').prependTo('#lang');
	jQuery('#langbutton span').first().click(function () {
		if (jQuery(this).parent().next().attr('hidden') == 'hidden') {
			jQuery(this).find('img').attr('alt', 'Choose your language (hide)');
			jQuery(this).parent().next().removeAttr('hidden');
		}
		else {
			jQuery(this).find('img').attr('alt', 'Choose your language (display languages below)');
			jQuery(this).parent().next().attr('hidden', 'hidden');
		}
	}).keydown(function (event) {
		if (event.which == 13 || event.which == 32) {
			jQuery(this).click();
			event.preventDefault();
		}
	});
	jQuery('<div></div>').prependTo('#lang div');
	var lang = jQuery('header[role="banner"] ul').first().clone();
	lang.find('abbr').each(function () {
		if (jQuery(this).attr('lang')) {
			jQuery(this).parent().attr('lang', jQuery(this).attr('lang'));
		}
		jQuery(this).parent().html('<img src="img/header/' + (jQuery(this).attr('lang') ? jQuery(this).attr('lang') : jQuery('html').attr('lang')) + '.png" alt="' + jQuery(this).attr('title') + '" title="' + jQuery(this).attr('title') + '" />');
	});
	lang.prependTo('#lang div div');
	jQuery('<p lang="en">Languages</p>').prependTo('#lang div div');
	jQuery('#lang a').last().keypress(function (event) {
		var langbutton = jQuery('#langbutton');
		if (!langbutton.is('[hidden]')) {
			if (event.keyCode == 9 && !event.shiftKey) {
				langbutton.find('span[role="button"]').click();
				window.setTimeout(function () {
					jQuery('#navbutton span[role="button"]').focus();
				}, 1);
			}
		}
	});
	
	
	// A déporter dans un fichier commun pour gérer le responsive en contexte script.
	var headerviewportwidth = 800;
	var headeroldviewportwidth = false;
	
	function manageResponsiveHeader() {
		if (jQuery(window).width() != headeroldviewportwidth) {
			if (jQuery(window).width() <= headerviewportwidth) {
				var ratp = jQuery('.banner p');
				ratp.attr('role', 'heading').attr('aria-level', '1');
				ratp.prependTo('.toolbar');
				jQuery('#searchbutton').removeAttr('hidden');
				jQuery('#searchbutton img').first().attr('alt', 'Afficher le champ de recherche ci-après');
				jQuery('#search .search').attr('hidden', 'hidden');
				jQuery('#langbutton').removeAttr('hidden');
				jQuery('#langbutton img').first().attr('alt', 'Choose your language (display languages below)');
				jQuery('#lang div').first().attr('hidden', 'hidden');
				jQuery('#lang li img').each(function () {
					jQuery(document.createTextNode(jQuery(this).attr('alt'))).insertBefore(jQuery(this));
					jQuery(this).attr('alt', '');
					jQuery(this).removeAttr('title');
				});
			}
			else {
				var ratp = jQuery('.toolbar p[role="heading"]');
				ratp.removeAttr('role').removeAttr('aria-level');
				ratp.prependTo('.banner');
				jQuery('#searchbutton').attr('hidden', 'hidden');
				jQuery('#search .search').removeAttr('hidden');
				jQuery('#langbutton').attr('hidden', 'hidden');
				jQuery('#lang div').first().removeAttr('hidden');
				jQuery('#lang li img').each(function () {
					if (jQuery(this).attr('alt') == '') {
						jQuery(this).attr('alt', jQuery(this).parent().text());
						jQuery(this).attr('title', jQuery(this).attr('alt'));
						jQuery(this).parent().html(jQuery(this));
					}
				});
			}	
		}
		headeroldviewportwidth = jQuery(window).width();
	}
	jQuery(window).ready(manageResponsiveHeader);
	jQuery(window).resize(manageResponsiveHeader);