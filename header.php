<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8" lang="en" />
    <title><?php bloginfo('name'); ?><?php wp_title( '|', true, 'right' ); ?></title>
    <link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>">

    <?php wp_head(); ?>
</head>
<body>
<header role="banner">
    <h1 class="site-header">
        <a href="<?php echo esc_url( home_url( '/' ) ); ?>" title="<?php echo esc_attr( get_bloginfo( 'name', 'display' ) ); ?>" rel="home"><?php bloginfo('name'); ?></a>
    </h1>
    <ul class="social-icons">
        <li><a href="https://github.com/jesseoverright/"><img src="<?php bloginfo('stylesheet_directory'); ?>/images/icons/github_alt.png" alt="jesseoverright on Github"></a></li>
        <li><a href="https://twitter.com/jesseover"><img src="<?php bloginfo('stylesheet_directory'); ?>/images/icons/twitter_alt.png" alt="@jesseover on Twitter"></a></li>
        <li><a href="http://www.linkedin.com/pub/jesse-overright/5b/362/734
"><img src="<?php bloginfo('stylesheet_directory'); ?>/images/icons/linkedin.png" alt="Jesse Overright on LinkedIn"></a></li>
    </ul>
</header>
<div class="navigation" role="navigation">
    <?php wp_nav_menu( array( 'theme_location' => 'primary', 'menu_class' => 'nav-menu' ) ); ?>
</div>
<div id="page">
