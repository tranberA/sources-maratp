if(window.jQuery !== undefined)
{
  jQuery(function()
  {
  	var currentPanel = null;
  	jQuery('.panel-action').on('click',function()
  	{
  		var current = jQuery(this);
  		var target = current.data('target');
      //var prev = current.data('next');

  		if(target !== undefined)
  		{


  			var targetPanel = jQuery('#'+target);
  			if(targetPanel.length > 0)
  			{
  				targetPanel.addClass('panel-active');
  				if(currentPanel !== null)
  				{
  					currentPanel.removeClass('panel-active');
  				}

  				currentPanel = targetPanel;
  			}
  		}
  	});
  });
}
