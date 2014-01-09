<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title><?php wp_title( '/', true, 'right' ); bloginfo('name'); ?></title>
    <meta name="description" content="<?= bloginfo('description') ?>">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="shortcut icon" href="<?= get_stylesheet_directory_uri() ?>/favicon.ico" />
    <link rel="apple-touch-icon" href="<?= get_stylesheet_directory_uri() ?>/apple-touch-icon-precomposed.png" />
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<header role="banner">
    <?php include 'social-media-icons.php' ?>
    <h1 class="site-header">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" rel="home"><?php bloginfo('name'); ?></a>
    </h1>
</header>
<div class="navigation" role="navigation">
    <?php wp_nav_menu( array( 'theme_location' => 'main-menu', 'menu_class' => 'nav-menu' ) ); ?>
</div>
<div id="page">
