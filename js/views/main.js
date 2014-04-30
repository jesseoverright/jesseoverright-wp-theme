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
            this.$portfolio = $('#portfolio');
            this.listenTo( app.posts, 'reset', this.addPosts);
            this.listenTo( app.portfolio_items, 'reset', this.addPortfolioItems)
        },

        initRouter : function ( evt ) {
            evt.preventDefault();

            // Get the link
            var pathname = evt.target.pathname;
                      

            // Trigger the router
            app.router.navigate( pathname, {trigger: true});
        },

        addPortfolioItems : function () {
            this.$portfolio.html( '' );
            app.portfolio_items.each( this.portfolioView, this );
        },

        addPosts : function() {
            this.$posts.html( '' );
            app.posts.each( this.postView, this );           
        },

        portfolioView : function ( portfolio ) {
            var view = new app.PortfolioView( { model: portfolio } );
            this.$portfolio.append( view.render().el );
        },

        postView : function ( post ) {
            var view = new app.PostView( { model: post } );
            this.$posts.append( view.render().el );                      
        }
    });
})(jQuery);