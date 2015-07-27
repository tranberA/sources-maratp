
// Skiplinks.

	//jQuery.noConflict();

	// Gestion de l'affichage et du masquage des liens d'évitements.
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

	jQuery('header[role="banner"] > div:first-child > div > ul li:last-child a').mouseover(function () {
		jQuery(this).find('img').attr('src', 'img/maRATP-connexion-survol@2x.png');
	});

	jQuery('header[role="banner"] > div:first-child > div > ul li:last-child a').focus(function () {
		jQuery(this).mouseover();
	});

	jQuery('header[role="banner"] > div:first-child > div > ul li:last-child a').mouseout(function () {
		jQuery(this).find('img').attr('src', 'img/maRATP-connexion@2x.png');
	});

	jQuery('header[role="banner"] > div:first-child > div > ul li:last-child a').blur(function () {
		jQuery(this).mouseout();
	});

// Navigation.

	jQuery('#navigation span.button').each(function () {
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
		});
		jQuery(this).keydown(function (event) { // keypress
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
			if(!(jQuery.contains(document.getElementById('navigation'), event.target))) {
				jQuery('#navigation span[role="button"] + div').not('div[hidden]').prev().click();
			}
		}
	});

// Carrousel.

	if (jQuery('#carrousel').length) {
		jQuery('#carrousel').attr('class', 'carrousel-js');
		jQuery('#carrousel > div').attr('class', 'carrousel-js-1');
		// Système d'onglets.
		var tablist = jQuery('<ul role="tablist"></ul>');
		jQuery('#carrousel h3').each(function (index) {
			// Onglet.
			var tab = jQuery('<li id="tab-' + (index + 1) + '" role="tab" aria-controls="tabpanel-' + (index + 1) + '" aria-selected="' + (index > 0 ? 'false' : 'true') + '" tabindex="' + (index > 0 ? '-1' : '0') + '"><img src="img/carrousel-item' + (index == 0 ? 'courant' : '') + '@2x.png" alt="' + jQuery(this).text() + '" title="' + jQuery(this).text() + '" /></li>');
			tab.click(function () {
				if (jQuery(this).attr('aria-selected') == 'false') {
					// Onglet actuellement sélectionné.
					var selected = jQuery(this).parent().find('li[aria-selected="true"]');
					selected.attr('aria-selected', 'false').attr('tabindex', '-1');
					selected.find('img').attr('src', 'img/carrousel-item@2x.png');
					jQuery('#' + selected.attr('aria-controls')).attr('aria-hidden', 'true');
					// Nouvel onglet sélectionné.
					jQuery(this).attr('aria-selected', 'true').attr('tabindex', '0');
					jQuery(this).find('img').attr('src', 'img/carrousel-itemcourant@2x.png');
					jQuery('#' + jQuery(this).attr('aria-controls')).attr('aria-hidden', 'false');
					jQuery('#carrousel > div').attr('class', 'carrousel-js-' + (jQuery(this).parent().find('li').index(jQuery(this)) + 1));
				}
			});
			// Navigation au clavier au sein des onglets.
			tab.keydown(function (event) {
				if (event.which == 37 || event.which == 38) {
					// Onglet précédent (flèches gauche et haut).
					var prev = jQuery(this).prev().length ? jQuery(this).prev() : jQuery(this).parent().find('li').last();
					prev.focus().click();
					event.preventDefault();
				}
				else if (event.which == 39 || event.which == 40) {
					// Onglet suivant (flèches droite et bas).
					var next = jQuery(this).next().length ? jQuery(this).next() : jQuery(this).parent().find('li').first();
					next.focus().click();
					event.preventDefault();
				}
			});
			tablist.append(tab);
			jQuery('#carrousel article:nth-child('+ (index + 1) +')').attr('id', 'tabpanel-' + (index + 1)).attr('role', 'tabpanel').attr('aria-hidden', (index > 0 ? 'true' : 'false')).attr('aria-labelledby', 'tab-' + (index + 1));
		});
		tablist.insertBefore('#carrousel > div');
	}


	// focus sur les formulaires

	var survol = jQuery('.form-item input, .form-item select');

	survol.focus(function(){
    jQuery(this).parent('.form-item').addClass('focus');
  });

  survol.blur(function(){
  	jQuery(this).parent('.form-item').removeClass('focus');
  });


  //focus sur les input sur toute la zone
	jQuery(document).click(function (event) {

		var target = jQuery(event.target);
		if (target.is('div.form-item')) {
			target.find('input, select').focus();
		}

	});
