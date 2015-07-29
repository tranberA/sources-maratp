if(window.jQuery !== undefined)
{
  jQuery(function()
  {
    // récupération de la couleur de fond du premier ancêtre non-transparent
  	function getAncestorBackgroundColor(node)
  	{
  		var bgc = node.css('background-color');
      var transparentPattern = /transparent|rgba\(0\,\s0\,\s0\,\s0\)/;
  		if(bgc.search(transparentPattern) !== -1)
  		{
  			return getAncestorBackgroundColor(node.parent());
  		}
  		else
  		{
  			return bgc;
  		}
  	}

  	// Titres avec filets

  	jQuery('.rich-display').each(function()
  	{
  		var current = jQuery(this);
  		var wrapText = jQuery('<span/>');

  		var bgColor = getAncestorBackgroundColor(current);
  		wrapText.css({'background-color': bgColor});

  		current.wrapInner(wrapText);
  	});
  });
}
