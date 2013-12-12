<?php
/** functions.php file 
    this contains global functions for the jesseoverright theme
*/


function add_scripts_and_styles() {

    // Loads our main stylesheet.
    wp_enqueue_style( 'jesseoverright-style', get_stylesheet_uri() );
}

add_action( 'wp_enqueue_scripts', 'add_scripts_and_styles' );