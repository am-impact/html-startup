var FW = FW || {};

FW.Table = {
    makeTableResponsive: function( $table ) {
        var self = this,
            tableHeadItems = [],
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
    },

    formatWysiwygTables: function() {
        var self = this,
            $tables = $('.c-entry table');

        $tables.each(function() {
            $(this).addClass('table');
            self.makeTableResponsive( $(this) );
        });
    }
};

FW.Table.formatWysiwygTables();