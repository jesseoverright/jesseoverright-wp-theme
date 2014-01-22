<article>
    <h1><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h1>
    <?php the_content(); ?>
    <?= get_the_term_list($post->ID, 'category', '<ul class="categories"><li class="header">Categories:</li><li>', '</li><li>', '</li></ul>')  ?>
    <?= get_the_tag_list('<ul class="tags"><li class="header">Tags:</li><li>', '</li><li>', '</li></ul>')  ?>

    <?php if ( ! is_single() && get_comments_number() > 0 ) : ?>
        <ul class="comment-count">
            <li class="header">Comments:</li>
            <li><a href="<?php the_permalink(); ?>#comment-1"><?php comments_number() ?></a></li>
        </ul>
    <?php endif ?>

    <p class="post-meta">Posted on <?= get_the_date() ?></p>
</article>