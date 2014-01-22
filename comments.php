<?php
/**
 * The template for displaying Comments
 *
 * by Jesse Overright
 */
?>

<?php wp_list_comments( array(
    'avatar_size' => 64,
    'callback' => 'jo_comment',
    'style' => 'div',
)) ?>

<?php comment_form() ?>