(function()
{
	var slider;

	// fonctions privées

	function reloadSlider()
	{
		slider.reloadSlider();
	}

	var _lib = {
		configureItem: function(root)
		{
			var rootElement = jQuery(root);

			rootElement.click(function (event) {
				var target = jQuery(event.target);
				if (target.is('div.form-item')) {
					target.find('input, select').focus();
				}
			});

			var survol = jQuery('.form-item input, .form-item select, .form-item textarea',rootElement);

			survol.focus(function(){
		    jQuery(this).parent('.form-item').addClass('focus');
		  });

		  survol.blur(function(){
		  	jQuery(this).parent('.form-item').removeClass('focus');
		  });
		},

		configureSlider: function(root)
		{
			var rootElement = jQuery(root);

			// bxSlider : carrousel pour les articles priviléges
			if (jQuery.isFunction(jQuery.fn.bxSlider)) {
		  	slider = jQuery('.slide-privileges',rootElement).bxSlider({
				  mode: 'fade',
				  captions: true,
				  controls: true,
				  auto: true,
				  pager: false
				});

				// if(root !== document)
				// {
					//slider.reloadSlider();
				// }
				//
				//window.setTimeout(reloadSlider,100);
		  }
		}
	};

	window.FormUtils = _lib;
})();

jQuery(document).ready(function(){

	FormUtils.configureItem(document);

	FormUtils.configureSlider(document);
});

// Mini header.

   // A déporter dans un fichier commun pour gérer le responsive en contexte script.
	var dashboardviewportwidth = 480;
	var dashboardoldviewportwidth = false;

	function manageResponsiveDashboard() {
		if (jQuery(window).width() != dashboardoldviewportwidth) {
			if (jQuery(window).width() <= dashboardviewportwidth) {
				var burger = jQuery('.mini-header span.button');
			  burger.attr('role', 'button').attr('tabindex', '0').attr('aria-label', jQuery('.mini-header h1').text() + ', afficher le menu ci-après');
			  var menu = jQuery('.menu-dashboard');
			  menu.attr('hidden', 'hidden');
			  menu.addClass('menu-dashboard-responsive');
			  burger.click(function () {
			  	var menu = jQuery('.menu-dashboard');
			  	if (menu.is('[hidden]')) {
			  		jQuery(this).attr('aria-label', jQuery('.mini-header h1').text() + ', masquer le menu');
			  		menu.removeAttr('hidden');
			  	}
			  	else {
			  		jQuery(this).attr('aria-label', jQuery('.mini-header h1').text() + ', afficher le menu ci-après');
			  		menu.attr('hidden', 'hidden');
			  	}
			  }).keydown(function (event) {
			  	if (event.which == 13 || event.which == 32) {
			  		jQuery(this).click();
			  	}
			  });
			}
			else {
				var burger = jQuery('.mini-header span.button');
			  burger.removeAttr('role').removeAttr('tabindex').removeAttr('aria-label');
			  var menu = jQuery('.menu-dashboard');
			  menu.removeClass('menu-dashboard-responsive');
			  menu.removeAttr('hidden');
			  burger.off();
			}
		}
		dashboardoldviewportwidth = jQuery(window).width();
	}
	jQuery(window).ready(manageResponsiveDashboard);
	jQuery(window).resize(manageResponsiveDashboard);
