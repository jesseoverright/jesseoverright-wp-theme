/*!
 * Retina.js v1.1.0
 *
 * Copyright 2013 Imulus, LLC
 * Released under the MIT license
 *
 * Retina.js is an open source script that makes it easy to serve
 * high-resolution images to devices with retina displays.
 */
(function(){var root=typeof exports=="undefined"?window:exports;var config={check_mime_type:true};root.Retina=Retina;function Retina(){}Retina.configure=function(options){if(options==null)options={};for(var prop in options)config[prop]=options[prop]};Retina.init=function(context){if(context==null)context=root;var existing_onload=context.onload||new Function;context.onload=function(){var images=document.getElementsByTagName("img"),retinaImages=[],i,image;for(i=0;i<images.length;i++){image=images[i];retinaImages.push(new RetinaImage(image))}existing_onload()}};Retina.isRetina=function(){var mediaQuery="(-webkit-min-device-pixel-ratio: 1.5),                      (min--moz-device-pixel-ratio: 1.5),                      (-o-min-device-pixel-ratio: 3/2),                      (min-resolution: 1.5dppx)";if(root.devicePixelRatio>1)return true;if(root.matchMedia&&root.matchMedia(mediaQuery).matches)return true;return false};root.RetinaImagePath=RetinaImagePath;function RetinaImagePath(path,at_2x_path){this.path=path;if(typeof at_2x_path!=="undefined"&&at_2x_path!==null){this.at_2x_path=at_2x_path;this.perform_check=false}else{this.at_2x_path=path.replace(/\.\w+$/,function(match){return"@2x"+match});this.perform_check=true}}RetinaImagePath.confirmed_paths=[];RetinaImagePath.prototype.is_external=function(){return!!(this.path.match(/^https?\:/i)&&!this.path.match("//"+document.domain))};RetinaImagePath.prototype.check_2x_variant=function(callback){var http,that=this;if(this.is_external()){return callback(false)}else if(!this.perform_check&&typeof this.at_2x_path!=="undefined"&&this.at_2x_path!==null){return callback(true)}else if(this.at_2x_path in RetinaImagePath.confirmed_paths){return callback(true)}else{http=new XMLHttpRequest;http.open("HEAD",this.at_2x_path);http.onreadystatechange=function(){if(http.readyState!=4){return callback(false)}if(http.status>=200&&http.status<=399){if(config.check_mime_type){var type=http.getResponseHeader("Content-Type");if(type==null||!type.match(/^image/i)){return callback(false)}}RetinaImagePath.confirmed_paths.push(that.at_2x_path);return callback(true)}else{return callback(false)}};http.send()}};function RetinaImage(el){this.el=el;this.path=new RetinaImagePath(this.el.getAttribute("src"),this.el.getAttribute("data-at2x"));var that=this;this.path.check_2x_variant(function(hasVariant){if(hasVariant)that.swap()})}root.RetinaImage=RetinaImage;RetinaImage.prototype.swap=function(path){if(typeof path=="undefined")path=this.path.at_2x_path;var that=this;function load(){if(!that.el.complete){setTimeout(load,5)}else{that.el.setAttribute("width",that.el.offsetWidth);that.el.setAttribute("height",that.el.offsetHeight);that.el.setAttribute("src",path)}}load()};if(Retina.isRetina()){Retina.init(root)}})();;jQuery(document).ready(function(){
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

/** add Google webfont Karla **/
WebFontConfig = {
    google: { families: [ 'Karla::latin' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();

