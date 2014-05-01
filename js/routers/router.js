/* global backbone, jQuery, _ */
var app = app || {};

(function (){
    'use strict';

    // router.js
    var Router = Backbone.Router.extend({
        routes: {
            'portfolio/': 'portfolio',
            'portfolio-item/*': 'portfolio_item',
            //'/': 'portfolio',
            // Catch all routes
            '*notFound' : 'default',
            '' : 'default'
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

        default: function ( pathname ) {
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
})();