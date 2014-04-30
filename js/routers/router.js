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
            console.log('working');
            // get portfolio items
            var url = '/wp-json/posts/?type=portfolio-item';

            app.portfolio_items.url = url;           
            app.portfolio_items.fetch( {reset : true });

            // get portfolio post
            app.posts.url = '/wp-json/pages/?filter[pagename]=portfolio';
            app.posts.fetch( {reset : true });
        },

        default: function ( pathname ) {
            var url = '/';

            if ( !_.isNull( pathname ) ) {
                url += pathname;
            }
           

            app.posts.url = url + '?render-as-json=true';           
            app.posts.fetch( {reset : true });
            app.portfolio_items.reset();
        }
    });

    app.router = new Router();
    Backbone.history.start( {
        pushState: true,
        silent: true
    });
})();