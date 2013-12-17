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
}

add_action( 'wp_enqueue_scripts', 'add_scripts_and_styles' );

/**
 * Portfolio Content Type
 * custom content type to define portfolio items and specific details related to them.
 * uses custom taxonomy, featured images, and custom backend displays.
 */
class Portfolio_Content_Type {
    var $nonce_action = 'portfolio-project-url';

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
        add_meta_box('project-url', "Project URL", array(&$this, 'project_url_metabox'), 'portfolio-item','normal','high');
    }

    function save_portfolio( $post_id ) {
        if ( !wp_verify_nonce( $_POST['project_url_noncename'], $this->nonce_action) ) {
            return false;
        }
        if ( !current_user_can( 'edit_post', $post_id )) {
            return false;
        }

        $project_url = $_POST['project_url'];
        $current_url = get_post_meta($post_id, 'project_url');

        if ( $current_url == "")
            add_post_meta($post_id, 'project_url', $project_url, true);
        elseif ( $project_url != $current_url ) 
            update_post_meta($post_id, 'project_url', $project_url);
        elseif ( $project_url == "" )
            delete_post_meta( $post_id, 'project_url', $current_url); 
    }

    function project_url_metabox() {
        global $post;

        $project_url = get_post_meta($post->ID, 'project_url', true);
        ?>
        <input type="hidden" name="project_url_noncename" value="<?= wp_create_nonce($this->nonce_action) ?>" />
        <input type="text" name="project_url" value="<?= $project_url ?>" style="width:100%" />
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
