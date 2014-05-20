<?php 
/**
 *  returns json for porfolio items in order of portfolio nav
 */

header('Content-Type:application/json');

require_once( $_SERVER['DOCUMENT_ROOT'] . '/wp-load.php');

$portfolio_items = wp_get_nav_menu_items( 'portfolio' );

$json = "[";

# initialize curl
$ch = curl_init();
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

if ( is_array( $portfolio_items ) ) {
    foreach ($portfolio_items as $item) {
        
        # get the json data for each portfolio item
        curl_setopt($ch, CURLOPT_URL, "localhost/wp-json/posts/" . $item->object_id );
        $item_json = curl_exec( $ch );

        $json .= $item_json . ',';

    }
}

curl_close($ch);

echo substr( $json, 0, -1 ) . ']';