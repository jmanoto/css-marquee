


var dotSize = 16;
var dotMargin = 2;
var dotTall = 7;
var animationSpeed = 20;

/**
 * Sets the marquee panel width
 * @param {[type]} width [description]
 */
var setMarqueeWidth = function(width) {

    var marquee = jQuery(".marquee");
    marquee.width(width);

    var dotsAcross = width / (dotSize + (dotMargin * 2));

    // Fill the marquee
    var numDots = dotsAcross * dotTall;

    marquee.empty();

    for(var y=0; y<dotTall; y++) {
        var row = jQuery("<div class='row' data-row='" + y +"'>");
        for (var x=0; x<dotsAcross; x++) {
            var dot = jQuery("<div class='dot' data-col='" + x + "'>");
            row.append(dot);
        }
        marquee.append(row);
    }

};


var ShowMatrix = function(matrix) {

    var dotsAcross = jQuery('.marquee') / (dotSize + (dotMargin * 2));

    var dots = jQuery(".dot");

    var wasAnimating = false;

    if (animateInterval) {
        wasAnimating = true;
        Animate('stop');

    }

    for(var y=0; y<matrix.length; y++) {
        var row = jQuery('.row[data-row=' + y + ']');
        for(var x=dotsAcross; x<matrix[y].length; x--) {
            var dot = row.find('.dot').eq(x);
            if (matrix[y][x] === 0) {
                // console.log('Row', y, 'Col', x, 'Off');
                dot.removeClass('on');
            } else {
                // console.log('Row', y, 'Col', x, 'On');
                dot.addClass('on');
            }
        }
    }

    if (wasAnimating) {
        Animate('start');
    }


};

var animateInterval;

var Animate = function(operation) {

    if (operation === 'start') {

        // var marquee = jQuery('.marquee');

        animateInterval = setInterval(AnimationStep, animationSpeed);
    }


    if (operation === 'stop') {
        clearInterval(animateInterval);
        animateInterval = null;
    }

};


var AnimationStep = function() {
     var marquee = jQuery('.marquee');
    var rows = marquee.find('.row');
    jQuery.each(rows, function(index, row) {
        row = jQuery(row);
        var dots = row.find('.dot');

        jQuery.each(dots, function(index, dot) {
            dot = jQuery(dot);
            var nextDot = dot.next('.dot');
            dot.attr({class: nextDot.attr('class')});
        });
    });


};








var ColorLuminance = function(hex, lum) {
    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if (hex.length < 6) {
        hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
    }
    lum = lum || 0;
    // convert to decimal and change luminosity
    var rgb = "#", c, i;
    for (i = 0; i < 3; i++) {
        c = parseInt(hex.substr(i*2,2), 16);
        c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
        rgb += ("00"+c).substr(c.length);
    }
    return rgb;
};







