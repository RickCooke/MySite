//text-overlay effects
$(document).ready(function(){
    $('.text_overlay').hide();
    $('.image-text_container').mouseover(function(){
        $('.text_overlay', this).slideDown();
        $('.table-img', this).css("opacity", "0.5");
    });
    $('.image-text_container').mouseleave(function(){
        $('.text_overlay', this).slideUp();        
        $('.table-img', this).css("opacity", "1");
    });
});