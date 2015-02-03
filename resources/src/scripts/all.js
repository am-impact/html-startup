var FW = FW || {};

/**
 * stop BackgroundImageCache voor IE
 */
try	{ document.execCommand("BackgroundImageCache", false, true); } catch(e) { }


/**
 *  Tel linkjes op desktop niet klikbaar
 */
(function() {
    if( !Modernizr.touch ) {
        $('a[href^="tel:"]').on('click', function(e) {
            e.preventDefault();
        });
    }
})();


/**
 * Fit video's op c-entry zetten
 */
$('.c-entry').fitVids();


/**
 * Cookiemelding
 */
head.ready('cookie', function() {
	/* <?php //TODO: Deze url moet nog aangepast worden voor livegang ?> */
	var cm = new cookieMessage();
      	cm.defaults.mentionUrl = FW.Config.cookieurl;
      	cm.mentionCookies();
});