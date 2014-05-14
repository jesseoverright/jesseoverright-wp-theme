/*global Backbone, jQuery, _, wp */
var app = app || {};

(function () {
    'use strict';
    
    app.Portfolio = Backbone.Model.extend({
        defaults: {
            id: '',
            title: '',
            content: ''
        }
    });
})();;/*global Backbone, jQuery, _, wp */
var app = app || {};

(function () {
    'use strict';
    
    app.Post = Backbone.Model.extend({
        defaults: {
            id: '',
            title: '',
            content: '',
            type: 'post',
            featured_image : {
                source: ''
            }
        }
    });
})();;/*global Backbone, jQuery, _, wp */
var app = app || {};

(function ($) {
    'use strict';

    app.View = Backbone.View.extend({
        el : function() {
            return document.getElementById( 'backbone' );
        },

        currentViews: {},

        events : {
            'click .menu-item' : 'initRouter',
            'click .portfolio-tile a' : 'initRouter'
        },

        initialize : function() {
            this.$page = $('#page');
            
            // add a content id if none exists
            if (this.$page.find('#content').length == 0) {
                this.$page.append('<div id="content"></div>');
            }
            this.$content = $('#content');
            this.$portfolio = $('#portfolio');

            this.listenTo( app.posts, 'reset', this.refreshPage);
            //this.listenTo( app.portfolio_tiles, 'reset', this.addPortfolioTiles)
        },

        initRouter : function ( evt ) {
            evt.preventDefault();

            // Get the link
            var pathname = evt.target.pathname;
            
            // in cases where a child element of an a tag was clicked, need to track down pathname of a tag.
            if (typeof pathname == 'undefined') {
                pathname = evt.currentTarget.pathname;
            }

            // Trigger the router
            app.router.navigate( pathname, {trigger: true});
        },

        refreshPage : function () {
            var main = this;

            this.$page.fadeOut(function () {
                main.addPosts();
                main.addPortfolioTiles();
            })

            this.$page.fadeIn();
        },

        addPortfolioTiles : function () {
            this.$portfolio.remove();

            if (app.portfolio_tiles.length > 0) {
                this.$page.prepend( '<div id="portfolio"></div>' );
                this.$portfolio = $('#portfolio');

                app.portfolio_tiles.each( this.portfolioTileView, this );
            }
        },

        addPosts : function() {
            this.$content.html( '' );
            app.posts.each( this.postView, this );
        },

        portfolioTileView : function ( portfolio ) {
            var view = new app.PortfolioTileView( { model: portfolio } );
            this.$portfolio.append( view.render().el.childNodes );
        },

        postView : function ( post ) {
            var view = new app.PostView( { model: post } );

            if ( view.model.get('type') == 'portfolio-item' ) {
                console.log('success');
                view = new app.PortfolioItemView( { model: post } );
                this.$page.append( view.render().el );
            } else {
                if ($('#portfolio-item-content').length > 0) 
                    $('#portfolio-item-content').remove();

                this.$content.append( view.render().el.childNodes );                      
            }
        }
    });
})(jQuery);;/*global Backbone, jQuery, _, wp */
var app = app || {};

(function ($) {
    'use strict';

    app.PortfolioItemView = Backbone.View.extend({
        id : 'portfolio-item-content',

        template : wp.template( 'portfolio-item' ),

        render : function() {
            this.id = 'portfolio-item-' + this.model.get('id');
            var portfolio_background_image = this.model.get('featured_image')['source'];

            // #page will be faded out on load, so use footer
            var portfolio_height = $(window).height() - $('footer').offset().top;

            this.$el.html( this.template( this.model.toJSON() ) ).css('background-image', "url('" + portfolio_background_image + "')");
            this.$el.find('article').css('margin-top', portfolio_height - 175);

            // reenable scroll events
            $(window).off("scroll").on("scroll", function(){
                enable_mini_menu();

                // set up portfolio item parallax
                portfolio_parallax.call(this, 'url(' + portfolio_background_image + ')', portfolio_height);
            });

            return this;
        }
    });
})(jQuery);;/*global Backbone, jQuery, _, wp */
var app = app || {};

(function ($) {
    'use strict';

    app.PortfolioTileView = Backbone.View.extend({
        template : wp.template ( 'portfolio-tile' ),

        render : function() {
            this.id = 'portfolio-' + this.model.get('id');
            this.$el.html( this.template( this.model.toJSON() ) );           
            return this;
        }
    });
})(jQuery);;/*global Backbone, jQuery, _, wp */
var app = app || {};

(function ($) {
    'use strict';

    app.PostView = Backbone.View.extend({

        template : wp.template( 'post' ),

        render : function() {
            this.id = 'post-' + this.model.get('id');
            if (this.model.get('type') == 'page') this.template = wp.template( 'page' );
            if (this.model.get('title') == 'Portfolio') this.template = wp.template( 'portfolio-page' );

            this.$el.html( this.template( this.model.toJSON() ) );           
            return this;
        }
    });
})(jQuery);;/* global backbone, jQuery, _ */
var app = app || {};

(function (){
    'use strict';
    
    var PortfolioTiles = Backbone.Collection.extend({
        model: app.Portfolio
    });

    app.portfolio_tiles = new PortfolioTiles();

})();;/* global backbone, jQuery, _ */
var app = app || {};

(function (){
    'use strict';
    
    var Posts = Backbone.Collection.extend({
        model: app.Post
    });

    app.posts = new Posts();

})();;/* global backbone, jQuery, _ */
var app = app || {};

