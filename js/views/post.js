/*global Backbone, jQuery, _, wp */
var app = app || {};

(function ($) {
    'use strict';

    app.PostView = Backbone.View.extend({

        template : wp.template( 'post' ),

        render : function() {
            this.id = 'post-' + this.model.get('id');
            if (this.model.get('type') == 'page') this.template = wp.template( 'page' );
            if (this.model.get('title') == 'Portfolio') this.template = wp.template( 'portfolio-page' );

            this.$el.html( this.template( this.model.toJSON() ) );           
            return this;
        }
    });
})(jQuery);