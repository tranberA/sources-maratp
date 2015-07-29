if(window.jQuery !== undefined)
{
  jQuery(function()
  {
    // Navigation entre panneaux de formulaire Mes privilèges keyup

    jQuery('#start-form').focus();

  	var currentPanel = null;
  	jQuery('.panel-action').on('click keyup',function(event)
  	{
  		var current = jQuery(this);
  		var target = current.data('target');

  		if(target !== undefined)
  		{
  			var targetPanel = jQuery('#'+target);

  			if(targetPanel.length > 0)
  			{
          var canClose = true;

          var closeData = current.data('close');

          if(closeData !== undefined)
          {
            canClose = !!closeData;
          }

          if(canClose)
          {
            var close = targetPanel.find('.panel-close');

            if(close.length == 0)
            {
              var closeBtn = jQuery('<button class="panel-close ico-close">Fermer</button>').on('click keyup',function(event)
                {
                  if(currentPanel !== null)
          				{
          					currentPanel.removeClass('panel-active');
          				}

                  event.preventDefault();
                });

              targetPanel.append(closeBtn);
            }
          }

          //targetPanel.focus();
  				targetPanel.addClass('panel-active');

// focus sur le lien panneau suivant ???
          //targetPanel.find('.panel-next').focus();

  				if(currentPanel !== null && !targetPanel.is(currentPanel) && currentPanel.hasClass('panel-active'))
  				{
  					currentPanel.removeClass('panel-active');
  				}

  				currentPanel = targetPanel;
  			}
  		}

      event.preventDefault();
  	});
/*
    jQuery('#last-step').on('click',function(ev)
    {
      if(currentPanel !== null)
      {
        currentPanel.removeClass('panel-active');
      }

      jQuery('#merci').addClass('ui-state-active');
    });
*/
    if(jQuery.fn.colorbox !== undefined)
    {
      jQuery('.popin-action').colorbox({
        'opacity': 1,
        'width': '100%',
        'height': '100%'
      });
    }

    jQuery('.styled-check > [type=checkbox]').on('click',function(ev)
  	{
      jQuery(this).parent().toggleClass('ico-check');
      //ev.stopPropagation();
    });

    //
  });
}
