
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
