<article>
    <h1><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h1>
    <p class="post-meta">Posted on <?= get_the_date() ?></p>
    <?php the_content(); ?>
    <?= get_the_term_list($post->ID, 'category', '<ul class="categories"><li class="header">Categories:</li><li>', '</li><li>', '</li></ul>')  ?>
    <?= get_the_tag_list('<ul class="tags"><li class="header">Tags:</li><li>', '</li><li>', '</li></ul>')  ?>
</article>