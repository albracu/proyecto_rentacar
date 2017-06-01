$.fn.validator.Constructor.INPUT_SELECTOR = ':input:not([type="submit"], button):enabled:visible, .selectpicker';
// aqui se pone el nombre de pagina con que se mostrará en el sistema, por ejemplo http://brujosfuertes.info/
var paginaweb = 'http://reservatucarro.com/';

jQuery().ready(function(){
		$('#enviar_email').validator().on('submit', function (e) {
			//e.preventDefault();
			if (e.isDefaultPrevented()) {
				// handle the invalid form...
				return false;
			} else {
				//send notifier
				var form_data = jQuery("#enviar_email").serialize();
				var error = "";
				var automate_page = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
				var page = (paginaweb) ? paginaweb : automate_page;

				jQuery.ajax({
				    type: 'POST',
					// url: 'http://localhost:8000/subscribe/formlead',
				    url: 'https://artesyweb.xyz/subscribe/formlead',
				    crossDomain: true,
				    data: form_data+"&url="+page,
				    dataType: 'json',
					beforeSend: function(jqXHR,settings){
						jQuery('#boton-enviar').button('loading');
					},
				    success: function(responseData, textStatus, jqXHR) {
				        console.log('POST OK.');
				    },
				    error: function (responseData, textStatus, errorThrown) {
				        console.log('POST failed.');
						error="&error="+errorThrown+"&url="+window.location.href;
						jQuery('#boton-enviar').button("reset");
				    },
				    complete: function ( jqXHR,  textStatus ){
						jQuery.ajax({
						    type: 'POST',
						    url: 'lib/mail.php',
						    data: form_data+error,
							beforeSend: function(jqXHR,settings){
								jQuery('#boton-enviar').button('loading');
							},
						    success: function(responseData, textStatus, jqXHR) {
						        console.log('POST OK.');
								window.location.replace("gracias.html");
							},
						    error: function (responseData, textStatus, errorThrown) {
						        console.log('POST failed.');
								jQuery("#respuesta").html("Ha ocurrido un error. Por favor intentelo de nuevo");
								jQuery('#boton-enviar').button("reset");
						    },
						    complete: function ( jqXHR,  textStatus ){
								e.preventDefault();
						    }
						});
				    }
				});

				return false;
			}

		});
		
		jQuery('#form-dpfecharecogida').datetimepicker(
            { 
                locale: 'es',
                showClear: true,
                showClose: true,
                
                format: 'DD-MM-YYYY',
                ignoreReadonly: true,
				widgetPositioning: { horizontal: 'auto', vertical: 'bottom' },
				icons: { close: 'glyphicon glyphicon-ok' },
				minDate: moment().subtract(1,'d')
                
            }
        );
        jQuery('#form-dphorarecogida').datetimepicker(
            { 
                locale: 'es',
                showClear: true,
                showClose: true,
                format: 'hh:mm A',
                ignoreReadonly: true,
                stepping: 15,
				widgetPositioning: { horizontal: 'auto', vertical: 'bottom' },
				icons: { close: 'glyphicon glyphicon-ok' }

            }
        );
        jQuery('#form-dpfechadevolucion').datetimepicker(
            { 
                locale: 'es',
                showClear: true,
                showClose: true,
                format: 'DD-MM-YYYY',
                ignoreReadonly: true,
				widgetPositioning: { horizontal: 'auto', vertical: 'bottom' },
				icons: { close: 'glyphicon glyphicon-ok' },
				minDate: moment().subtract(1,'d')
                
            }
        );
        jQuery('#form-dphoradevolucion').datetimepicker(
            { 
                locale: 'es',
                showClear: true,
                showClose: true,
                format: 'hh:mm A',
                ignoreReadonly: true,
                stepping: 15,
				widgetPositioning: { horizontal: 'auto', vertical: 'bottom' },
				icons: { close: 'glyphicon glyphicon-ok' }
                
            }
        );

});
