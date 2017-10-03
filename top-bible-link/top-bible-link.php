<?php

/**
 * Plugin Name: Top Bible Link
 * Version: 1.0
 * Author: Loïc Grondin
 * Description: A plugin used to transform a bible reference into a link to TopBible
 */

class Top_Bible_Link_Class {

	/**
	 * Static Singleton
	 * @action plugins_loaded
	 * @return Top_Bible_Link_Class
	 * @static
	 */
	public static function init() {
		static $top_bible_link_class = false;
		if ( ! $top_bible_link_class ) {
					$top_bible_link_class = new Top_Bible_Link_Class;
		}
		return $top_bible_link_class;
	}
	
	/**
	* Constructor. Called when the plugin is initialised.
	*/
	function __construct() {

		if ( is_admin() ) {
			add_action( 'init', array(  $this, 'setup_topBibleLink_plugin' ) );
			add_action( 'admin_enqueue_scripts', $this->marshal( 'add_scripts' ) );
			// Adding the templates to the post.php and post-new.php only as that's the only place
			// our meta box is added in this plugin.  You can also use the wp-footer action if you need
			// the templates globally.
			add_action( 'admin_footer-post-new.php', $this->marshal( 'add_templates' ) );
			add_action( 'admin_footer-post.php', $this->marshal( 'add_templates' ) );
		}

		
	}

	/**
	* Check if the current user can edit Posts or Pages, and is using the Visual Editor
	* If so, add some filters so we can register our plugin
	*/
	function setup_topBibleLink_plugin() {

		// Check if the logged in WordPress User can edit Posts or Pages
		// If not, don't register our TinyMCE plugin
			
		if ( ! current_user_can( 'edit_posts' ) && ! current_user_can( 'edit_pages' ) ) {
			        return;
		}

		// Check if the logged in WordPress User has the Visual Editor enabled
		// If not, don't register our TinyMCE plugin
		if ( get_user_option( 'rich_editing' ) !== 'true' ) {
		return;
		}

		// Setup some filters
		add_filter( 'mce_external_plugins', array( &$this, 'add_topBibleLink_plugin' ) );
		add_filter( 'mce_buttons', array( &$this, 'add_topBibleLink_toolbar_button' ) );
			
	}


	/**
	* Adds a TinyMCE plugin compatible JS file to the TinyMCE / Visual Editor instance
	*
	* @param array $plugin_array Array of registered TinyMCE Plugins
	* @return array Modified array of registered TinyMCE Plugins
	*/
	function add_topBibleLink_plugin( $plugin_array ) {

		$plugin_array['top_bible_link_class'] = plugin_dir_url( __FILE__ ) . 'top-bible-link.js';
		return $plugin_array;

	}

	/**
	* Adds a button to the TinyMCE / Visual Editor which the user can click
	* to insert a link with a custom CSS class.
	*
	* @param array $buttons Array of registered TinyMCE Buttons
	* @return array Modified array of registered TinyMCE Buttons
	*/
	function add_topBibleLink_toolbar_button( $buttons ) {

		array_push( $buttons, '|', 'top_bible_link_class' );
		return $buttons;
	}

	public function add_scripts( $hook ) {
		if ( $hook === 'post.php' || $hook === 'post-new.php' ) {
			$base = plugin_dir_url( __FILE__ );
			wp_enqueue_script( 'backbone_modal', $base . 'top-bible-link.js', array(
				'jquery',
				'backbone',
				'underscore',
				'wp-util'
			) );
			// wp_localize_script( 'backbone_modal', 'tbleditor_backbone_modal_l10n',
			// 	array(
			// 		'replace_message' => __( 'This is dummy content. You should add something here.', 'backbone_modal' )
			// 	) );
			wp_enqueue_style( 'backbone_modal', $base . 'template.css' );
		}
	}

	public function add_templates() {
		include 'template.php';
	}

	public function marshal( $method_name ) {
		return array( &$this, $method_name );
	}
}

/**
 * Instantiates the plugin singleton during plugins_loaded action.
 */
add_action( 'plugins_loaded', array( 'Top_Bible_Link_Class', 'init' ) );