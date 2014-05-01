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
            'click .menu-item' : 'initRouter',
            'click .portfolio-tile a' : 'initRouter'
        },

        initialize : function() {
            this.$content = $('#content');
            this.$page = $('#page');
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
            this.addPortfolioTiles();
            app.posts.each( this.postView, this );
        },

        portfolioTileView : function ( portfolio ) {
            var view = new app.PortfolioTileView( { model: portfolio } );
            this.$portfolio.append( view.render().el.childNodes );
        },

        postView : function ( post ) {
            var view = new app.PostView( { model: post } );
            this.$content.append( view.render().el.childNodes );                      
        }
    });
})(jQuery);