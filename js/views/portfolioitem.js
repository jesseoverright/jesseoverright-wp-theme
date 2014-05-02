/*global Backbone, jQuery, _, wp */
var app = app || {};

(function ($) {
    'use strict';

    app.PortfolioItemView = Backbone.View.extend({
        id : 'portfolio-item-content',

        template : wp.template( 'portfolio-item' ),

        render : function() {
            this.id = 'portfolio-item-' + this.model.get('id');
            var portfolio_background_image = this.model.get('featured_image')['source'];

            // #page will be faded out on load, so use footer
            var portfolio_height = $(window).height() - $('footer').offset().top;

            this.$el.html( this.template( this.model.toJSON() ) ).css('background-image', "url('" + portfolio_background_image + "')");
            this.$el.find('article').css('margin-top', portfolio_height - 175);

            // reenable scroll events
            $(window).off("scroll").on("scroll", function(){
                enable_mini_menu();

                // set up portfolio item parallax
                portfolio_parallax.call(this, 'url(' + portfolio_background_image + ')', portfolio_height);
            });

            return this;
        }
    });
})(jQuery);