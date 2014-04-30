<article>
    <h1><a href="<?php if ($is_js) echo '{{{ data.link }}}'; else the_permalink(); ?>"><?php if ($is_js) echo '{{{ data.title }}}'; else the_title(); ?></a></h1>
    <?php if ($is_js) echo '{{{ data.content }}}'; else the_content(); ?>
    <?= get_the_term_list($post->ID, 'category', '<ul class="categories"><li class="header">Categories:</li><li>', '</li><li>', '</li></ul>')  ?>
    <?= get_the_tag_list('<ul class="tags"><li class="header">Tags:</li><li>', '</li><li>', '</li></ul>')  ?>

    <?php if ( ! is_single() && get_comments_number() > 0 ) : ?>
        <ul class="comment-count">
            <li class="header">Comments:</li>
            <li><a href="<?php the_permalink(); ?>#post-comments"><?php comments_number() ?></a></li>
        </ul>
    <?php endif ?>

    <p class="post-meta">Posted on <?php if ($is_js) echo '{{{ data.date }}}'; else  get_the_date() ?></p>
</article>