/* global backbone, jQuery, _ */
var app = app || {};

(function (){
    'use strict';
    
    var Posts = Backbone.Collection.extend({
        model: app.Post
    });

    app.posts = new Posts();

})();