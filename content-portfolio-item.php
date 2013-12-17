<article>    
    <h1><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h1>
    <?php
        echo get_the_term_list($post->ID, 'key-features', '<ul class="key-features"><li>', '</li><li>', '</li></ul>');
    ?>
    <div>
    <h3 class="project-url"><a href="<?= get_post_meta($post->ID, 'project_url', true)?>"><?= get_post_meta($post->ID, 'project_url', true)?></a></h3>
    <?php the_content(); ?>
    </div>
</article>