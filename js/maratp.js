jQuery(document).ready(function(){

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

	// bxSlider : carrousel pour les articles priviléges
	if (jQuery.isFunction(jQuery.fn.bxSlider)) {
  	jQuery('.slide-privileges').bxSlider({
		  mode: 'fade',
		  captions: true,
		  controls: true,
		  auto: true,
		  pager: false
		});
  }

});
