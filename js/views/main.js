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
            this.$content = $('#content');
            this.$page = $('#page');
            this.$portfolio = $('#portfolio');

            this.listenTo( app.posts, 'reset', this.addPosts);
            //this.listenTo( app.portfolio_tiles, 'reset', this.addPortfolioTiles)
        },

        initRouter : function ( evt ) {
            evt.preventDefault();

            // Get the link
            var pathname = evt.target.pathname;

            // Trigger the router
            app.router.navigate( pathname, {trigger: true});
        },

        addPortfolioTiles : function () {
            this.$portfolio.remove();

            if (app.portfolio_tiles.length > 0) {
                this.$page.prepend( '<div id="portfolio"><div>' );
                this.$portfolio = $('#portfolio');

                app.portfolio_tiles.each( this.portfolioTileView, this );
            }
        },

        addPosts : function() {
            var main = this;

            this.$page.fadeOut(function () {
                main.$content.html( '' );
                main.addPortfolioTiles();
                app.posts.each( main.postView, main );    
            });       

            this.$page.fadeIn();
        },

        portfolioTileView : function ( portfolio ) {
            var view = new app.PortfolioTileView( { model: portfolio } );
            this.$portfolio.append( view.render().el.childNodes );
        },

        postView : function ( post ) {
            var view = new app.PostView( { model: post } );
            this.$content.append( view.render().el );                      
        }
    });
})(jQuery);