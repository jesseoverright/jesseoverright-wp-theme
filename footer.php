</div> <!-- page -->

<footer role="contentinfo">
    <p>&copy; 2013-<?= date('Y') ?> Jesse Overright</p>
    <?php include 'social-media-icons.php' ?>
</footer>

<?php $is_js = true; ?>

<script type="text/template" id="tmpl-post">
<?php include locate_template('content-post.php'); ?>
</script>

<script type="text/template" id="tmpl-page">
<?php include locate_template('content-page.php'); ?>
</script>

<script type="text/template" id="tmpl-portfolio-tile">
<?php include locate_template('content-portfolio-tile.php'); ?>
</script>

<script type="text/template" id="tmpl-portfolio-item">
<?php include locate_template('content-portfolio-item.php'); ?>
</script>

<script type="text/template" id="tmpl-portfolio-page">
<?php include locate_template('content-portfolio-page.php'); ?>
</script>

<?php wp_footer(); ?>
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-45683108-2', 'jesseoverright.com');
  ga('send', 'pageview');

</script>
</body>
</html>