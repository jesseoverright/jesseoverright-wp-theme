<article>
    <h1><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h1>
    <?= get_the_term_list($post->ID, 'key-features', '<ul class="key-features"><li class="header">Features:</li><li>', '</li><li>', '</li></ul>')  ?>
    <h3 class="project-url"><a href="<?= get_post_meta($post->ID, 'project_url', true)?>"><?= str_replace('http://','',get_post_meta($post->ID, 'project_url', true)) ?></a></h3>
    <?php the_content(); ?>
    <h4><?= get_post_meta($post->ID, 'project_date', true) ?></h4>
</article>