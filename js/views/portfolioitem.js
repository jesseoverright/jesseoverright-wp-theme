/*global Backbone, jQuery, _, wp */
var app = app || {};

(function ($) {
    'use strict';

    app.PortfolioItemView = Backbone.View.extend({
        id : 'portfolio-item-content',

        template : wp.template( 'portfolio-item' ),

        render : function() {
            this.id = 'portfolio-item-' + this.model.get('id');
            var background_image = this.model.get('featured_image')['source'];//('featured_image').get('source');
            var portfolio_height = jQuery(window).height()-jQuery('#page').offset().top;

            this.$el.css('background-image', "url('" + background_image + "')").html( this.template( this.model.toJSON() ) );
            this.$el.find('article').css('margin-top', portfolio_height - 175);

            // reenable scroll events
            $(window).off("scroll").on("scroll", function(){
                enable_mini_menu();

                // set up portfolio item parallax
                portfolio_parallax.call(this, background_image, portfolio_height);
            });

            return this;
        }
    });
})(jQuery);