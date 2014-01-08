<?php
/** functions.php file
    this contains global functions for the jesseoverright theme, including
    the Portfolio custom content type
*/

function basic_theme_setup() {

    // add basic styles to editor window
    add_editor_style( array('editor-style.css') );

    // add featured image support
    add_theme_support( 'post-thumbnails' );

    // set standard image sizes
    update_option('large_size_w', 800);
    update_option('large_size_h', 506);
    update_option('medium_size_w',380);
    update_option('medium_size_h',380);
    update_option('thumbnail_size_w',225);

    // add portfolio tile size
    add_image_size('portfolio-tile', 350, 250, true);
}

add_action( 'after_setup_theme', 'basic_theme_setup' );

function add_scripts_and_styles() {

    // add the main stylesheet
    wp_enqueue_style( 'jesseoverright-style', get_stylesheet_uri() );

    // add the theme helper javascript
    wp_enqueue_script( 'jesseoverright-script', get_template_directory_uri() . '/js/scripts.js', array( 'jquery' ), '2013-12-13', true );

    // add retina.js for image retina display support
    wp_enqueue_script( 'retina_js', get_template_directory_uri() . '/js/retina-1.1.0.min.js', '', '2014-01-08', true);

    // remove the grunion.css styles from contact form
    wp_deregister_style('grunion.css');
}

add_action( 'wp_enqueue_scripts', 'add_scripts_and_styles' );

function add_custom_admin_css() {
    wp_enqueue_style( 'joverright-admin-style', get_template_directory_uri() . '/admin-style.css');
}

add_action( 'admin_enqueue_scripts', 'add_custom_admin_css' );


/**
 * Update the default contact form success message used by Jetpack.
 */
function jo_change_contact_form_success_message( $msg ) {
    global $contact_form_message;
    return '<h3>' . 'Thanks for contacting me! I\'ll try to respond as soon as possible. ' . '</h3>' . wp_kses($contact_form_message, array('br' => array(), 'blockquote' => array()));;
}

add_filter( 'grunion_contact_form_success_message', 'jo_change_contact_form_success_message' );

/**
 * Portfolio Content Type
 * custom content type to define portfolio items and specific details related to them.
 * uses custom taxonomy, featured images, and custom backend displays.
 */
class Portfolio_Content_Type {
    var $nonce_action = 'portfolio-item';

    function __construct() {
        register_post_type('portfolio-item', array(
            'labels' => array(
                'name' => __( 'Portfolio'),
                'singular_name' => __( 'Portfolio Item' ),
                'add_new' => __( 'Add New' ),
                'add_new_item' => __( 'Add New Portfolio Item' ),
                'edit' => __( 'Edit' ),
                'edit_item' => __( 'Edit Portfolio Item' ),
                'new_item' => __( 'New Portfolio Item' ),
                'view' => __( 'View' ),
                'view_item' => __( 'View Portfolio Item' ),
                'search_items' => __('Search Portfolio' ),
                'not_found' => __( 'No portfolio items found' ),
                'not_found_in_trash' => __( 'No porfolio items found in Trash' ),
            ),
            'description' => 'Case study and details on a specific project or application',
            'public' => true,
            '_builtin' => false,
            'menu_position' => 5,
            'supports' => array('title', 'editor', 'revisions', 'thumbnail'),
            'rewrite' => array('with_front' => false, 'slug' => 'portfolio')
        ));

        add_action('admin_init', array(&$this, 'admin_init'));
        add_action('save_post', array(&$this, 'save_portfolio'));
    }

    function admin_init() {
        add_meta_box('project-url', 'Project URL', array(&$this, 'project_url_metabox'), 'portfolio-item','normal','high');
        add_meta_box('project-date', 'Project Date', array(&$this, 'project_date_metabox'), 'portfolio-item', 'normal', 'high');
    }

    function save_portfolio( $post_id ) {
        if ( !wp_verify_nonce( $_POST['portfolio_item_noncename'], $this->nonce_action) ) {
            return false;
        }
        if ( !current_user_can( 'edit_post', $post_id )) {
            return false;
        }

        // save, update or delete project url based on input
        $project_url = $_POST['project_url'];
        $current_url = get_post_meta($post_id, 'project_url');

        if ( $current_url == "")
            add_post_meta($post_id, 'project_url', $project_url, true);
        elseif ( $project_url != $current_url )
            update_post_meta($post_id, 'project_url', $project_url);
        elseif ( $project_url == "" )
            delete_post_meta( $post_id, 'project_url', $current_url);

        // save, update or delete project date based on input
        $project_date = $_POST['project_date'];
        $current_date = get_post_meta($post_id, 'project_date');

        if ( $current_date == "")
            add_post_meta($post_id, 'project_date', $project_date, true);
        elseif ( $project_date != $current_date )
            update_post_meta($post_id, 'project_date', $project_date);
        elseif ( $project_date == "" )
            delete_post_meta( $post_id, 'project_date', $current_date);
    }

    function project_url_metabox() {
        global $post;

        $project_url = get_post_meta($post->ID, 'project_url', true);
        ?>
        <input type="hidden" name="portfolio_item_noncename" value="<?= wp_create_nonce($this->nonce_action) ?>" />
        <input type="text" name="project_url" value="<?= $project_url ?>" />
        <?php
    }

