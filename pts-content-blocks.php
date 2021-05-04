<?php
/**
 * Plugin Name: PTS Content Blocks
 * Description: PTS Content Blocks — is a Gutenberg plugin created via create-guten-block.
 * Author: GOLDGRID Design
 * Author URI: https://goldgrid.de/
 * Version: 1.0.0
 * License: GPL2+
 * License URI: https://www.gnu.org/licenses/gpl-2.0.txt
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function pts_plugin_block_categories( $categories, $post ) {
    //if ( $post->post_type !== 'post' ) {
    //    return $categories;
    //}
    return array_merge(
        array(
            array(
                'slug' => 'pts-category',
                'title' => __( 'PTS Blocks', 'pts-content-blocks' ),
                'icon'  => 'shield',
            ),
        ),
		$categories
    );
}
add_filter( 'block_categories', 'pts_plugin_block_categories', 10, 2 );


/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';