/*global Backbone, jQuery, _, wp */
var app = app || {};

(function () {
    'use strict';
    
    app.Post = Backbone.Model.extend({
        defaults: {
            id: '',
            title: '',
            content: '',
            type: 'post',
            featured_image : {
                source: ''
            }
        }
    });
})();