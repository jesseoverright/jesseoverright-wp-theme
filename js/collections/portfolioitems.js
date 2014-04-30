/* global backbone, jQuery, _ */
var app = app || {};

(function (){
    'use strict';
    
    var PortfolioItems = Backbone.Collection.extend({
        model: app.Portfolio
    });

    app.portfolio_items = new PortfolioItems();

})();