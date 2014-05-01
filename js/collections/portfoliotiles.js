/* global backbone, jQuery, _ */
var app = app || {};

(function (){
    'use strict';
    
    var PortfolioTiles = Backbone.Collection.extend({
        model: app.Portfolio
    });

    app.portfolio_tiles = new PortfolioTiles();

})();