var FW = FW || {};

FW.Table = ( function( window, undefined ) {
    function makeTableResponsive( $table ) {
        var tableHeadItems = [],
            $thead = $table.find('thead'),
            $tbody = $table.find('tbody');

        if( $thead.length === 0 ) { return; }

        $table.addClass('table--responsive');

        $thead.find('th').each(function() {
            tableHeadItems.push( $(this).text() );
        });

        $tbody.find('td').each(function() {
            $(this).attr('data-title', tableHeadItems[$(this).index()] );
        });
    }

    function init() {
        var $tables = $('.c-entry table');

        $tables.each(function() {
            $(this).addClass('table');
            makeTableResponsive( $(this) );
        });
    }

    init();

    return {
        //functie: functie
    };
})( window );