    function project_date_metabox() {
        global $post;

        $project_date = get_post_meta($post->ID, 'project_date', true);
        ?>
        <input type="text" name="project_date" value="<?= $project_date ?>" />
        <?php
    }
}

function init_portfolio_content_type() {
    global $portfolio_content_type;
    $portfolio_content_type = new Portfolio_Content_Type();
}

add_action( 'init', 'init_portfolio_content_type');

// Key Features Taxonomy
function create_key_features_taxonomy()
{
  $labels = array(
    'name' => _x( 'Key Features', 'taxonomy general name' ),
    'singular_name' => _x( 'Key Feature', 'taxonomy singular name' ),
    'search_items' =>  __( 'Search Features' ),
    'popular_items' => __( 'Popular Features' ),
    'all_items' => __( 'All Features' ),
    'parent_item' => null,
    'parent_item_colon' => null,
    'edit_item' => __( 'Edit Feature' ),
    'update_item' => __( 'Update Feature' ),
    'add_new_item' => __( 'Add New Feature' ),
    'new_item_name' => __( 'New Feature Name' ),
    'separate_items_with_commas' => __( 'Separate features with commas' ),
    'add_or_remove_items' => __( 'Add or remove features' ),
    'choose_from_most_used' => __( 'Choose from the most used Features' ),
    'menu_name' => __( 'Key Features' ),
  );

  register_taxonomy('key-features','portfolio-item',array(
    'hierarchical' => false,
    'labels' => $labels,
    'show_ui' => true,
    'update_count_callback' => '_update_post_term_count',
    'query_var' => true,
    'rewrite' => array( 'slug' => 'key-feature' ),
  ));
}

add_action( 'init', 'create_key_features_taxonomy', 0 );

// add the published portfolio item counts to the "At a Glance" section
function add_portfolio_item_counts() {
        if (!post_type_exists('portfolio-item')) {
             return;
        }

        $num_posts = wp_count_posts( 'portfolio-item' );
        $num = number_format_i18n( $num_posts->publish );
        $text = _n( 'Portfolio Item', 'Portfolio Items', intval($num_posts->publish) );
        if ( current_user_can( 'edit_posts' ) ) {
            $num = "<a href='edit.php?post_type=portfolio-item'>$num";
            $text = "$text</a>";
        }

        echo '<li class="portfolio-count">' . $num . ' ' . $text . '</li>' ;

}

add_action('dashboard_glance_items', 'add_portfolio_item_counts');

// Add details of portfolio item content to admin columns
function portfolio_columns_display( $post_columns, $post_id ){
    switch ($post_columns)
    {
        case "key-features":
            if ($tag_list = get_the_term_list( $post_id, 'key-features', '', ', ', '' ) ) {
                echo $tag_list;
            } else {
                    echo __('None');
                }
            break;
        case "featured-image":
            if ($thumbnail = get_the_post_thumbnail($post_id, 'thumbnail'))
                echo $thumbnail;
            else {
                    echo __('None');
                }
            break;
    }
}

add_action("manage_posts_custom_column",  "portfolio_columns_display", 10, 2);

// set the custom columns for portfolio items
function add_new_portfolio_item_columns( $portfolio_columns ) {
    $new_columns['cb'] = '<input type="checkbox" />';
    $new_columns['featured-image'] = _x('Featured Image', 'column name');
    $new_columns['title'] = __('Title');
    $new_columns['key-features'] = _x('Key Features', 'column name');
    $new_columns['date'] = _x('Date', 'column name');

    return $new_columns;

}

add_filter('manage_edit-portfolio-item_columns', 'add_new_portfolio_item_columns');

/**
 * Enables support for Retina display devices
 *
 */
function retina_images_attachment_meta( $metadata, $attachment_id ) {
    if ( array_key_exists('sizes', $metadata) ) {
        foreach ($metadata['sizes'] as $size => $attributes) {
            create_retina_images( get_attached_file( $attachment_id), $attributes['width'], $attributes['height'], true);
        }
    }

    return $metadata;
}

function create_retina_images( $file, $width, $height, $crop = false ) {
    $resized_file = wp_get_image_editor( $file );
    if ( ! is_wp_error( $resized_file ) ) {
        $filename = $resized_file->generate_filename( $width . 'x' . $height . '@2x' );

        $resized_file->resize($width * 2, $height * 2, $crop);
        $resized_file->save($filename);

        $info = $resized_file->get_size();

        return array(
            'file' => wp_basename( $filename ),
            'width' => $info['width'],
            'height' => $info['height'],
        );
    }

    return false;
}

function delete_retina_images( $attachment_id ) {
    $metadata = wp_get_attachment_metadata( $attachment_id );
    $upload_directory = wp_upload_dir();
    $path = pathinfo( $metadata['file'] );

    if ( array_key_exists('sizes', $metadata) ) {
        foreach ($metadata['sizes'] as $size => $attributes) {
            $original_filename = $upload_directory['basedir'] . '/' . $path['dirname'] . '/' . $attributes['file'];
            $retina_filename = substr_replace( $original_filename, '@2x.', strrpos( $original_filename, '.' ), strlen( '.' ));
            if ( file_exists( $retina_filename ) ) {
                unlink( $retina_filename );
            }
        }
    }
}

add_filter( 'wp_generate_attachment_metadata', 'retina_images_attachment_meta', 10, 2 );
add_filter( 'delete_attachment', 'delete_retina_images' );