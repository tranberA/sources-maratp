if(window.jQuery !== undefined)
{
  jQuery(function()
  {
  	var currentPanel = null;
  	jQuery('.panel-action').on('click',function()
  	{
  		var current = jQuery(this);
  		var target = current.data('target');

  		if(target !== undefined)
  		{
  			var targetPanel = jQuery('#'+target);

  			if(targetPanel.length > 0)
  			{
          var close = targetPanel.find('.panel-close');

          if(close.length == 0)
          {
            var closeBtn = jQuery('<button class="panel-close ico-close">Fermer</button>').on('click',function()
              {
                if(currentPanel !== null)
        				{
        					currentPanel.removeClass('panel-active');
        				}
              });

            targetPanel.append(closeBtn);
          }

  				targetPanel.addClass('panel-active');

  				if(currentPanel !== null && !targetPanel.is(currentPanel) && currentPanel.hasClass('panel-active'))
  				{
  					currentPanel.removeClass('panel-active');
  				}

  				currentPanel = targetPanel;
  			}
  		}
  	});
//
    jQuery('#last-step').on('click',function(ev)
    {
      if(currentPanel !== null)
      {
        currentPanel.removeClass('panel-active');
      }

      jQuery('#merci').addClass('ui-state-active');
    });

    jQuery('.styled-check > [type=checkbox]').on('click',function(ev)
  	{
      jQuery(this).parent().toggleClass('ico-check');
      //ev.stopPropagation();
    });

    //
  });
}
