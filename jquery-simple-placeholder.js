/**************************************************************************

  jQuery Simple Placeholder Plugin v0.2.0

  This plugin is designed to give a placeholder to text edit boxes.  
  This placeholder will change colors when the user focuses/unfocuses 
  the placeholder.  If the user inputs any character, then the placeholder
  disappears and the key press registers as normal.  If the user leaves the
  edit box blank, then the placeholder is restored.  The user inputted text
  will not change colors.

  Options:

  colors : An object containing focus and normal color options.
  		blur : the color that the placeholder
  		focus : the color that the placeholder changes to on focus
		normal : the color of the input text.

  placeholder : A string that is used as the placeholder text.	

  validate: A custom validation function.	


  Example:

  HTML
  <div id='placeholder'></div>
  <input id='placeholder2'>

  JavaScript
  $('#placeholder').placeholder();
  $('#placeholder2').placeholder();

**************************************************************************/
(function($){
        
    var settings = {
        colors : {
            blur : '#bbb',
            focus : '#ddd',
            normal : '#000'
        },
        placeholder : 'Enter Something...'
    };

    var methods = {
        init : function(options) {
            return this.each(function() {
            
                if(options !== undefined) {
                    if('validate' in options) {
                        methods.validate = options.validate;
                    }
                }

                
                var input;
                var str = '';
                var opts = {};
                
                if($(this).is('div')) {
                    str = $(this).text();
                    $(this).text('');
                    
                    
                    if(str) {
                        opts = $.extend({},settings,{placeholder:str},options);
                    } else {
                        opts = $.extend({},settings,options);
                    } 

                    input = $('<input type="text" class="input-placeholder" value="' + opts.placeholder + '">').css('color',opts.colors.blur).appendTo($(this));
                } else {
                    input = $(this);
                    str = input.val();
                    input.text('');

                    if(str) {
                        opts = $.extend({},settings,{placeholder:str},options);
                    } else {
                        opts = $.extend({},settings,options);
                    }

                    input.addClass('input-placeholder').css('color',opts.colors.blur).val(opts.placeholder);
                }

                $.data($(this)[0],'changed',false);
                input.bind({
                    focusin : function() {
                        $(this).css('color',opts.colors.focus);
                    },
                    mouseup : function() {
                        if(!$.data($(this)[0],'changed')) {
                            $(this)[0].setSelectionRange(0,0);
                        }
                
                    },
                    focusout : function() {
                    
                        if($(this).val() === '') {
                            $(this).val(opts.placeholder);
                            $.data($(this)[0],'changed',false);

                            $(this).bind({
                                keydown : function() {
                                    $.data($(this)[0],'changed',true);
                                    $(this).val('');
                                    $(this).css('color',opts.colors.normal);
                                    $(this).unbind('keydown');
                                    $(this).unbind('focusin');
                                },
                                focusin : function() {
                                    $(this).css('color',opts.colors.focus);
                                    input[0].setSelectionRange(0,0);
                                }
                            });
                        }

                        if(!$.data($(this)[0],'changed')) {
                            $(this).css('color',opts.colors.blur);
                        }

                    },
                    keydown : function() {
                        $.data($(this)[0],'changed',true);
                        $(this).val('');
                        $(this).css('color',opts.colors.normal);
                        $(this).unbind('keydown');
                        $(this).unbind('focusin');
                    }
                });
            });
        },
        destroy : function() {
            if($(this).is('div')) {
                $(this).find('input').remove();
            } else {
                $(this).unbind('keydown').unbind('focusin').unbind('focusout').unbind('mouseup');
                $(this).removeClass('input-placeholder');
            }

        },
        length : function() {
            if($(this).is('div')) {
                return $(this).find('input').val().length;
            } else {
                return $(this).val().length;
            }
        },
        isActive : function() {
            return !$.data($(this)[0],'changed');
        },
        validate : function() {
            return $.data($(this)[0],'changed');
        }
    };

        
    $.fn.placeholder = function(method) {
        // Meithod calling logic
        if ( methods[method] ) {
            return methods[ method ].apply( this, Array.prototype.slice.call( arguments, 1 ));
        } else if ( typeof method === 'object' || ! method ) {
            return methods.init.apply( this, arguments );
        } else {
            $.error( 'Method ' +  method + ' does not exist on jQuery.simple.placeholder' );
        }
    };
})(jQuery);

