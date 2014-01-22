<?php
/**
 * The template for displaying comments and the submit comment form
 *
 * by Jesse Overright
 */

wp_list_comments( array(
    'avatar_size' => 48,
    'callback' => 'jo_comment',
    'style' => 'div',
));

comment_form();