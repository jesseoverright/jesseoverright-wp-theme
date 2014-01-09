<?php
/** portfolio page template file

    displays portfolio items in a grid layout

    Uses the custom wp_nav_menu "portfolio" to set ordering of posts
    and modified version of content-portfolio-title.php to display content.

    by Jesse Overright
*/?>
<?php get_header(); ?>

<?php $portfolio_items = ( wp_get_nav_menu_items( 'portfolio') ); ?>

<div id="portfolio" role="main">
    <?php if ( is_array( $portfolio_items ) ) : ?>
        <?php foreach ($portfolio_items as $item) : ?>
            <?php $post = get_post($item->object_id); ?>
            <div class="portfolio-tile">
                <a href="<?= get_permalink($post->ID) ?>" title="<?= get_the_title($post->ID) ?>"><?= get_the_post_thumbnail($post->ID, 'portfolio-tile') ?></a>
                <h3><a href="<?= get_permalink($post->ID) ?>" title="<?= get_the_title($post->ID) ?>"><?= get_the_title($post->ID) ?></a></h3>
            </div>
        <?php endforeach ?>
    <?php endif ?>
</div>

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