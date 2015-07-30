// Responsive Dashboard.

	var personalhomeviewportwidth = 800;
	var personalhomeoldviewportwidth = false;
	
	function manageResponsivePersonalHome() {
		if (jQuery(window).width() != personalhomeoldviewportwidth) {
			if (jQuery(window).width() <= personalhomeviewportwidth) {
				jQuery('.dashbord span.button').each(function () {
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
				jQuery('.dashbord span.button').each(function () {
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