var FW = FW || {};


/**
 * Retina images
 */
if (window.devicePixelRatio == 2) {

    var images = $("img[data-retina]");

    // loop through the images and make them hi-res
    for(var i = 0; i < images.length; i++) {

        // create new image name
        var imageType = images[i].src.substr(-4);
        var imageName = images[i].src.substr(0, images[i].src.length - 4);
        imageName += "@2x" + imageType;

        //rename image
        images[i].src = imageName;
    }
}


/**
 * Avoid `console` errors in browsers that lack a console.
 */
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