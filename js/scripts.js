jQuery(window).scroll(function(){
    // if window has scrolled down menu far enough (excluding border that will be applied)
    if (jQuery(window).scrollTop() >= jQuery('.site-header').outerHeight()-8) {
        jQuery('.navigation').addClass('mini-nav');
        
        // capture current size of navigation menu
        var old_nav_height = jQuery('.navigation').height();
        
        // adjust page margin to compensate for the navigation change in the DOM, including margin
        jQuery('#page').css('margin-top',old_nav_height+15); 
    } else {
        // return navigation and page to original settings
        jQuery('.navigation').removeClass('mini-nav');
        jQuery('#page').css('margin-top','inherit');
    }
})