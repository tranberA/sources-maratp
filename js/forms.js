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

    panel.find('[tabindex=-1]').attr('data-ti','true').removeAttr('tabindex');
    //panel.focus();

    //panel.animate({'top': 0},5000);
  }

  function inactivatePanel(panel,root,hide)
  {
    if(root)
    {
      jQuery('#start-form').focus();
    }

    if(hide)
    {
      panel.attr('aria-hidden','true');
    }

    panel.find('[data-ti=true]').data('ti','false').attr('tabindex','-1');
  }


  jQuery(function()
  {
    var formSlide = jQuery('#form-slide-block');
    var form = jQuery('.form-slide',formSlide);
    var itemCollection = form.find('.form-panel');
    var formWidth = 0;
    var blockWidth = formSlide.outerWidth();
    var blockHeight = formSlide.outerHeight();

    function testPanels()
    {
      var activePanelsCount = formSlide.find('.form-panel[aria-hidden="true"]').length;
      if(activePanelsCount === itemCollection.length)
      {
        formSlide.toggleClass('form-active');
      }
    }


    itemCollection.each(function(i)
    {
      var currentBlock = jQuery(this);
      currentBlock.css('top',blockHeight);
      currentBlock.outerHeight(blockHeight).outerWidth(blockWidth);
    });

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
                    inactivatePanel(currentPanel,true,false);
          				}

                  targetPanel.attr('aria-hidden','true');

                  testPanels();
                  event.preventDefault();
                });

              targetPanel.append(closeBtn);
            }
          }

          if(currentPanel !== null && !targetPanel.is(currentPanel))
  				{
            //inactivatePanel(currentPanel,false,true);
  				}
//alert(current.hasClass('panel-prev'))
          if(current.hasClass('panel-prev'))
          {
            currentPanel.attr('aria-hidden','true');
          }

          testPanels();

          // var inactivePanelsCount = formSlide.find('.form-panel[aria-hidden="false"]').length;
          // if(inactivePanelsCount === itemCollection.length)
          // {
          //   formSlide.addClass('form-active');
          // }

          activatePanel(targetPanel);

        	currentPanel = targetPanel;
        }
      }

      event.preventDefault();
    });

    var _colorboxConfig = {
      'opacity': 1
    };

    function setColorbox()
    {
      var windowWidth = jQuery(window).width();

      if(windowWidth < 480)
      {
        _colorboxConfig.width = '100%';
        _colorboxConfig.height = '100%';
      }
      else
      {
        _colorboxConfig.width = '60%';
        _colorboxConfig.height = false;
      }

      if(jQuery.fn.colorbox !== undefined)
      {
        jQuery('.popin-action').colorbox(_colorboxConfig);
      }
    }

    setColorbox();

    jQuery(window).on('resize',function()
    {
      setColorbox();
    });

    jQuery('.styled-check > [type=checkbox]').on('click',function(ev)
  	{
      jQuery(this).parent().toggleClass('ico-check');
      //ev.stopPropagation();
    });

    //
  });
}
