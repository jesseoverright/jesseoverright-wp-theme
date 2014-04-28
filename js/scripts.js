jQuery(document).ready(function(){
    // set the original background image used on portfolio pages
    background_image = jQuery('#portfolio-item-content').css('background-image');

    portfolio_height = jQuery(window).height()-jQuery('#page').offset().top;

    // set margin top for article so it is just out of browser width
    jQuery('#portfolio-item-content article').css('margin-top',portfolio_height - 175);

    // capture current size of navigation menu
    var old_nav_height = jQuery('.navigation').height();

    jQuery(window).scroll(function(){
        // check browser width for mobile and work around admin bar
        if (jQuery(window).width() <= 600) {
            // if scroll is past the navigation, header, and admin bar
            scroll_limit = jQuery('.navigation').outerHeight() + jQuery('.site-header').outerHeight() + jQuery('#wpadminbar').outerHeight() - 8;
        } else {
            // if scroll is past the header excluding border that will be applied
            scroll_limit = jQuery('.site-header').outerHeight()-8;
        }

        // if window has scrolled down menu far enough ()
        if (jQuery(window).scrollTop() >= scroll_limit) {

            // adjust header height to compensate for the navigation change in the DOM, including it's margin
            jQuery('.site-header').css('margin-bottom',old_nav_height+15);

            // change to mini nav
            jQuery('.navigation').addClass('mini-nav');

        } else {
            // return navigation and page to original settings
            jQuery('.site-header').css('margin-bottom','inherit');
            jQuery('.navigation').removeClass('mini-nav');
        }

        /**
         * on portfolio pages add parallax effect to articles by reducing margin top to zero while
         * the top of the article div has not passed the browser window and the bottom of the article
         * is not visible in the browser window
         */
        if (((parseInt(jQuery('#portfolio-item-content article').css('margin-top')) > 0) && (jQuery(window).scrollTop() <= jQuery('#portfolio-item-content article').offset().top)) && ((jQuery(window).scrollTop() + jQuery(window).height() <= jQuery('#portfolio-item-content article').offset().top + jQuery('#portfolio-item-content article').height()))) {

            if ( (portfolio_height - jQuery(window).scrollTop()*1.35) > 0 && jQuery(window).width() > 1024) {

                // adjust margin-top based on distance scrolled
                jQuery('#portfolio-item-content article').css('margin-top',portfolio_height - jQuery(window).scrollTop()*1.25 - 175);
                // set opacity
                opacity = jQuery(window).scrollTop() / (portfolio_height / 2);

                // adjust opacity to background from 0 to 1
                if (opacity >= 1) {
                    jQuery('#portfolio-item-content').css('background','none');
                } else {
                    jQuery('#portfolio-item-content').css({'background-image': 'linear-gradient(rgba(221,221,221,' + opacity + '),rgba(221,221,221,' + opacity + ')), '+ background_image, 'background-repeat':'no-repeat','background-size':'100% auto'});
                }
            }
        }
    });

});