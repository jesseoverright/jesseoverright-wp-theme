<article>
    <h1><a href="<?php if ($is_js) echo '{{{ data.link }}}'; else the_permalink(); ?>"><?php if ($is_js) echo '{{{ data.title }}}'; else the_title(); ?></a></h1>
    <?php if ($is_js) : ?>
        <# if (data.terms['key-features']) { #>
            <ul class="key-features">
                <li class="header">Features:</li>
                <# _.each(data.terms['key-features'], function(key_feature) { #>
                    <li><a href="{{{ key_feature.link }}}" rel="tag">{{{ key_feature.name }}}</a></li>
                <# }); #>
            </ul>
        <# } #>
    <?php else : ?>
        <?= get_the_term_list($post->ID, 'key-features', '<ul class="key-features"><li class="header">Features:</li><li>', '</li><li>', '</li></ul>')  ?>
    <?php endif ?>
    <h3 class="project-url"><a href="<?php if ($is_js) echo '{{{ data.post_meta.project_url }}}'; else get_post_meta($post->ID, 'project_url', true)?>"><?php if ($is_js) echo '{{{ data.post_meta.project_url }}}'; else str_replace('http://','',get_post_meta($post->ID, 'project_url', true)) ?></a></h3>
    <?php if ($is_js) echo '{{{ data.content }}}'; else the_content(); ?>
    <h4><?php if ($is_js) echo '{{{ data.post_meta.project_date }}}'; else echo get_post_meta($post->ID, 'project_date', true) ?></h4>
</article>