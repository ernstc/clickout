/*
--------------------------------------------------
Copyright (c) 2011 Ernesto Cianciotta
Licensed under the MIT License:
http://www.opensource.org/licenses/mit-license.php
--------------------------------------------------

	jQuery plugin clickout

	ver 1.0
	
	Bind an event handler to the matched elements, to be executed when the user clicks outside 
	the elements, or trigger that event on an element.	

*/

(function ($)
{

	var uuid = 0;
	var clickoutPrefix = 'clickout';

	$.fn.clickout = function (param)
	{
		return this.each(function ()
		{
			var $this = $(this);

			var handlerID = $this.data('handlerID');
			if (!handlerID) handlerID = clickoutPrefix + uuid++;

			if ($.isFunction(param))
			{
				$this.addClass(handlerID).data('clickoutFunc', param);
				$(document).bind('click.' + handlerID, function (e)
				{
					var el = $(e.srcElement || e.originalTarget || e.target);
					var handlerID = e.handleObj.namespace;

					if (!(el.hasClass(handlerID) || el.parents('.' + handlerID).length > 0))
					{
						var el = $('.' + handlerID);
						if (el.length == 0)
						{
							$(document).unbind('click.' + handlerID);
						}
						else
						{
							var func = el.data('clickoutFunc');
							if ($.isFunction(func))
							{
								func.call(el.get(0), e);
							}
						}
					}
				});
			}
			else
			{
				if (param === false)
				{
					$(document).unbind('click.' + handlerID);
					$this.data('clickoutFunc', $.noop);
				}
				else if (!param == null)
				{
					$(document).trigger('click.' + $this.data('handlerID'));
				}
			}
		});
	}
		
	
})(jQuery);
