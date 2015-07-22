// Skiplinks.

	//jQuery.noConflict();

	// Gestion de l'affichage et du masquage des liens d'évitements.
	$('#skiplinks').attr('class', 'hide');
	$('#skiplinks a').each(function () {
		$(this).blur(function () {
			$('#skiplinks').attr('class', 'hide');
		});
		$(this).focus(function () {
			$('#skiplinks').attr('class', 'show');
		});
	});

// Login.

	$('header[role="banner"] > div:first-child > div > ul li:last-child a').mouseover(function () {
		$(this).find('img').attr('src', 'img/maRATP-connexion-survol@2x.png');
	});

	$('header[role="banner"] > div:first-child > div > ul li:last-child a').focus(function () {
		$(this).mouseover();
	});

	$('header[role="banner"] > div:first-child > div > ul li:last-child a').mouseout(function () {
		$(this).find('img').attr('src', 'img/maRATP-connexion@2x.png');
	});

	$('header[role="banner"] > div:first-child > div > ul li:last-child a').blur(function () {
		$(this).mouseout();
	});

// Navigation.

	$('#navigation span.button').each(function () {
		// Gestion des boutons permettant d'ouvrir les sous-menus.
		$(this).attr('aria-label', $(this).text() + ', afficher le sous-menu ci-après');
		$(this).attr('role', 'button');
		$(this).attr('tabindex', '0');
		// Evénements des boutons.
		$(this).click(function () {
			if ($(this).next().is('div[hidden]')) {
				// Masquage du sous-menu précédemment affiché.
				$('#navigation span[role="button"] + div').not('div[hidden]').prev().click();
				$(this).next().removeAttr('hidden');
				$(this).attr('aria-label', $(this).text() + ', masquer le sous-menu');
			}
			else {
				$(this).next().attr('hidden', 'hidden');
				$(this).attr('aria-label', $(this).text() + ', afficher le sous-menu ci-après');
			}
			$(this).toggleClass('expanded');
		});
		$(this).keydown(function (event) { // keypress
			// Gestion des touches Entrée (13) et Espace (32).
			if (event.which == 13 || event.which == 32) {
				$(this).click();
				event.preventDefault();
			}
		});
		// Sous-menus masqués par défaut.
		$(this).next().attr('hidden', 'hidden');
	});

	$(document).click(function (event) {
		// Clic extérieur à la navigation : fermeture du sous-menu affiché.
		if (!($.contains(document.getElementById('navigation'), event.target))) {
			$('#navigation span[role="button"] + div').not('div[hidden]').prev().click();
		}
	});

// Carrousel.

	if ($('#carrousel').length) {
		$('#carrousel').attr('class', 'carrousel-js');
		$('#carrousel > div').attr('class', 'carrousel-js-1');
		// Système d'onglets.
		var tablist = $('<ul role="tablist"></ul>');
		$('#carrousel h3').each(function (index) {
			// Onglet.
			var tab = $('<li id="tab-' + (index + 1) + '" role="tab" aria-controls="tabpanel-' + (index + 1) + '" aria-selected="' + (index > 0 ? 'false' : 'true') + '" tabindex="' + (index > 0 ? '-1' : '0') + '"><img src="img/carrousel-item' + (index == 0 ? 'courant' : '') + '@2x.png" alt="' + $(this).text() + '" title="' + $(this).text() + '" /></li>');
			tab.click(function () {
				if ($(this).attr('aria-selected') == 'false') {
					// Onglet actuellement sélectionné.
					var selected = $(this).parent().find('li[aria-selected="true"]');
					selected.attr('aria-selected', 'false').attr('tabindex', '-1');
					selected.find('img').attr('src', 'img/carrousel-item@2x.png');
					$('#' + selected.attr('aria-controls')).attr('aria-hidden', 'true');
					// Nouvel onglet sélectionné.
					$(this).attr('aria-selected', 'true').attr('tabindex', '0');
					$(this).find('img').attr('src', 'img/carrousel-itemcourant@2x.png');
					$('#' + $(this).attr('aria-controls')).attr('aria-hidden', 'false');
					$('#carrousel > div').attr('class', 'carrousel-js-' + ($(this).parent().find('li').index($(this)) + 1));
				}
			});
			// Navigation au clavier au sein des onglets.
			tab.keydown(function (event) {
				if (event.which == 37 || event.which == 38) {
					// Onglet précédent (flèches gauche et haut).
					var prev = $(this).prev().length ? $(this).prev() : $(this).parent().find('li').last();
					prev.focus().click();
					event.preventDefault();
				}
				else if (event.which == 39 || event.which == 40) {
					// Onglet suivant (flèches droite et bas).
					var next = $(this).next().length ? $(this).next() : $(this).parent().find('li').first();
					next.focus().click();
					event.preventDefault();
				}
			});
			tablist.append(tab);
			$('#carrousel article:nth-child('+ (index + 1) +')').attr('id', 'tabpanel-' + (index + 1)).attr('role', 'tabpanel').attr('aria-hidden', (index > 0 ? 'true' : 'false')).attr('aria-labelledby', 'tab-' + (index + 1));
		});
		tablist.insertBefore('#carrousel > div');
	}
