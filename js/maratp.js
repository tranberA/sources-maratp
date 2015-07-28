
	var survol = jQuery('.form-item input, .form-item select');

	survol.focus(function(){
    jQuery(this).parent('.form-item').addClass('focus');
  });

  survol.blur(function(){
  	jQuery(this).parent('.form-item').removeClass('focus');
  });



	jQuery(document).click(function (event) {

		var target = jQuery(event.target);
		if (target.is('div.form-item')) {
			target.find('input, select').focus();
		}

	});
