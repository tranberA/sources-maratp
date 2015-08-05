
	/*
		Si le champ est un champ acceptant uniquement les caractères alphabétiques (type champs nom, prénom…)</li>
		On bloque la saisi de tous les caractères qui ne sont pas acceptés : chiffres, caractères spéciaux…</li>
		De plus si le champs est limité à X caractères maximum, on bloque la saisi au X+1eme caractères</li>
		De même pour les champs acceptant uniquement les caractères numériques, on bloque la saisi de tous les caractères qui ne sont pas accéptés.
	*/

  // Utilitaire affichage erreurs

  (function(){
    var _lib = {
      displayError: function(element,message)
      {
        var messageId = element.attr('id') + '-error';
					if (!element.is('[aria-describedby]')) {
						jQuery('<div id="'+messageId+'" class="messages error">' + element.attr(message) + '</div>').insertAfter(element.parent());
		        element.attr('aria-describedby',messageId);
	        }
	        else {
	        	jQuery('#' + messageId).text(element.attr(message));
	        }
      },
      hideError: function(element)
      {
        jQuery('#' + element.attr('aria-describedby')).remove();
        element.removeAttr('aria-describedby');
      }
    };

    window.FormValidator = _lib;
  })();

	// Restriction des caractères saisies.
	jQuery('input[type="text"]').each(function () {
		jQuery(this).keypress(function(key) {
			if (jQuery(this).hasClass('date')) {
				// On refuse tout ce qui n'est pas chiffre, slash, backspace, tab et delete.
				if (((key.charCode < 48 || key.charCode > 57) && key.charCode != 47) && key.charCode != 0 && key.charCode != 8 && key.charCode != 9 && key.charCode != 46) return false;
			}
			else if (jQuery(this).hasClass('codepostal') || jQuery(this).hasClass('number')) {
				if (((key.charCode < 48 || key.charCode > 57)) && key.charCode != 0 && key.charCode != 8 && key.charCode != 9 && key.charCode != 46) return false;
			}
			else if (!jQuery(this).hasClass('adresse')) {
				// On refuse les chiffres et d'autres caractères spéciaux.
				if ((key.charCode >= 48 && key.charCode <= 57) || [33, 34, 35, 36, 37, 38, 40, 41, 42, 43, 44, 46, 47, 58, 59, 60, 61, 62, 63, 64, 95, 124, 163, 167, 176, 8364].indexOf(key.charCode) > -1) return false;
			}
		});
	});

	// Validation formulaire.
	jQuery('.bloc-formulaire form').each(function () {
		jQuery(this).attr('novalidate', 'novalidate');
		jQuery(this).submit(function (event) {
			var errors = false;

			jQuery(this).find('input, select, textarea').each(function () {

        var formElement = jQuery(this);

				if (formElement.is('input')) {
					if (jQuery(this).is('[type="checkbox"]')) { // Cases à cocher.
						if (jQuery(this).attr('aria-required') == 'true') {
							var label = jQuery('label[for="' + jQuery(this).attr('id') + '"]');
							if (jQuery(this).is(':checked')) {
								label.removeClass('error');
								label.find('.error.visually-hidden').remove();
							}
							else {
								if (!label.hasClass('error')) {
									label.addClass('error');
									jQuery('<span class="error visually-hidden"> ' + jQuery(this).attr('data-required') + '</span>').appendTo(label);
								}
								errors = true;
							}
						}
					}
					else { // Autres champs.

						// Champs obligatoires.
						if (jQuery(this).is('[aria-required]')) {
							if (jQuery(this).is(':blank')) { // valueMissing
								if (jQuery(this).is('[aria-describedby]')) {
									// On met à jour juste le contenu de l'élément référence.
									jQuery('#' + jQuery(this).attr('aria-describedby')).text(jQuery(this).attr('data-blank'));
								}
								else {
									// On crée un élément error contenant le message, on l'identifie et on l'insère après...
									jQuery('<div id="' + jQuery(this).attr('id') + '-error" class="messages error">' + jQuery(this).attr('data-blank') + '</div>').insertAfter(jQuery(this).parent());
									jQuery(this).attr('aria-describedby', jQuery(this).attr('id') + '-error');
								}
								errors = true;
							}
							else {
								// On supprime le message de l'erreur.
								jQuery('#' + jQuery(this).attr('aria-describedby')).remove();
								jQuery(this).removeAttr('aria-describedby');
							}
						}
						
						
						
						// Mobile.
						if (formElement.is('[type="tel"]')) {
							var telPattern = /^0[6,7,8][0-9]{8}$/;
							 var value = formElement.val();
							 if (value != '') {
							 	if(value.search(telPattern) === -1)
							 	{
							 	  FormValidator.displayError(formElement, 'data-badformat');
							 	  errors = true;
							 	}
							 	else
							 	{
							 	  FormValidator.hideError(formElement);
							 	}
							 }
						}
						// Code postal.
						if (formElement.hasClass('codepostal')) {
			                var cpPattern = /^[0-9]{5}$/;
			
			                var value = formElement.val();
			
			                if(value != '')
			                {
			                  if(value.search(cpPattern) === -1)
			                  {
			                    FormValidator.displayError(formElement, 'data-codeinvalid');
			                    errors = true;
			                  }
			                  else
			                  {
			                    FormValidator.hideError(formElement);
			                  }
			                }
			              }
						
						
						
						// Dates personnalisées.
						if (jQuery(this).hasClass('date') && jQuery(this).is(':filled')) {

              var datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
              var dateValue = formElement.val();

							if (dateValue.search(datePattern) !== -1) { // Date Ok ?
								if (jQuery(this).is('[data-minage]')) {

									var birthday = jQuery(this).val().split('/');

									var now = new Date();
									var past = new Date(birthday[2] + '-' + birthday[1] + '-' + birthday[0]);


									var nowYear = now.getFullYear();
									var pastYear = past.getFullYear();
									var age = nowYear - pastYear;
									if (now.getMonth() < past.getMonth()) { age--; }
									if (past.getMonth() == now.getMonth() && now.getDate() < past.getDate()) { age--; }
									if (age <= jQuery(this).attr('data-minage')) { // Date Ok : 30/07/1998 - Date NOk : 30/07/1999
										if (jQuery(this).is('[aria-describedby]')) {
											// On met à jour juste le contenu de l'élément référence.
											jQuery('#' + jQuery(this).attr('aria-describedby')).text(jQuery(this).attr('data-underage'));
										}
										else {
											// On crée un élément error contenant le message, on l'identifie et on l'insère après...
											jQuery('<div id="' + jQuery(this).attr('id') + '-error" class="messages error">' + jQuery(this).attr('data-underage') + '</div>').insertAfter(jQuery(this).parent());
											jQuery(this).attr('aria-describedby', jQuery(this).attr('id') + '-error');
										}
										errors = true;
									}
									else {
										// On supprime le message de l'erreur.
										jQuery('#' + jQuery(this).attr('aria-describedby')).remove();
										jQuery(this).removeAttr('aria-describedby');
									}
								}
							}
							else { // Date NOK.
FormValidator.displayError(formElement,'data-badformat');
							}

						}

						// Email incorrecte ou existe déjà.

            	if (formElement.is('[type="email"]')) {
                var mailPattern = /^[a-zA-Z0-9_\.-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z]{2,})+$/;

                var value = formElement.val();

                if(value != '')
                {
                  if(value.search(mailPattern) === -1)
                  {
                    FormValidator.displayError(formElement,'data-type');
                    errors = true;
                  }
                  else
                  {
                    FormValidator.hideError(formElement);
                  }
                }
              }

						// Concordance (pass) + force.

            if (formElement.is('[type="password"]')) {
              var value = formElement.val();
              if(value != '')
              {
                var verif = formElement.data('equal');

                if(verif !== undefined)
                {
                  var first = jQuery('#'+verif);

                  if(first.val() == value)
                  {
                    FormValidator.hideError(formElement);
                    errors = true;
                  }
                  else
                    {
                      FormValidator.displayError(formElement,'data-confirm');
                    }

                }
              }
            }

						// Longueur minimale.
						if (jQuery(this).is('[data-minlength]') && jQuery(this).is(':filled')) {
							if (jQuery(this).val().length < jQuery(this).attr('data-minlength')) {
								if (!jQuery(this).is('[aria-describedby]')) {
									// On crée un élément error contenant le message, on l'identifie et on l'insère après...
									jQuery('<div id="' + jQuery(this).attr('id') + '-error" class="messages error">' + jQuery(this).attr('data-minlengthinvalid') + '</div>').insertAfter(jQuery(this).parent());
									jQuery(this).attr('aria-describedby', jQuery(this).attr('id') + '-error');
								}
								errors = true;
							}
							else {
								// On supprime le message de l'erreur.
								jQuery('#' + jQuery(this).attr('aria-describedby')).remove();
								jQuery(this).removeAttr('aria-describedby');
							}
						}

					}
				}
				else if (jQuery(this).is('select') && jQuery(this).attr('aria-required') == 'true') { // Select.
					if (jQuery(this).val() == -1) {
						if (!jQuery(this).is('[aria-describedby]')) {
							// On crée un élément error contenant le message, on l'identifie et on l'insère après...
							jQuery('<div id="' + jQuery(this).attr('id') + '-error" class="messages error">' + jQuery(this).attr('data-blank') + '</div>').insertAfter(jQuery(this).parent());
							jQuery(this).attr('aria-describedby', jQuery(this).attr('id') + '-error');
						}
						errors = true;
					}
					else {
						// On supprime le message de l'erreur.
						jQuery('#' + jQuery(this).attr('aria-describedby')).remove();
						jQuery(this).removeAttr('aria-describedby');
					}
				}

			});
			if (errors) {
				if (jQuery('title').attr('data-errors') != 'true') {
					document.title = 'Erreurs dans le formulaire - ' + document.title;
				}
				jQuery('title').attr('data-errors', 'true');
				event.preventDefault(); // Bloquer l'envoi du formulaire si erreur.
			}
			else {
				var newtitle = document.title.split(' - ');
				newtitle.shift();
				document.title = newtitle;
				jQuery('title').removeAttr('data-errors');
			}
		});
	});




 
  (function() {
    // trim polyfill : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/Trim
    if (!String.prototype.trim) {
      (function() {
        // Make sure we trim BOM and NBSP
        var rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;
        String.prototype.trim = function() {
          return this.replace(rtrim, '');
        };
      })();
    }

    [].slice.call( document.querySelectorAll( '.form-item input' ) ).forEach( function( inputEl ) {
      // in case the input is already filled..
      if( inputEl.value.trim() !== '' ) {
        classie.add( inputEl.parentNode, 'input--filled' );
      }

      // events:
      inputEl.addEventListener( 'focus', onInputFocus );
      inputEl.addEventListener( 'blur', onInputBlur );
    } );

    function onInputFocus( ev ) {
      classie.add( ev.target.parentNode, 'input--filled' );
    }

    function onInputBlur( ev ) {
      if( ev.target.value.trim() === '' ) {
        classie.remove( ev.target.parentNode, 'input--filled' );
      }
    }
  })();
