/* global backbone, jQuery, _ */
var app = app || {};

(function (){
    'use strict';

    // router.js
    var Router = Backbone.Router.extend({
        routes: {
            // Catch all routes
            '*notFound' : 'wp_api',
            '' : 'wp_api'
        },

        wp_api: function ( pathname ) {
            var url = '/';

            if ( !_.isNull( pathname ) ) {
                url += pathname;
            }
           

            app.posts.url = url + '?render-as-json=true';           
            app.posts.fetch( {reset : true });
        }
    });

    app.router = new Router();
    Backbone.history.start( {
        pushState: true,
        silent: true
    });
})();