<?php
/** front page custom template file

    displays only posts tagged in the "Hello World" category

    by Jesse Overright
*/?>
<?php get_header(); ?>

<?php
    $args=array(
      'post_type' => 'post',
      'category_name' => 'hello-world',
      'posts_per_page' => -1,
      'orderby' => 'date',
      'order' => 'desc'
    );
    $front_page_posts = null;
    $front_page_posts = new WP_Query($args);
?>

<div id="content" role="main">

    <?php if( $front_page_posts->have_posts() ) : ?>

        <?php while ($front_page_posts->have_posts()) : $front_page_posts->the_post(); ?>
            <?php get_template_part( 'content', 'post' ); ?>
        <?php endwhile; ?>

    <?php endif; ?>

</div>

<?php wp_reset_query(); ?>

<?php get_footer(); ?>