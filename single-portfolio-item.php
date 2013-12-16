<?php
/** default template file

    by Jesse Overright
*/?>
<?php get_header(); ?>

<?php #get_sidebar(); ?>

<?php while ( have_posts() ) : the_post(); ?>

<?php if ( has_post_thumbnail() ) : ?>
    <?php $thumbnail = wp_get_attachment_image_src(get_post_thumbnail_id(),'full'); ?>
    <div id="portfolio-item-content" role="main" style="background-image:url('<?= $thumbnail[0] ?>')">
<?php else :?>
    <div id="portfolio-item-content" role="main" style="margin-top:-550px">
<?php endif ?>

    <?php get_template_part( 'content', 'portfolio-item' ); ?>
<?php endwhile; ?>

</div>

<?php get_footer(); ?>