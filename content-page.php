<article>
    <h1><a href="<?php if ($is_js) echo '{{{ data.link }}}'; else the_permalink(); ?>"><?php if ($is_js) echo '{{{ data.title }}}'; else the_title(); ?></a></h1>
    <?php if ($is_js) echo '{{{ data.content }}}'; else the_content(); ?>
</article>