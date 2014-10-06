jQuery(document).scroll(function() {
    if (jQuery(this).scrollTop() > 175) {
        jQuery('.header').css('position','fixed');
        jQuery('.header').css('top','0');
        jQuery('.header').css('width','950px');
    } 
    else {
        jQuery('.header').css('position','static');
    }
});