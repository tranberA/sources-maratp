
if(window.jQuery !== undefined)
{
  jQuery(function()
  {
    var title = jQuery('head title').text();
    jQuery(window.parent.document).find('#full-popin').attr('title',title);

    jQuery('.closePage').on('click',function(event)
    {
      if(window.parent.PopinUtils)
      {
        window.parent.PopinUtils.closePopin();
      }

      event.preventDefault();
    });
  });
}
