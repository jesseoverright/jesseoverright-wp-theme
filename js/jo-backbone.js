/* global backbone, jQuery, _ */
var app = app || {};

(function ($){
    'use strict';

    app.View = Backbone.View.extend({
        el : function() {
            return document.getElementById( 'backbone' );
        },

        currentViews: {},

        events : {
            'click a' : 'initRouter'
        },

        initialize : function() {
            this.$posts = $('#content');
            this.listenTo( app.collection, 'reset', this.addAll)
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
            app.collection.each( this.addOne, this );           
        },

        addOne : function ( post ) {
            var view = new app.PostView( { model: post } );
            this.$posts.append( view.render().el );                      
        }
    });

    app.PostView = Backbone.View.extend({
        //tagName : 'article',

        //className : 'post',

        template : wp.template ( 'post' ),

        render : function() {
            this.id = 'post-' + this.model.get('id');
            this.$el.html( this.template( this.model.toJSON() ) );           
            return this;
        }
    });

    // model.js
    app.Post = Backbone.Model.extend({
        defaults: {
            id: '',
            title: '',
            content: ''
        }
    });

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
           

            app.collection.url = url + '?render-as-json=true';           
            app.collection.fetch( {reset : true });
        }
    });

    app.router = new Router();
    Backbone.history.start( {
        pushState: true,
        silent: true
    });

    // collection.js
    var Collection = Backbone.Collection.extend({
        model: app.Post
    });

    app.collection = new Collection();

})(jQuery);

// start app

jQuery(function() {
    'use strict';
    new app.View();
});