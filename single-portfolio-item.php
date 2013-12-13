<?php
/** default template file

    by Jesse Overright
*/?>
<?php get_header(); ?>

<?php #get_sidebar(); ?>

<div id="content" role="main">

    <?php while ( have_posts() ) : the_post(); ?>
        <?php get_template_part( 'content', 'portfolio-item' ); ?>
    <?php endwhile; ?>

</div>

<?php get_footer(); ?>