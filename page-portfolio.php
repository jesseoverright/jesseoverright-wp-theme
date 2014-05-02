<?php
/** portfolio page template file

    displays portfolio items in a grid layout

    Uses the custom wp_nav_menu "portfolio" to set ordering of posts
    if nav menu does not exists, orders portfolio items by date descending

    by Jesse Overright
*/?>
<?php get_header(); ?>

<?php $portfolio_items = ( wp_get_nav_menu_items( 'portfolio') ); ?>

<div id="portfolio" role="main">
    <?php if ( is_array( $portfolio_items ) ) : ?>
        <?php foreach ($portfolio_items as $item) : ?>
            <?php
                global $post;
                $post = get_post($item->object_id);
                setup_postdata( $post );

                get_template_part( 'content', 'portfolio-tile' );

                wp_reset_postdata();
            ?>
        <?php endforeach ?>
    <?php else : ?>
        <?php
            $args = array(
                'post_type' => 'portfolio-item',
                'posts_per_page' => -1,
                'orderby' => 'date',
                'order' => 'desc',
            );
            $portfolio_query = new WP_Query($args);
        ?>

        <?php if ($portfolio_query->have_posts() ) : ?>
            <?php while ($portfolio_query->have_posts()) : $portfolio_query->the_post(); ?>
                <?php get_template_part( 'content', 'portfolio-tile' ); ?>
            <?php endwhile; ?>
        <?php endif ?>

        <?php wp_reset_query() ?>

    <?php endif ?>
</div>

<div id="content">
    <?php get_template_part( 'content', 'portfolio-page' ); ?>
</div>


<?php get_footer(); ?>