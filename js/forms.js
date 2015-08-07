if(window.jQuery !== undefined)
{
  function activatePanel(panel,errors)
  {
    var nextFocus = panel.data('next-focus');

    if(nextFocus !== undefined)
    {
      //jQuery(nextFocus).focus();
    }

    if(errors.length === 0)
    {
      panel.attr('aria-hidden','false');
      panel.find('[tabindex=-1]').attr('data-ti','true').removeAttr('tabindex');
    }
    else
    {
      if(arguments.length >= 3)
      {
        var element = arguments[2];

        FormValidator.displayError(element,errors.join('<br />'));
      }
    }

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
      var errors = [];

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
          if(current.is('#start-form') || current.is('#last-step') || current.hasClass('panel-next'))
          {
            if(current.hasClass('panel-next') || current.is('#last-step'))
            {
              var validation = current.data('validationTarget');
              if(validation !== undefined)
              {
                var valTarget = jQuery('#'+validation);
                var type = valTarget.attr('type');

                if(type === 'text')
                {
                  if(valTarget.is(':blank'))
                  {
                    var blankMessage = valTarget.data('blank');
                    var blankString = 'Vide';
                    if(blankMessage !== undefined)
                    {
                      blankString = blankMessage;
                    }

                    errors.push(blankString);
                  }
else {



                    if(validation === 'cp-field')
                    {
                      if(FormValidator.checkPostalCode(valTarget.val()))
                      {
                        var invalidMessage = valTarget.data('codeinvalid');
                        var invalidString = 'Invalide';
                        if(invalidMessage !== undefined)
                        {
                          invalidString = invalidMessage;
                        }

                        errors.push(invalidString);
                      }
                    }
                  }

                }
                if(type === 'checkbox' && !valTarget.is(':checked'))
                {
                  var uncheckedMessage = valTarget.data('required');
                  var uncheckedString = 'Non coché';
                  if(uncheckedMessage !== undefined)
                  {
                    uncheckedString = uncheckedMessage;
                  }

                  errors.push(uncheckedString);
                }

                activatePanel(targetPanel,errors,valTarget);
              }
            }
            else {
              activatePanel(targetPanel,errors);
            }
          }

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

    // Centrage vertical du contenu du dernier bloc du formulaire

    var panel5 = jQuery('#panel-5');
    panel5.wrapInner('<div class="panel-5-content"/>');
    var panelContent = panel5.find('.panel-5-content');

    var panelHeight = panel5.outerHeight();
    var panelContentHeight = panelContent.outerHeight();

    panelContent.css({'top': (panelHeight-panelContentHeight)/2});
  });
}
