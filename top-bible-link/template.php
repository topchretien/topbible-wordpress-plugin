<?php
/**
 * Backbone Templates
 * This file contains all of the HTML used in our modal and the workflow itself.
 *
 * Each template is wrapped in a script block ( note the type is set to "text/html" ) and given an ID prefixed with
 * 'tmpl'. The wp.template method retrieves the contents of the script block and converts these blocks into compiled
 * templates to be used and reused in your application.
 */


/**
 * The Modal Window, including sidebar and content area.
 * Add menu items to ".navigation-bar nav ul"
 * Add content to ".backbone_modal-main article"
 */
?>
<script type="text/html" id='tmpl-tbleditor-modal-window'>
	<div class="backbone_modal">
		<a class="backbone_modal-close dashicons dashicons-no" href="#"
		   title="<?php echo __( 'Close', 'backbone_modal' ); ?>"><span
				class="screen-reader-text"><?php echo __( 'Close', 'backbone_modal' ); ?></span></a>

		<div class="backbone_modal-content">

			<section class="backbone_modal-main" role="main">
				<header><h1><?php echo __( 'Insertion de lien TopBible', 'backbone_modal' ); ?></h1>
					<input type="text" id="userSearchText" placeholder="<?php echo __( 'Tapez une référence ou des mots clés... Jean 3.16, Abraham et Isaac...', 'backbone_modal' ); ?>" autofocus class="topbible-search-input">
				</header>
				<article id="topbible-search-article">
					<div><?php echo __( 'Une fois la recherche effectuée, sélectionnez le ou les versets qui vous intéressent et cliquez sur “Insérer”.', 'backbone_modal' ); ?></div>
					<div id='resultSearch'></div>
				</article>
				<footer>
					<div class="inner text-right">
						<button id="btn-cancel"
						        class="button button-large"><?php echo __( 'Annuler', 'backbone_modal' ); ?></button>
						<button id="btn-ok"
						        class="button button-primary button-large"><?php echo __( 'Insérer', 'backbone_modal' ); ?></button>
					</div>
				</footer>
			</section>
		</div>
	</div>
</script>

<?php
/**
 * The Modal Backdrop
 */
?>
<script type="text/html" id='tmpl-tbleditor-modal-backdrop'>
	<div class="backbone_modal-backdrop">&nbsp;</div>
</script>
<?php
/**
 * Base template for a navigation-bar menu item ( and the only *real* template in the file ).
 */
?>
<script type="text/html" id='tmpl-tbleditor-modal-menu-item'>
	<li class="nav-item"><a href="{{ data.url }}">{{ data.name }}</a></li>
</script>
<?php
/**
 * A menu item separator.
 */
?>
<script type="text/html" id='tmpl-tbleditor-modal-menu-item-separator'>
	<li class="separator">&nbsp;</li>
</script>

