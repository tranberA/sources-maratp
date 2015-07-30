if(window.jQuery !== undefined)
{
  function activatePanel(panel)
  {
    var nextFocus = panel.data('next-focus');

    if(nextFocus !== undefined)
    {
      //jQuery(nextFocus).focus();
    }

    panel.attr('aria-hidden','false');
    //panel.addClass('panel-active');
    panel.find('[tabindex=-1]').attr('data-ti','true').removeAttr('tabindex');
    panel.focus();
    //.find('input[type=text]')
  }

  function inactivatePanel(panel,root)
  {
    // var previousFocus = panel.data('prev-focus');
    //
    // if(previousFocus !== undefined)
    // {
    //   jQuery(previousFocus).focus();
    // }

    if(root)
    {
      jQuery('#start-form').focus();
    }


    //panel.removeClass('panel-active');
    panel.attr('aria-hidden','true');
    panel.find('[data-ti=true]').data('ti','false').attr('tabindex','-1');
    //panel.blur();
  }

  jQuery(function()
  {
    // Navigation entre panneaux de formulaire Mes privilèges keyup

    //jQuery('#start-form').focus();
    //
  	// var currentPanel = null;
  	// jQuery('.panel-action').on('click',function(event)
  	// {
  	// 	var current = jQuery(this);
  	// 	var target = current.data('target');
    //
  	// 	if(target !== undefined)
  	// 	{
  	// 		var targetPanel = jQuery('#'+target);
    //
  	// 		if(targetPanel.length > 0)
  	// 		{
    //       var canClose = true;
    //
    //       var closeData = current.data('close');
    //
    //       if(closeData !== undefined)
    //       {
    //         canClose = !!closeData;
    //       }
    //
    //       if(canClose)
    //       {
    //         var close = targetPanel.find('.panel-close');
    //
    //         if(close.length == 0)
    //         {
    //           var closeBtn = jQuery('<button class="panel-close ico-close" tabindex="-1">Fermer</button>').on('click',function(event)
    //             {
    //               if(currentPanel !== null)
    //       				{
    //                 inactivatePanel(currentPanel);
    //       				}
    //
    //               event.preventDefault();
    //             });
    //
    //           targetPanel.append(closeBtn);
    //         }
    //       }
    //
  	// 			if(currentPanel !== null && !targetPanel.is(currentPanel) && currentPanel.hasClass('panel-active'))
  	// 			{
    //         inactivatePanel(currentPanel);
  	// 			}
    //
    //       activatePanel(targetPanel);
    //
  	// 			currentPanel = targetPanel;
  	// 		}
  	// 	}
    //
    //   event.preventDefault();
  	// });

    var formSlide = jQuery('#form-slide-block');
    var form = jQuery('.form-slide',formSlide);
    var itemCollection = form.find('.form-panel');
    var formWidth = 0;
    var blockWidth = formSlide.outerWidth();
    itemCollection.each(function(i)
    {
      formWidth += blockWidth;
      var currentBlock = jQuery(this);
      currentBlock.data('left',blockWidth*i);
      currentBlock.outerHeight(formSlide.outerHeight()).outerWidth(blockWidth);
    });

    form.width(formWidth);

    var currentPanel = null;
    jQuery('.panel-action').on('click',function(event)
  	{
  		var current = jQuery(this);
  		var target = current.data('target');

  		if(target !== undefined)
  		{
  			var targetPanel = jQuery('#'+target);

  			if(targetPanel.length > 0)
  			{
          var canClose = true;

          var closeData = targetPanel.data('close');

          if(closeData !== undefined)
          {
            canClose = !!closeData;
          }

          if(canClose)
          {
            var close = targetPanel.find('.panel-close');

            if(close.length == 0)
            {
              var closeBtn = jQuery('<button class="panel-close ico-close" tabindex="-1">Fermer</button>').on('click',function(event)
                {
                  if(currentPanel !== null)
          				{
                    inactivatePanel(currentPanel,true);
          				}

                  event.preventDefault();
                });

              targetPanel.append(closeBtn);
            }
          }
// && currentPanel.hasClass('panel-active')
          if(currentPanel !== null && !targetPanel.is(currentPanel))
  				{
            inactivatePanel(currentPanel,false);
  				}

          activatePanel(targetPanel);

          var panelLeft = parseInt(targetPanel.data('left'));
          //console.log(panelLeft);

          //form.css({'left': -panelLeft});

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
