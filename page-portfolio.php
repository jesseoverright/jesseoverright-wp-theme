<?php
/** portfolio page template file

    displays portfolio items in a grid layout

    by Jesse Overright
*/?>
<?php get_header(); ?>

<?php #get_sidebar(); ?>

<div id="portfolio" role="main">
    <?php 
    $args=array(
      'post_type' => 'portfolio-item',
      'posts_per_page' => -1,
      'orderby' => 'title',
      'order' => 'asc'
    );
    $my_query = null;
    $my_query = new WP_Query($args);
    ?>
    <?php if( $my_query->have_posts() ) : ?>
        <?php while ($my_query->have_posts()) : $my_query->the_post(); ?>
            <?php if (has_post_thumbnail() ) : ?>
                <?php get_template_part( 'content', 'portfolio-tile' ); ?>
            <?php endif ?>    
        <?php endwhile; ?>
    <?php endif; ?>
</div>

<?php wp_reset_query(); ?>

<?php get_footer(); ?>