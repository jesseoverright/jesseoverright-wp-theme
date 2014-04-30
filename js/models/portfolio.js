/*global Backbone, jQuery, _, wp */
var app = app || {};

(function () {
    'use strict';
    
    app.Portfolio = Backbone.Model.extend({
        defaults: {
            id: '',
            title: '',
            content: ''
        }
    });
})();