/**
 * Backbone Application File
 * @internal Obviously, I've dumped all the code into one file. This should probably be broken out into multiple
 * files and then concatenated and minified but as it's an example, it's all one lumpy file.
 * @package tbleditor.backbone_modal
 */

/**
 * @type {Object} JavaScript namespace for our application.
 */
var topbible_link_editor = {
    backbone_modal: {
        __instance: undefined
    },
    /**
     * A reference to the tinymce editor
     */
    editor: null,
    /**
     * JSON object used to store response
     */
    JSONresponse: [],
    /**
     * Number of verse per chapter of the bible, grouped by book
     * */
    TOP_BIBLE_CHAPTERS: [[31, 25, 24, 26, 32, 22, 24, 22, 29, 32, 32, 20, 18, 24, 21, 16, 27, 33, 38, 18, 34, 24, 20, 67, 34, 35, 46, 22, 35, 43, 55, 32, 20, 31, 29, 43, 36, 30, 23, 23, 57, 38, 34, 34, 28, 34, 31, 22, 33, 26], [22, 25, 22, 31, 23, 30, 25, 32, 35, 29, 10, 51, 22, 31, 27, 36, 16, 27, 25, 26, 36, 31, 33, 18, 40, 37, 21, 43, 46, 38, 18, 35, 23, 35, 35, 38, 29, 31, 43, 38], [17, 16, 17, 35, 19, 30, 38, 36, 24, 20, 47, 8, 59, 57, 33, 34, 16, 30, 37, 27, 24, 33, 44, 23, 55, 46, 34], [54, 34, 51, 49, 31, 27, 89, 26, 23, 36, 35, 16, 33, 45, 41, 50, 13, 32, 22, 29, 35, 41, 30, 25, 18, 65, 23, 31, 40, 16, 54, 42, 56, 29, 34, 13], [46, 37, 29, 49, 33, 25, 26, 20, 29, 22, 32, 32, 18, 29, 23, 22, 20, 22, 21, 20, 23, 30, 25, 22, 19, 19, 26, 68, 29, 20, 30, 52, 29, 12], [18, 24, 17, 24, 15, 27, 26, 35, 27, 43, 23, 24, 33, 15, 63, 10, 18, 28, 51, 9, 45, 34, 16, 33], [36, 23, 31, 24, 31, 40, 25, 35, 57, 18, 40, 15, 25, 20, 20, 31, 13, 31, 30, 48, 25], [22, 23, 18, 22], [28, 36, 21, 22, 12, 21, 17, 22, 27, 27, 15, 25, 23, 52, 35, 23, 58, 30, 24, 42, 15, 23, 29, 22, 44, 25, 12, 25, 11, 31, 13], [27, 32, 39, 12, 25, 23, 29, 18, 13, 19, 27, 31, 39, 33, 37, 23, 29, 33, 43, 26, 22, 51, 39, 25], [53, 46, 28, 34, 18, 38, 51, 66, 28, 29, 43, 33, 34, 31, 34, 34, 24, 46, 21, 43, 29, 53], [18, 25, 27, 44, 27, 33, 20, 29, 37, 36, 21, 21, 25, 29, 38, 20, 41, 37, 37, 21, 26, 20, 37, 20, 30], [54, 55, 24, 43, 26, 81, 40, 40, 44, 14, 47, 40, 14, 17, 29, 43, 27, 17, 19, 8, 30, 19, 32, 31, 31, 32, 34, 21, 30], [17, 18, 17, 22, 14, 42, 22, 18, 31, 19, 23, 16, 22, 15, 19, 14, 19, 34, 11, 37, 20, 12, 21, 27, 28, 23, 9, 27, 36, 27, 21, 33, 25, 33, 27, 23], [11, 70, 13, 24, 17, 22, 28, 51, 44], [11, 20, 32, 23, 19, 19, 73, 18, 38, 39, 36, 47, 31], [22, 23, 15, 17, 14, 14, 10, 17, 32, 3], [22, 13, 26, 21, 27, 30, 21, 22, 35, 22, 20, 25, 28, 22, 35, 22, 16, 21, 29, 29, 34, 30, 17, 25, 6, 14, 23, 28, 25, 31, 40, 22, 33, 37, 16, 33, 24, 41, 30, 24, 34, 17], [6, 12, 8, 8, 12, 10, 17, 9, 20, 18, 7, 8, 6, 7, 5, 11, 15, 50, 14, 9, 13, 31, 6, 10, 22, 12, 14, 9, 11, 12, 24, 11, 22, 22, 28, 12, 40, 22, 13, 17, 13, 11, 5, 26, 17, 11, 9, 14, 20, 23, 19, 9, 6, 7, 23, 13, 11, 11, 17, 12, 8, 12, 11, 10, 13, 20, 7, 35, 36, 5, 24, 20, 28, 23, 10, 12, 20, 72, 13, 19, 16, 8, 18, 12, 13, 17, 7, 18, 52, 17, 16, 15, 5, 23, 11, 13, 12, 9, 9, 5, 8, 28, 22, 35, 45, 48, 43, 13, 31, 7, 10, 10, 9, 8, 18, 19, 2, 29, 176, 7, 8, 9, 4, 8, 5, 6, 5, 6, 8, 8, 3, 18, 3, 3, 21, 26, 9, 8, 24, 13, 10, 7, 12, 15, 21, 10, 20, 14, 9, 6], [33, 22, 35, 27, 23, 35, 27, 36, 18, 32, 31, 28, 25, 35, 33, 33, 28, 24, 29, 30, 31, 29, 35, 34, 28, 28, 27, 28, 27, 33, 31], [18, 26, 22, 16, 20, 12, 29, 17, 18, 20, 10, 14], [17, 17, 11, 16, 16, 13, 13, 14], [31, 22, 26, 6, 30, 13, 25, 22, 21, 34, 16, 6, 22, 32, 9, 14, 14, 7, 25, 6, 17, 25, 18, 23, 12, 21, 13, 29, 24, 33, 9, 20, 24, 17, 10, 22, 38, 22, 8, 31, 29, 25, 28, 28, 25, 13, 15, 22, 26, 11, 23, 15, 12, 17, 13, 12, 21, 14, 21, 22, 11, 12, 19, 12, 25, 24], [19, 37, 25, 31, 31, 30, 34, 22, 26, 25, 23, 17, 27, 22, 21, 21, 27, 23, 15, 18, 14, 30, 40, 10, 38, 24, 22, 17, 32, 24, 40, 44, 26, 22, 19, 32, 21, 28, 18, 16, 18, 22, 13, 30, 5, 28, 7, 47, 39, 46, 64, 34], [22, 22, 66, 22, 22], [28, 10, 27, 17, 17, 14, 27, 18, 11, 22, 25, 28, 23, 23, 8, 63, 24, 32, 14, 49, 32, 31, 49, 27, 17, 21, 36, 26, 21, 26, 18, 32, 33, 31, 15, 38, 28, 23, 29, 49, 26, 20, 27, 31, 25, 24, 23, 35], [21, 49, 30, 37, 31, 28, 28, 27, 27, 21, 45, 13], [11, 23, 5, 19, 15, 11, 16, 14, 17, 15, 12, 14, 16, 9], [20, 32, 21], [15, 16, 15, 13, 27, 14, 17, 14, 15], [21], [17, 10, 10, 11], [16, 13, 12, 13, 15, 16, 20], [15, 13, 19], [17, 20, 19], [18, 15, 20], [15, 23], [21, 13, 10, 14, 11, 15, 14, 23, 17, 12, 17, 14, 9, 21], [14, 17, 18, 6], [25, 23, 17, 25, 48, 34, 29, 34, 38, 42, 30, 50, 58, 36, 39, 28, 27, 35, 30, 34, 46, 46, 39, 51, 46, 75, 66, 20], [45, 28, 35, 41, 43, 56, 37, 38, 51, 53, 33, 44, 37, 72, 47, 20], [80, 52, 38, 44, 39, 49, 50, 56, 62, 42, 54, 59, 35, 35, 32, 31, 37, 43, 48, 47, 38, 71, 56, 53], [51, 25, 36, 54, 47, 71, 53, 59, 41, 42, 57, 50, 38, 31, 27, 33, 26, 40, 42, 31, 25], [26, 47, 26, 37, 42, 15, 60, 40, 43, 48, 30, 25, 52, 28, 41, 40, 34, 28, 41, 38, 40, 30, 35, 27, 27, 32, 44, 31], [32, 29, 31, 25, 21, 23, 25, 39, 33, 21, 36, 21, 14, 23, 33, 27], [31, 16, 23, 21, 13, 20, 40, 13, 27, 33, 34, 31, 13, 40, 58, 24], [24, 17, 18, 18, 21, 18, 16, 24, 15, 18, 33, 21, 14], [24, 21, 29, 31, 26, 18], [23, 22, 21, 32, 33, 24], [30, 30, 21, 23], [29, 23, 25, 18], [10, 20, 13, 18, 28], [12, 17, 18], [20, 15, 16, 16, 25, 21], [18, 26, 17, 22], [16, 15, 15], [25], [14, 18, 19, 16, 14, 20, 28, 13, 28, 39, 40, 29, 25], [27, 26, 18, 17, 20], [25, 25, 22, 19, 14], [21, 22, 18], [10, 29, 24, 21, 21], [13], [14], [25], [20, 29, 22, 11, 14, 17, 17, 13, 21, 11, 19, 17, 18, 20, 8, 21, 18, 24, 21, 15, 27, 21]],
    /**
     * Book names of the bible
     */
    BOOKS: ["Genèse", "Exode", "Lévitique", "Nombres", "Deutéronome", "Josué", "Juges", "Ruth", "1 Samuel", "2 Samuel", "1 Rois", "2 Rois", "1 Chroniques", "2 Chroniques", "Esdras", "Néhémie", "Esther", "Job", "Psaumes", "Proverbes", "Ecclésiaste", "Cantique", "Esaïe", "Jérémie", "Lamentations", "Ezéchiel", "Daniel", "Osée", "Joël", "Amos", "Abdias", "Jonas", "Michée", "Nahum", "Habacuc", "Sophonie", "Aggée", "Zacharie", "Malachie", "Matthieu", "Marc", "Luc", "Jean", "Actes", "Romains", "1 Corinthiens", "2 Corinthiens", "Galates", "Ephésiens", "Philippiens", "Colossiens", "1 Thessaloniciens", "2 Thessaloniciens", "1 Timothée", "2 Timothée", "Tite", "Philémon", "Hébreux", "Jacques", "1 Pierre", "2 Pierre", "1 Jean", "2 Jean", "3 Jean", "Jude", "Apocalypse"]
};


