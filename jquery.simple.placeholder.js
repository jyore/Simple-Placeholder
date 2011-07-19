/**************************************************************************

  jQuery Simple Placeholder Plugin v0.1r1

  This plugin is designed to give a placeholder to text edit boxes.  
  This placeholder will change colors when the user focuses/unfocuses 
  the placeholder.  If the user inputs any character, then the placeholder
  disappears and the key press registers as normal.  If the user leaves the
  edit box blank, then the placeholder is restored.  The user inputted text
  will not change colors.

  Options:

  colors : An object containing focus and normal color options.
  		focus : the color that the placeholder changes to on focus
		normal : the standard color of the text.

  placeholder : A string that is used as the placeholder text.	


  Example:

  HTML
  <div id='placeholder'></div>

  JavaScript
  $('#placeholder').placeholder();



DISTRIBUTED AS OPEN SOURCE SOFTWARE UNDER THE MIT LICENSE - DETAILED BELOW:
Copyright (c) 2011 Joey Yore

Permission is hereby granted, free of charge, to any person obtaining a 
copy of this software and associated documentation files (the "Software"), 
to deal in the Software without restriction, including without limitation 
the rights to use, copy, modify, merge, publish, distribute, sublicense, 
and/or sell copies of the Software, and to permit persons to whom the 
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included 
in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS 
OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER 
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING 
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER 
DEALINGS IN THE SOFTWARE.
**************************************************************************/



(function($){
	$.fn.placeholder = function(options) {
		
		var settings = {
			colors : {
				focus : '#aaa',
				normal : '#000',
			},
			placeholder : 'Enter Something...',
		}

		return this.each(function() {
			
			var opts = $.extend({},settings,options);

			var input = $('<input type="text" class="input-placeholder" value="' + opts.placeholder + '">').css('color',opts.colors.normal).appendTo($(this));

			input.bind({
				click : function() {
					$(this).css('color',opts.colors.focus);
					input[0].setSelectionRange(0,0);
				},
				focusout : function() {
					$(this).css('color',opts.colors.normal);

					if($(this).val() === '') {
						$(this).val(opts.placeholder);

						$(this).bind({
							keydown : function() {
								$(this).val('');
								$(this).css('color',opts.colors.normal);
								$(this).unbind('keydown');
								$(this).unbind('click');
							},
							click : function() {
								$(this).css('color',opts.colors.focus);
								input[0].setSelectionRange(0,0);
							},
						});
					}
				},
				keydown : function() {
					$(this).val('');
					$(this).css('color',opts.colors.normal);
					$(this).unbind('keydown');
					$(this).unbind('click');
				}
			});
		});
	};
})(jQuery);
