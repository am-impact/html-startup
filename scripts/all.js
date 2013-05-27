// stop BackgroundImageCache voor IE
try	{ document.execCommand("BackgroundImageCache", false, true); } catch(e) { }

if(!Modernizr.input.placeholder) {
	head.ready('cdn', function() {
		$("[placeholder]").each(function() {
			$(this).defaultvalue();
		});
	});
}


// Functions
head.ready('functions', function() {
	// Submenu
	Menu.apply(".mainnav > li");

    // Zoekveld validatie
    $('.searchform form').validateSearch();
});


// Shadowbox
head.ready('shadowbox', function() {
	Shadowbox.init();
});


// Cookiemelding
head.ready('cookie', function() {
	var cm = new cookieMessage();
      	cm.defaults.mentionUrl = submap + 'pagina.html';
      	cm.mentionCookies();
});


/**
 * Fallback voor block grid
 */
if( !Modernizr.lastchild ) {
	$('.large-block-grid-2>li:nth-child(2n+1)').css({clear: 'both'});
	$('.large-block-grid-3>li:nth-child(3n+1)').css({clear: 'both'});
	$('.large-block-grid-4>li:nth-child(4n+1)').css({clear: 'both'});
	$('.large-block-grid-5>li:nth-child(5n+1)').css({clear: 'both'});
	$('.large-block-grid-6>li:nth-child(6n+1)').css({clear: 'both'});
}
