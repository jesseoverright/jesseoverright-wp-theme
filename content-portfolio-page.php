<article>
    <?php if ($is_js) echo '{{{ data.content }}}'; else the_content(); ?>
    <?php $features = get_terms('key-features') ?>
    <?php if (count($features) > 0) : ?>
        <ul class="key-features">
            <li class="header">Features:</li>
            <?php foreach ($features as $feature) : ?>
                <li><a href="<?= get_term_link($feature) ?>" rel="tag"><?= $feature->name ?></a></li>
            <?php endforeach ?>
        </ul>
    </div>
    <?php endif ?>
</article>