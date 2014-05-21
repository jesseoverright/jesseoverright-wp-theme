/* global backbone, jQuery, _ */
var app = app || {};

(function ($){
    'use strict';

    // router.js
    var Router = Backbone.Router.extend({
        routes: {
            // portfolio page
            'portfolio/' : 'portfolio',

            // categories
            'key-feature/*term' : 'key_features',

            // homepage or blog
            'blog/' : 'posts',
            '': 'posts',

            // Catch all routes
            '*notFound' : 'single_post'
        },

        key_features: function ( term ) {
            console.log (term);
            var url = '/wp-json/posts/?type=portfolio-item&filter[key-features]=' + term;
            console.log(url);
            app.portfolio_tiles.url = url;
            app.portfolio_tiles.fetch( { reset: true });

            app.posts.url = '/wp-json/pages/?filter[pagename]=portfolio';
            app.posts.fetch( {reset : true });

        },

        portfolio: function () {

            // get portfolio items
            var url = '/wp-json/posts/';

            // get the custom portfolio items order filter query
            $.ajax({
                url: 'http://wordpress.dev/wp-content/themes/jesseoverright/portfolio-items-order.php',
                async: false
            }).done(function (data) {
                    url  += data;
                });

            app.portfolio_tiles.url = url;           
            app.portfolio_tiles.fetch( {reset : true });

            // get portfolio page
            app.posts.url = '/wp-json/pages/?filter[pagename]=portfolio';
            app.posts.fetch( {reset : true });
        },

        posts: function () {
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
})(jQuery);