<?php
/** single page template file

    by Jesse Overright
*/?>
<?php get_header(); ?>

<?php #get_sidebar(); ?>

<div id="content" role="main">
    <?php if ( have_posts() ) : ?>

        <?php while ( have_posts() ) : the_post(); ?>
            <?php get_template_part( 'content', 'page' ); ?>
        <?php endwhile; ?>

    <?php else : ?>
        <?php get_template_part( 'content', 'none' ); ?>
    <?php endif; ?>
</div>

<?php get_footer(); ?>