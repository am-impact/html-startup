// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

/**
 * Menu functions
 */
window.Menu = {
    delay		: 600,
    timer		: null,
    menuitem	: null,

    /**
     * apply
     * @param	string	selector
     */
    apply: function( selector ) {
        $(selector).hover(Menu.open, Menu.setTimer);
        $(document).click(Menu.close);
    },

    /**
     * cancelTimer
     */
    cancelTimer: function() {
        if(Menu.timer)	{
            clearTimeout(Menu.timer);
            Menu.timer = null;
        }
    },

    /**
     * setTimer
     */
    setTimer: function() {
        Menu.timer = window.setTimeout(Menu.close, Menu.delay);
    },

    /**
     * close
     * @param	string	current_menu_id
     */
    close: function( current_menu_id ) {
        if(Menu.menuitem)	{
            if(Menu.menuitem.data("menuID") != current_menu_id)
            {
                $(Menu.menuitem).removeClass("hover");
                $(Menu.menuitem).find('> .subnav').attr('style', function(i, style)
                {
                    if(style) {
                        return style.replace(/left[^;]+;?/g, '');
                    }
                });
            }
        }
    },

    /**
     * open
     */
    open: function() {
        current_menu = $(this);

        current_menu.addClass("hover");

        // uniek menu id per submenu, dit om bij het sluiten te checken of niet de actieve wordt gesloten
        if(!current_menu.data("menuID"))	{
            current_menu.data("menuID", (Math.random() +''+ Math.random()).replace(/\./g,""))
        }

        Menu.cancelTimer();
        Menu.close( current_menu.data("menuID") );
        Menu.menuitem = current_menu;
    }
};



/**
 * Search form validation
 */
$.fn.validateSearch = function( options )
{
    return this.each(function(index, el)
    {
        var defaults = {
            placeholderAttr : 'placeholder',
            minValueLength  : 3,
            messageTimeout  : 5000,
            errorMessage    : 'Voer 3 of meer karakters in',
            formErrorClass  : 'searcherror',
            errorMessageClass : 'errormessage'
        },
        o = $.extend( defaults, options ),
        $el = $(el);
        inputField = $el.find('input[type=text]'),

        $el.append('<div class="' + o.errorMessageClass + '">' + o.errorMessage + '</div>');

        $el.on('submit', function(e)
        {
            var $this = $(this),
                inputValue = $.trim( $this.find('input[type=text]').val() ),
                inputValueLength = inputValue.length;

            if( inputValueLength < o.minValueLength || inputValue == inputField.attr( o.placeholderAttr ) )
            {
                $this.addClass( o.formErrorClass );

                setTimeout(function()
                {
                    $this.removeClass( o.formErrorClass );
                }, o.messageTimeout);

                e.preventDefault();
            }
        });
    });
};