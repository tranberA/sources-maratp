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

			function initSlider()
			{
				//alert(this.toSource())
			}

			// bxSlider : carrousel pour les articles priviléges
			if (jQuery.isFunction(jQuery.fn.bxSlider)) {
		  	slider = jQuery('.slide-privileges',rootElement).bxSlider({
				  mode: 'fade',
				  captions: true,
				  controls: true,
				  auto: true,
				  pager: false/*,
					onSliderLoad: initSlider*/
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

(function()
{
	var popin,popinWin;

	var _lib = {
		initFullPopin: function()
		{
			jQuery('.full-popin-action').on('click',function(event)
			{
				if(popin === undefined || popin.length == 0)
				{
					jQuery('body').append('<iframe id="full-popin" frameborder="0"/>');
					popin = jQuery('#full-popin');
				}

				popin.attr('aria-hidden',false);

				var src = jQuery(this).attr('href');
				popin.attr('src',src);

				popinWin = jQuery(popin.get(0).contentWindow);

				jQuery(window).blur();
				popinWin.focus();

				event.preventDefault();
			});
		},
		closePopin: function()
		{
			popin.attr('aria-hidden',true);
			popinWin.blur();
			jQuery(window).focus();
		}
	};

	window.PopinUtils = _lib;
})();

//full-popin-action

jQuery(document).ready(function()
{
	FormUtils.configureItem(document);
	FormUtils.configureSlider(document);
	PopinUtils.initFullPopin();
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

// Suppression d'une alerte.
$('.bloc-supprimer').each(function (event) {
	$('<p><button type="button" class="supprimer" aria-label="Affcher ci-après la procédure de suppresion de ' + $(this).parent().parent().find('.number').text() + '">Supprimer<span class="ico-trash" aria-hidden="true"> </span></button></p>').prependTo($(this));
	var suppalerte = $(this).find('.supp-alerte');
	suppalerte.attr('hidden', 'hidden');
	$('<button type="button" class="non" aria-label="Je ne souhaite pas supprimer ' + $(this).parent().parent().find('.number').text() + '">Non</button>').appendTo(suppalerte);
	$(this).find('button.supprimer').click(function () {
		var next = $(this).parent().next();
		next.removeAttr('hidden');
		$(this).parent().attr('hidden', 'hidden');
		next.find('button')[0].focus();
	});
	$(this).find('.non').click(function () {
		var suppalerte = $(this).parent();
		suppalerte.attr('hidden', 'hidden');
		suppalerte.prev().removeAttr('hidden');
		suppalerte.prev().find('button').focus();
	});
});
