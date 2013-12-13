<article>
    <?php if ( has_post_thumbnail() ) : ?>
        <?php the_post_thumbnail(); ?>
    <?php endif ?>
    <h1><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h1>
    <?php
        echo get_the_term_list($post->ID, 'key-features', '<ul><li>', '</li><li>', '</li></ul>');
    ?>
    <div>
    <?php the_content(); ?>
    </div>
</article>