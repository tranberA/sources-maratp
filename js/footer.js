// Footer (Responsive).

	// A déporter dans un fichier commun pour gérer le responsive en contexte script.
	var viewportwidth = 800;
	var oldviewportwidth = false;
	
	function manageResponsiveFooter() {
		if (jQuery(window).width() != oldviewportwidth) {
			if (jQuery(window).width() <= viewportwidth) {
				jQuery('footer h1').attr('class', 'visually-hidden');
				jQuery('footer h2 span').each(function () {
					jQuery(this).parent().next().attr('hidden', 'hidden');
					jQuery(this).attr('role', 'button').attr('aria-label', jQuery(this).text() + ', afficher ci-après').attr('tabindex', '0');
					jQuery(this).off();
					jQuery(this).click(function () {
						if (jQuery(this).parent().next().is('div[hidden]')) {
							jQuery(this).parent().next().removeAttr('hidden');
							jQuery(this).attr('aria-label', jQuery(this).text() + ', masquer');
						}
						else {
							jQuery(this).parent().next().attr('hidden', 'hidden');
							jQuery(this).attr('aria-label', jQuery(this).text() + ', afficher ci-après');
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
				jQuery('footer h1').removeAttr('class');
				jQuery('footer h2 span').each(function () {
					jQuery(this).parent().next().removeAttr('hidden');
					jQuery(this).removeAttr('role').removeAttr('aria-label').removeAttr('tabindex');
					jQuery(this).off();
				});
			}	
		}
		oldviewportwidth = jQuery(window).width();
	}
	jQuery(window).ready(manageResponsiveFooter);
	jQuery(window).resize(manageResponsiveFooter);