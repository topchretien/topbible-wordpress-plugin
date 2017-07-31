(function() {

	tinymce.PluginManager.add( 'top_bible_link_class', function( editor, url ) {

		// Add Button to Visual Editor Toolbar
		editor.addButton('top_bible_link_class', {
			title: 'Insert Link to TopBible',
			cmd: 'top_bible_link_class',
			image: url + '/link.png',
		});	

		// Add Command when Button Clicked
		editor.addCommand('top_bible_link_class', function() {
			// Check we have selected some text that we want to link
			var text = editor.selection.getContent({
				'format': 'html'
			});

			if ( text.length === 0 ) {
				// Ask the user to enter a reference
				text = prompt('Enter a reference (ex. Actes 10.1)');
				if ( !text ) {
					// User cancelled - exit
					return;
				}
				if (text.length === 0) {
					// User didn't enter a URL - exit
					return;
				}
			}

			// Sends a low level Ajax request
			tinymce.util.XHR.send({

			   url: 'https://topbible.topchretien.com/verset/api/verse?q=' + text,

			   success: function(response) {

			      	if (response.length !== 0) {
			      		var JSONresponse = tinymce.util.JSON.parse(response);
			      		if (JSONresponse.length !== 0) {

							editor.execCommand('mceInsertContent', false, JSONresponse[0]['text']+' (<a class="button" href="' + JSONresponse[0]['url'] + '">' + JSONresponse[0]['ref'] + '</a>)');
			      		} else {
			      			console.debug( 'Empty answer from API...' );
			      			return;
			      		}

			      	} else {
			      		console.debug( 'No answer from API...' );
			      		return;
			      	}
			      	
			   },

			   error: function() {
			   		console.debug( 'Can\'t connect to the API...' );
			   		return;
			   } 

			});

		});


	});

})();
