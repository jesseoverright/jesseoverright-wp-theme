<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE-edge">
    <title><?php wp_title( '/', true, 'right' ); bloginfo('name'); ?></title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="shortcut icon" href="<?= get_stylesheet_directory_uri() ?>/favicon.ico" />
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<header role="banner">
    <ul class="social-icons">
        <li>
            <a href="https://github.com/jesseoverright/">
                <img src="<?php bloginfo('stylesheet_directory'); ?>/images/icons/github_alt.png" alt="jesseoverright on Github">
            </a>
        </li>
        <li>
            <a href="https://twitter.com/jesseover">
                <img src="<?php bloginfo('stylesheet_directory'); ?>/images/icons/twitter_alt.png" alt="@jesseover on Twitter">
            </a>
        </li>
        <li>
            <a href="http://www.linkedin.com/pub/jesse-overright/5b/362/734">
                <img src="<?php bloginfo('stylesheet_directory'); ?>/images/icons/linkedin.png" alt="Jesse Overright on LinkedIn">
            </a>
        </li>
        <li>
            <a href="http://profiles.wordpress.org/jesseover/">
                <img src="<?php bloginfo('stylesheet_directory'); ?>/images/icons/wordpress.png" alt="jesseover on Wordpress">
            </a>
        </li>
        <li>
            <a href="https://www.facebook.com/jesse.overright">
                <img src="<?php bloginfo('stylesheet_directory'); ?>/images/icons/facebook_alt.png" alt="Jesse Overright on Facebook">
            </a>
        </li>
        <li>
            <a href="https://plus.google.com/+JesseOverright/">
                <img src="<?php bloginfo('stylesheet_directory'); ?>/images/icons/google.png" alt="Jesse Overright on Google Plus">
            </a>
        </li>
    </ul>
    <h1 class="site-header">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" rel="home"><?php bloginfo('name'); ?></a>
    </h1>
</header>
<div class="navigation" role="navigation">
    <?php wp_nav_menu( array( 'theme_location' => 'primary', 'menu_class' => 'nav-menu' ) ); ?>
</div>
<div id="page">
