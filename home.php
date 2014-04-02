<?php
/** front page custom template file

    uses the custom menu 'Blog Posts' to set order of posts
    if a menu doesn't exists, displays only posts tagged in the "Hello World" category

    by Jesse Overright
*/?>
<?php get_header(); ?>

<?php $blog_posts = ( wp_get_nav_menu_items( 'blog-posts' ) ) ?>

<div id="content" role="main">
    <?php if ( is_array( $blog_posts ) ) : ?>
        <?php foreach ($blog_posts as $item) : ?>
            <?php
                global $post;
                $post = get_post($item->object_id);
                setup_postdata( $post );

                get_template_part( 'content', 'post' );

                wp_reset_postdata();
            ?>
        <?php endforeach ?>
    <?php else : ?>
        <?php
            $args = array(
                'post_type' => 'post',
                'category_name' => 'hello-world',
                'posts_per_page' => -1,
                'orderby' => 'date',
                'order' => 'desc'
            );
            $front_page_posts = new WP_Query($args);
        ?>

        <?php if ($front_page_posts->have_posts() ) : ?>
            <?php while ($front_page_posts->have_posts()) : $front_page_posts->the_post(); ?>
                <?php get_template_part( 'content', 'post' ); ?>
            <?php endwhile; ?>
        <?php endif ?>

        <? wp_reset_query() ?>

    <?php endif ?>

</div>

<?php get_footer(); ?>