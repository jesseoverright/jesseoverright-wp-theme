<article>
    <h1><a href="{{{ data.link }}}">{{{ data.title }}}</a></h1>
   {{{ data.content }}}
    <?= get_the_term_list($post->ID, 'category', '<ul class="categories"><li class="header">Categories:</li><li>', '</li><li>', '</li></ul>')  ?>
    <?= get_the_tag_list('<ul class="tags"><li class="header">Tags:</li><li>', '</li><li>', '</li></ul>')  ?>

    <?php if ( ! is_single() && get_comments_number() > 0 ) : ?>
        <ul class="comment-count">
            <li class="header">Comments:</li>
            <li><a href="<?php the_permalink(); ?>#post-comments"><?php comments_number() ?></a></li>
        </ul>
    <?php endif ?>

    <p class="post-meta">Posted on {{{ data.date }}}</p>
</article>