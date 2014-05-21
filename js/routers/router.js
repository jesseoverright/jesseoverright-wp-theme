/* global backbone, jQuery, _ */
var app = app || {};

(function ($){
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
            var url = '/wp-json/posts/';

            // get the custom portfolio items order filter query
            $.ajax({
                url: 'http://wordpress.dev/wp-content/themes/jesseoverright/portfolio-items-json.php',
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
})(jQuery);