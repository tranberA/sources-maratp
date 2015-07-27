// Carrousel.
	
	function createCarrousel () {
		if (jQuery('#carrousel').length && jQuery('#carrousel.carrousel-js').length == 0) {
			jQuery('#carrousel').attr('class', 'carrousel-js');
			jQuery('#carrousel > div').attr('class', 'carrousel-js-1');
			// Système d'onglets.
			var tablist = jQuery('<ul role="tablist"></ul>');
			jQuery('#carrousel h3').each(function (index) {
				// Onglet.
				var tab = jQuery('<li id="tab-' + (index + 1) + '" role="tab" aria-controls="tabpanel-' + (index + 1) + '" aria-selected="' + (index > 0 ? 'false' : 'true') + '" tabindex="' + (index > 0 ? '-1' : '0') + '"><img src="img/pages/home_non-loguee/carrousel-' + (index == 0 ? 'current' : '') + 'item.png" alt="' + jQuery(this).text() + '" title="' + jQuery(this).text() + '" height="' + (index == 0 ? '14' : '7') + '" width="' + (index == 0 ? '14' : '7') + '" /></li>');
				tab.click(function () {
					if (jQuery(this).attr('aria-selected') == 'false') {
						// Onglet actuellement sélectionné.
						var selected = jQuery(this).parent().find('li[aria-selected="true"]');
						selected.attr('aria-selected', 'false').attr('tabindex', '-1');
						selected.find('img').attr('src', 'img/pages/home_non-loguee/carrousel-item.png').attr('height', '7').attr('width', '7');
						jQuery('#' + selected.attr('aria-controls')).attr('aria-hidden', 'true');
						// Nouvel onglet sélectionné.
						jQuery(this).attr('aria-selected', 'true').attr('tabindex', '0');
						jQuery(this).find('img').attr('src', 'img/pages/home_non-loguee/carrousel-currentitem.png').attr('height', '14').attr('width', '14');
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
	}
	
	function destroyCarrousel() {
		// On réinitialise le carrousel.
		jQuery('#carrousel').removeAttr('class');
		jQuery('#carrousel > div').removeAttr('class');
		// On supprime la liste de bullets.
		jQuery('#carrousel ul[role="tablist"]').remove();
		// On vire les attributs sur article.
		jQuery('#carrousel article[role="tabpanel"]').removeAttr('role').removeAttr('id').removeAttr('aria-hidden');
	}
	
// Responsive.

	var homeviewportwidth = 800;
	var homeoldviewportwidth = false;
	
	function manageResponsiveHome() {
		if (jQuery(window).width() != homeoldviewportwidth) {
			if (jQuery(window).width() <= homeviewportwidth) {
				destroyCarrousel();
				jQuery('#account').prependTo('#carrousel');
			}
			else {
				createCarrousel();
				jQuery('#account').appendTo('#carrousel');
			}	
		}
		homeoldviewportwidth = jQuery(window).width();
	}
	jQuery(window).ready(manageResponsiveHome);
	jQuery(window).resize(manageResponsiveHome);