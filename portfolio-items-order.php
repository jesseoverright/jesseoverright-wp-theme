<?php 
/**
 *  returns filter querystring for porfolio items in order of portfolio nav
 */

require_once( $_SERVER['DOCUMENT_ROOT'] . '/wp-load.php');

$portfolio_items = wp_get_nav_menu_items( 'portfolio' );

$querystring = '?';

if ( is_array( $portfolio_items ) ) {
    foreach ($portfolio_items as $item) {

        $querystring .= 'filter[post__in][]=' . $item->object_id . '&';

    }
}

$querystring .= 'type=portfolio-item&filter[orderby]=post__in';

echo $querystring;