/**
 * Primary Modal Application Class
 */
topbible_link_editor.backbone_modal.Application = Backbone.View.extend({
    id: "backbone_modal_dialog",
    events: {
        "click .backbone_modal-close": "closeModal",
        "click #topbible-btn-cancel": "closeModal",
        "click #topbible-btn-ok-ref": "saveModalRef",
        "click #topbible-btn-ok": "saveModal",
        "click #topbible-btn-link": "saveLink",
        "keyup #topbible-userSearchText": "searchModal",
        "change #topbible-userVersionSelect": "searchModal",
        "change #topbible-userBookSelect": "bookSelect",
        "change #topbible-userChapterSelect": "chapterSelect",
        "change #topbible-userVerseSelect": "verseSelect",
        "change #topbible-userToVerseSelect": "toVerseSelect",
        "click .navigation-bar a": "doNothing"
    },

    /**
     * Simple object to store any UI elements we need to use over the life of the application.
     */
    ui: {
        nav: undefined,
        content: undefined
    },

    /**
     * Container to store our compiled templates. Not strictly necessary in such a simple example
     * but might be useful in a larger one.
     */
    templates: {},

    /**
     * Instantiates the Template object and triggers load.
     */
    initialize: function () {
        "use strict";

        _.bindAll( this, 'render', 'closeModal', 'saveModal', 'saveModalRef', 'doNothing',
            'bookSelect', 'chapterSelect', 'verseSelect', 'toVerseSelect', 'saveLink' );
        this.initialize_templates();
        this.render();
    },


    /**
     * Creates compiled implementations of the templates. These compiled versions are created using
     * the wp.template class supplied by WordPress in 'wp-util'. Each template name maps to the ID of a
     * script tag ( without the 'tmpl-' namespace ) created in template-data.php.
     */
    initialize_templates: function () {
        this.templates.window = wp.template( "tbleditor-modal-window" );
        this.templates.backdrop = wp.template( "tbleditor-modal-backdrop" );
    },

    /**
     * Assembles the UI from loaded templates.
     * @internal Obviously, if the templates fail to load, our modal never launches.
     */
    render: function () {
        "use strict";

        // Build the base window and backdrop, attaching them to the $el.
        this.$el.attr( 'tabindex', '0' )
            .append( this.templates.window() )
            .append( this.templates.backdrop() );


        // The l10n object generated by wp_localize_script() should be available, but check to be sure.
        // Again, this is a trivial example for demonstration.
        if ( typeof tbleditor_backbone_modal_l10n === "object" ) {
            this.ui.content = this.$( '.backbone_modal-main article' )
                .append( "<p>" + tbleditor_backbone_modal_l10n.replace_message + "</p>" );
        }

        // set overflow to "hidden" on the body so that it ignores any scroll events while the modal is active
        // and append the modal to the body.
        jQuery( "body" ).css( {"overflow": "hidden"} ).append( this.$el );

        // Set focus on the modal to prevent accidental actions in the underlying page
        // Not strictly necessary, but nice to do.
        setTimeout(function(){
            jQuery('#topbible-userSearchText').focus();
            var text = topbible_link_editor.editor.selection.getContent({
                'format': 'html'
            });
            jQuery('#topbible-userSearchText').val(text).keyup();
        }, 0);
    },

    /**
     * Closes the modal and cleans up after the instance.
     * @param e {object} A jQuery-normalized event object.
     */
    closeModal: function(e) {
        "use strict";

        if (e) e.preventDefault();
        this.undelegateEvents();
        jQuery( document ).off( "focusin" );
        jQuery( "body" ).css( {"overflow": "auto"} );
        this.remove();
        topbible_link_editor.backbone_modal.__instance = undefined;
    },

    getSelectedElements: function() {
        var result = topbible_link_editor.JSONresponse.filter(function(item) {
            return item['selected'];
        });
        if (!result.length && topbible_link_editor.JSONresponse.length) {
            result.push(topbible_link_editor.JSONresponse[0]);
        }
        return result;
    },

    /**
     * Responds to the btn-ok.click event
     * @param e {object} A jQuery-normalized event object.
     */
    saveModal: function(e) {
        "use strict";
        var textToInsert = "";
        var elements = this.getSelectedElements();
        if (elements.length !== 0) {
            for (var i = 0; i < elements.length; i++) {
                textToInsert = textToInsert +
                    elements[i]['text']+
                    ' (<a class="button" target="_blank" href="' + elements[i]['url'] + '">' + elements[i]['ref'] + '</a>) ';
            }
        }

        tinymce.execCommand('mceInsertContent', false, textToInsert);
        this.closeModal( e );
    },
    saveLink: function(e) {
        "use strict";
        var textToInsert = "";
        var elements = this.getSelectedElements();
        if (elements.length !== 0) {
            tinymce.execCommand('mceInsertLink', false, {href: elements[0]['url'], target: '_blank'});
        }

        this.closeModal(e);
    },
    saveModalRef: function(e) {
        "use strict";
        var textToInsert = "";
        var elements = this.getSelectedElements();
        if (elements.length !== 0) {
            for (var i = 0; i < elements.length; i++) {
                textToInsert = textToInsert +
                    ' <a class="button" target="_blank" href="' + 
                    elements[i]['url'] + '">' + 
                    elements[i]['ref'] + '</a> ';
            }
        }

        tinymce.execCommand('mceInsertContent', false, textToInsert);
        this.closeModal( e );
    },

    /**
     * Responds to the btn-search.click event
     * @param e {object} A jQuery-normalized event object.
     */
    searchModal: function(e) {
        "use strict";
        var userText = document.getElementById('topbible-userSearchText').value;
        var version = document.getElementById('topbible-userVersionSelect').value;

        if (userText.length === 0) {
            return;
        }

        // Sends a low level Ajax request
        tinymce.util.XHR.send({

            url: 'https://topbible.topchretien.com/verset/api/verse?q=' + userText + '&v=' + version,

            success: function(response) {

                if (response.length !== 0) {
                    topbible_link_editor.JSONresponse = tinymce.util.JSON.parse(response);
                    if (topbible_link_editor.JSONresponse.length !== 0) {
                        var result = "<ul>";

                        for (var i = 0; i < topbible_link_editor.JSONresponse.length; i++) {
                            result = result +
                                "<li><label><h3><input type='checkbox' onclick='topbible_link_editor.backbone_modal.__instance.clickOnSearchList(this,"+i+")'>" +
                                topbible_link_editor.JSONresponse[i]['ref']+
                                "</h3><p>"+
                                topbible_link_editor.JSONresponse[i]['text']+
                                "</p></label></li>";	
                            topbible_link_editor.JSONresponse[i]['selected'] = false;
                        }

                        result = result+"</ul>";

                        document.getElementById('topbible-resultSearch').innerHTML = "<p>"+result+"</p>";
                    } else {
                        document.getElementById('topbible-resultSearch').innerHTML = "<p>Je n'ai rien trouvé...</p>";
                        return;
                    }

                } else {
                    document.getElementById('topbible-resultSearch').innerHTML = "<p>Pas de réponse du serveur...</p>";
                    return;
                }

            },

            error: function() {
                document.getElementById('topbible-resultSearch').innerHTML = "<p>Erreur de connexion au serveur...</p>";
                return;
            } 

        });

    },

    /**
     * Ensures that events do nothing.
     * @param e {object} A jQuery-normalized event object.
     */
    doNothing: function(e) {
        "use strict";
        e.preventDefault();
    },

    /**
     * Click
     * @param e {object} A jQuery-normalized event object.
     */
    clickOnSearchList: function ( elm,id ) {
        "use strict";

        if (topbible_link_editor.JSONresponse[id]['selected'] === false) {
            topbible_link_editor.JSONresponse[id]['selected'] = true;
            elm.parentElement.parentElement.classList.add('selected');
        } else {
            topbible_link_editor.JSONresponse[id]['selected'] = false;
            elm.parentElement.parentElement.classList.remove('selected');
        }
    },
    computeReference: function() {
        var book = parseInt(jQuery('#topbible-userBookSelect').val());
        var chapter = parseInt(jQuery('#topbible-userChapterSelect').val());
        var verse = parseInt(jQuery('#topbible-userVerseSelect').val());
        var toverse = parseInt(jQuery('#topbible-userToVerseSelect').val());
        var ref = '';
        if (book) {
            ref += topbible_link_editor.BOOKS[book - 1];
            if (chapter) {
                ref += ' ' + chapter;
                if (verse) {
                    ref += '.' + verse;
                    if (toverse) {
                        ref += '-' + toverse;
                    }
                }
            }
        }
        jQuery('#topbible-userSearchText').val(ref).keyup();
    },
    toVerseSelect: function() {
        this.computeReference();
    },
    verseSelect: function() {
        var book = parseInt(jQuery('#topbible-userBookSelect').val());
        var chapter = parseInt(jQuery('#topbible-userChapterSelect').val());
        var verse = parseInt(jQuery('#topbible-userVerseSelect').val());
        if (verse) {
            book--;
            chapter--;
            var verses = topbible_link_editor.TOP_BIBLE_CHAPTERS[book][chapter];
            var options = '<option value="">-- Choisissez un verset de fin --</option>';
            for(var i = 1 ; i <= verses ; i++) {
                options += '<option>' + i + '</option>';
            }
            jQuery('#topbible-userToVerseSelect').html(options).prop('disabled', false);
        } else {
            jQuery('#topbible-userToVerseSelect').val(''),prop('disabled', true);
        }
        this.computeReference();
    },
    chapterSelect: function() {
        var book = parseInt(jQuery('#topbible-userBookSelect').val());
        var chapter = parseInt(jQuery('#topbible-userChapterSelect').val());
        if (chapter) {
            book--;
            chapter--;
            var verses = topbible_link_editor.TOP_BIBLE_CHAPTERS[book][chapter];
            var options = '<option value="">-- Choisissez un verset --</option>';
            for(var i = 1 ; i <= verses ; i++) {
                options += '<option>' + i + '</option>';
            }
            jQuery('#topbible-userVerseSelect').html(options).prop('disabled', false);
            jQuery('#topbible-userToVerseSelect').val('').prop('disabled', true);
        } else {
            jQuery('#topbible-userVerseSelect').val('').prop('disabled', true);
            jQuery('#topbible-userToVerseSelect').val('').prop('disabled', true);
        }
        this.computeReference();
    },
    bookSelect: function() {
        var book = parseInt(jQuery('#topbible-userBookSelect').val());
        if (book) {
            book--;
            var chapters = topbible_link_editor.TOP_BIBLE_CHAPTERS[book].length;
            var options = '<option value="">-- Choisissez un chapitre --</option>';
            for(var i = 1 ; i <= chapters ; i++) {
                options += '<option>' + i + '</option>';
            }
            jQuery('#topbible-userChapterSelect').html(options).prop('disabled', false);
            jQuery('#topbible-userVerseSelect').val('').prop('disabled', true);
            jQuery('#topbible-userToVerseSelect').val('').prop('disabled', true);
        } else {
            jQuery('#topbible-userChapterSelect').val('').prop('disabled', true);
            jQuery('#topbible-userVerseSelect').val('').prop('disabled', true);
            jQuery('#topbible-userToVerseSelect').val('').prop('disabled', true);
        }
        this.computeReference();
    }
} );

jQuery(function() {
    tinymce.PluginManager.add('top_bible_link_class', function( editor, url ) {
        topbible_link_editor.editor = editor;
        topbible_link_editor.url = url;

        // Add Button to Visual Editor Toolbar
        editor.addButton('top_bible_link_class', {
            title: 'Insérer un lien vers TopBible',
            cmd: 'top_bible_link_class',
            image: url + '/link.png',
        });

        // Add Command when Button Clicked
        editor.addCommand('top_bible_link_class', function() {

            if ( topbible_link_editor.backbone_modal.__instance === undefined ) {
                topbible_link_editor.backbone_modal.__instance = new topbible_link_editor.backbone_modal.Application();
            }
        });
    });
});
