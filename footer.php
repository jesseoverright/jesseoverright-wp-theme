<footer role="contentinfo">
    <p>&copy; 2013-<?= date('Y') ?> Jesse Overright</p>
    <?php include 'social-media-icons.php' ?>
</footer>

<script type="text/template" id="tmpl-post">
<?php get_template_part( '_content', 'post'); ?>
</script>

<?php wp_footer(); ?>
</div> <!-- page -->
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