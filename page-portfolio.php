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

<div id="content">
    <article>

    <?php the_content() ?>

    <?php $features = get_terms('key-features') ?>
    <?php if (count($features) > 0) : ?>
        <ul class="key-features">
            <li class="header">Features:</li>
            <?php foreach ($features as $feature) : ?>
                <li><a href="<?= get_term_link($feature) ?>" rel="tag"><?= $feature->name ?></a></li>
            <?php endforeach ?>
        </ul>
    </div>
    <?php endif ?>

    </article>
</div>


<?php get_footer(); ?>