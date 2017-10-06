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
                <table style="width:100%;">
                <tr>
                <td style="vertical-align:top;">
                    <select id="userVersionSelect">
                        <option value="LSG">Segond 1910</option>
                        <option value="S21">Segond 21</option>
                        <option value="SEM">Semeur</option>
                        <option value="PVI">Parole Vivante</option>
                        <option value="DRB">Darby</option>
                        <option value="MAR">Martin</option>
                        <option value="OST">Ostervald</option>
                        <option value="ORI">Hébreu / Grec - Texte original</option>
                        <option value="WEB">World English Bible</option>
                    </select>
                </td>
                <td style="width:100%;vertical-align:top;padding-top:3px;"><input type="text" id="userSearchText" placeholder="<?php echo __( 'Tapez une référence ou des mots clés... Jean 3.16, Abraham et Isaac...', 'backbone_modal' ); ?>" autofocus class="topbible-search-input"></td>
                </tr>
                </table>
                <table><tr>
                    <td>
                        <select id="userBookSelect">
                            <option value="">-- Choisissez un livre --</option>
                            <option value="1">Genèse</option>
                            <option value="2">Exode</option>
                            <option value="3">Lévitique</option>
                            <option value="4">Nombres</option>
                            <option value="5">Deutéronome</option>
                            <option value="6">Josué</option>
                            <option value="7">Juges</option>
                            <option value="8">Ruth</option>
                            <option value="9">1 Samuel</option>
                            <option value="10">2 Samuel</option>
                            <option value="11">1 Rois</option>
                            <option value="12">2 Rois</option>
                            <option value="13">1 Chroniques</option>
                            <option value="14">2 Chroniques</option>
                            <option value="15">Esdras</option>
                            <option value="16">Néhémie</option>
                            <option value="17">Esther</option>
                            <option value="18">Job</option>
                            <option value="19">Psaumes</option>
                            <option value="20">Proverbes</option>
                            <option value="21">Ecclésiaste</option>
                            <option value="22">Cantique</option>
                            <option value="23">Esaïe</option>
                            <option value="24">Jérémie</option>
                            <option value="25">Lamentations</option>
                            <option value="26">Ezéchiel</option>
                            <option value="27">Daniel</option>
                            <option value="28">Osée</option>
                            <option value="29">Joël</option>
                            <option value="30">Amos</option>
                            <option value="31">Abdias</option>
                            <option value="32">Jonas</option>
                            <option value="33">Michée</option>
                            <option value="34">Nahum</option>
                            <option value="35">Habacuc</option>
                            <option value="36">Sophonie</option>
                            <option value="37">Aggée</option>
                            <option value="38">Zacharie</option>
                            <option value="39">Malachie</option>
                            <option value="40">Matthieu</option>
                            <option value="41">Marc</option>
                            <option value="42">Luc</option>
                            <option value="43">Jean</option>
                            <option value="44">Actes</option>
                            <option value="45">Romains</option>
                            <option value="46">1 Corinthiens</option>
                            <option value="47">2 Corinthiens</option>
                            <option value="48">Galates</option>
                            <option value="49">Ephésiens</option>
                            <option value="50">Philippiens</option>
                            <option value="51">Colossiens</option>
                            <option value="52">1 Thessaloniciens</option>
                            <option value="53">2 Thessaloniciens</option>
                            <option value="54">1 Timothée</option>
                            <option value="55">2 Timothée</option>
                            <option value="56">Tite</option>
                            <option value="57">Philémon</option>
                            <option value="58">Hébreux</option>
                            <option value="59">Jacques</option>
                            <option value="60">1 Pierre</option>
                            <option value="61">2 Pierre</option>
                            <option value="62">1 Jean</option>
                            <option value="63">2 Jean</option>
                            <option value="64">3 Jean</option>
                            <option value="65">Jude</option>
                            <option value="66">Apocalypse</option>
                        </select>
                        <select id="userChapterSelect" disabled>
                            <option value="">-- Choisissez un chapitre --</option>
                        </select>
                        <select id="userVerseSelect" disabled>
                            <option value="">-- Choisissez un verset --</option>
                        </select>
                        <select id="userToVerseSelect" disabled>
                            <option value="">-- Choisissez un verset de fin --</option>
                        </select>
                    </td>

                </tr></table>
				</header>
				<article id="topbible-search-article">
					<div><?php echo __( 'Une fois la recherche effectuée, cliquez sur un des boutons à gauche du verset pour insérer la référence ou le texte et la référence. Vous pouvez également cocher les cases et utiliser les boutons du bas pour insérer plusieurs références à la fois.', 'backbone_modal' ); ?></div>
					<div id='resultSearch'></div>
				</article>
				<footer>
					<div class="inner text-right">
						<button id="btn-cancel"
						        class="button button-large"><?php echo __( 'Annuler', 'backbone_modal' ); ?></button>
						<button id="btn-ok-ref"
						        class="button button-large"><?php echo __( 'Insérer la référence', 'backbone_modal' ); ?></button>
						<button id="btn-ok"
						        class="button button-primary button-large"><?php echo __( 'Insérer la référence avec le texte', 'backbone_modal' ); ?></button>
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