(function (){
    'use strict';

    // router.js
    var Router = Backbone.Router.extend({
        routes: {
            // portfolio page
            'portfolio/' : 'portfolio',

            // portfolio items
            //'portfolio/*' : 'single_post',

            // homepage or blog
            'blog/' : 'posts',
            '': 'posts',

            // Catch all routes
            '*notFound' : 'single_post'
        },

        portfolio: function ( pathname ) {
            // get portfolio items
            var url = '/wp-json/posts/?type=portfolio-item';

            app.portfolio_tiles.url = url;           
            app.portfolio_tiles.fetch( {reset : true });

            // get portfolio page
            app.posts.url = '/wp-json/pages/?filter[pagename]=portfolio';
            app.posts.fetch( {reset : true });
        },

        posts: function ( pathname ) {
            var url = '/wp-json/posts/?type=post';

            app.posts.url = url;
            app.posts.fetch( {
                reset: true,
                success : function() {
                    app.portfolio_tiles.reset();
                }
            });
        },

        single_post: function ( pathname ) {
            var url = '/';

            if ( !_.isNull( pathname ) ) {
                url += pathname;
            }
           

            app.posts.url = url + '?render-as-json=true';           
            app.posts.fetch( {
                reset : true,
                success : function() {
                    app.portfolio_tiles.reset();
                }
            });
        }
    });

    app.router = new Router();
    Backbone.history.start( {
        pushState: true,
        silent: true
    });
})();;/* global backbone, jQuery, _ */
var app = app || {};

// start app

jQuery(function() {
    'use strict';
    
    new app.View();
});;/*!
 * Retina.js v1.1.0
 *
 * Copyright 2013 Imulus, LLC
 * Released under the MIT license
 *
 * Retina.js is an open source script that makes it easy to serve
 * high-resolution images to devices with retina displays.
 */
(function(){var root=typeof exports=="undefined"?window:exports;var config={check_mime_type:true};root.Retina=Retina;function Retina(){}Retina.configure=function(options){if(options==null)options={};for(var prop in options)config[prop]=options[prop]};Retina.init=function(context){if(context==null)context=root;var existing_onload=context.onload||new Function;context.onload=function(){var images=document.getElementsByTagName("img"),retinaImages=[],i,image;for(i=0;i<images.length;i++){image=images[i];retinaImages.push(new RetinaImage(image))}existing_onload()}};Retina.isRetina=function(){var mediaQuery="(-webkit-min-device-pixel-ratio: 1.5),                      (min--moz-device-pixel-ratio: 1.5),                      (-o-min-device-pixel-ratio: 3/2),                      (min-resolution: 1.5dppx)";if(root.devicePixelRatio>1)return true;if(root.matchMedia&&root.matchMedia(mediaQuery).matches)return true;return false};root.RetinaImagePath=RetinaImagePath;function RetinaImagePath(path,at_2x_path){this.path=path;if(typeof at_2x_path!=="undefined"&&at_2x_path!==null){this.at_2x_path=at_2x_path;this.perform_check=false}else{this.at_2x_path=path.replace(/\.\w+$/,function(match){return"@2x"+match});this.perform_check=true}}RetinaImagePath.confirmed_paths=[];RetinaImagePath.prototype.is_external=function(){return!!(this.path.match(/^https?\:/i)&&!this.path.match("//"+document.domain))};RetinaImagePath.prototype.check_2x_variant=function(callback){var http,that=this;if(this.is_external()){return callback(false)}else if(!this.perform_check&&typeof this.at_2x_path!=="undefined"&&this.at_2x_path!==null){return callback(true)}else if(this.at_2x_path in RetinaImagePath.confirmed_paths){return callback(true)}else{http=new XMLHttpRequest;http.open("HEAD",this.at_2x_path);http.onreadystatechange=function(){if(http.readyState!=4){return callback(false)}if(http.status>=200&&http.status<=399){if(config.check_mime_type){var type=http.getResponseHeader("Content-Type");if(type==null||!type.match(/^image/i)){return callback(false)}}RetinaImagePath.confirmed_paths.push(that.at_2x_path);return callback(true)}else{return callback(false)}};http.send()}};function RetinaImage(el){this.el=el;this.path=new RetinaImagePath(this.el.getAttribute("src"),this.el.getAttribute("data-at2x"));var that=this;this.path.check_2x_variant(function(hasVariant){if(hasVariant)that.swap()})}root.RetinaImage=RetinaImage;RetinaImage.prototype.swap=function(path){if(typeof path=="undefined")path=this.path.at_2x_path;var that=this;function load(){if(!that.el.complete){setTimeout(load,5)}else{that.el.setAttribute("width",that.el.offsetWidth);that.el.setAttribute("height",that.el.offsetHeight);that.el.setAttribute("src",path)}}load()};if(Retina.isRetina()){Retina.init(root)}})();;/**
 * on portfolio pages add parallax effect to articles by reducing margin top to zero while
 * the top of the article div has not passed the browser window and the bottom of the article
 * is not visible in the browser window
 */
function portfolio_parallax(background_image, portfolio_height) {
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
}

/**
 * change menu from full width to mini menu style when user has scrolled past navigatino
 */
function enable_mini_menu() {

    // capture current size of navigation menu
    var old_nav_height = jQuery('.navigation').height();

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
}

jQuery(document).ready(function(){
    // set the original background image used on portfolio pages
    var background_image = jQuery('#portfolio-item-content').css('background-image');

    var portfolio_height = jQuery(window).height()-jQuery('#page').offset().top;

    // set margin top for article so it is just out of browser width
    jQuery('#portfolio-item-content article').css('margin-top',portfolio_height - 175);

    jQuery(window).scroll(function(){
        enable_mini_menu();

        // set up portfolio item parallax
        portfolio_parallax.call(this, background_image, portfolio_height);

    });

});