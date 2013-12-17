<?php
/** key features taxonomy template file

    display the portfolio items in a portfolio tile-style layout

    by Jesse Overright
*/?>
<?php get_header(); ?>

<?php #get_sidebar(); ?>

<div id="content">
    <?php $term = get_term_by('slug', get_query_var('term'), get_query_var('taxonomy')) ?>
    <h2>Portfolio items including <?= $term->name ?></h2>
</div>

<div id="portfolio" role="main">
    <?php if ( have_posts() ) : ?>

        <?php while ( have_posts() ) : the_post(); ?>
            <?php get_template_part( 'content', 'portfolio-tile' ); ?>
        <?php endwhile; ?>

    <?php else : ?>
        <?php get_template_part( 'content', 'none' ); ?>
    <?php endif; ?>
</div>

<?php get_footer(); ?>