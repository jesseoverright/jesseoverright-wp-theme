/*global Backbone, jQuery, _, wp */
var app = app || {};

(function ($) {
    'use strict';

    app.PortfolioView = Backbone.View.extend({
        //tagName : 'article',

        //className : 'post',

        template : wp.template ( 'portfolio-tile' ),

        render : function() {
            this.id = 'portfolio-' + this.model.get('id');
            this.$el.html( this.template( this.model.toJSON() ) );           
            return this;
        }
    });
})(jQuery);