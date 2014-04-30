/*global Backbone, jQuery, _, wp */
var app = app || {};

(function ($) {
    'use strict';

    app.View = Backbone.View.extend({
        el : function() {
            return document.getElementById( 'backbone' );
        },

        currentViews: {},

        events : {
            'click .menu-item' : 'initRouter'
        },

        initialize : function() {
            this.$posts = $('#content');
            this.listenTo( app.posts, 'reset', this.addAll);
        },

        initRouter : function ( evt ) {
            evt.preventDefault();

            // Get the link
            var pathname = evt.target.pathname;
                      

            // Trigger the router
            app.router.navigate( pathname, {trigger: true});
        },

        addAll : function() {
            this.$posts.html( '' );
            app.posts.each( this.addOne, this );           
        },

        addOne : function ( post ) {
            var view = new app.PostView( { model: post } );
            this.$posts.append( view.render().el );                      
        }
    });
})(jQuery);