<?php
/** functions.php file 
    this contains global functions for the jesseoverright theme
*/

function basic_theme_setup() {

    // add basic styles to editor window
    add_editor_style( array('editor-style.css') );

}

add_action( 'after_setup_theme', 'basic_theme_setup' );

function add_scripts_and_styles() {

    // add the main stylesheet
    wp_enqueue_style( 'jesseoverright-style', get_stylesheet_uri() );

    // add the theme helper javascript
    wp_enqueue_script( 'jesseoverright-script', get_template_directory_uri() . '/js/scripts.js', array( 'jquery' ), '2013-12-13', true );
}

add_action( 'wp_enqueue_scripts', 'add_scripts_and_styles' );