
jQuery('.bloc-profil .profil-header').each(function () {

	jQuery('<div class="btn-edit"><button type="button" aria-label="' + (jQuery(this).find('h3').text() + ', afficher le formulaire de modifications ci-après') + '">Modifier</button></div>').appendTo(jQuery(this));
	jQuery(this).next().attr('hidden', 'hidden');
	jQuery(this).find('.btn-edit button').click(function () {
		var formedit = jQuery(this).parent().parent().next();
		if (formedit.is('[hidden]')) {
			jQuery(this).addClass('cancel');
			jQuery(this).text('Annuler');
			jQuery(this).attr('aria-label', jQuery(this).parent().parent().find('h3').text() + ', masquer le formulaire de modifications');
			formedit.removeAttr('hidden');
		}
		else {
			jQuery(this).removeAttr('class');
			jQuery(this).text('Modifier');
			jQuery(this).attr('aria-label', jQuery(this).parent().parent().find('h3').text() + ', afficher le formulaire de modifications ci-après');
			formedit.attr('hidden', 'hidden');
		}
	});

});