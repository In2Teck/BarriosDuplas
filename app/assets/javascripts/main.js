function invitar() {
	FB.ui({method: 'apprequests',
    message: 'Corramos juntas por los barrios del DF',
    max_recipients: '1'
  }, guardarInvitacion);
}

var diego;
function guardarInvitacion(invite_response) {
	diego = invite_response;
	if (invite_response.request != undefined) {
		FB.api('/' + invite_response.to[0], function(user_response) {
  		var invite = {
  			'invite': {
  				'invited_user_facebook_id': invite_response.to[0],
  				'invited_user_name': user_response.name,
  				'request_facebook_id': invite_response.request 
  			}
  		}
  		$.ajax({
		    type: "POST",
		    url: "/invites.json",
		    data: invite,
		    success: function(data, textStatus, jqXHR) {
		      //console.log(data);
		      //console.log(textStatus);
		    },
		    error: function() {
		    } 
		  });
		});
	}
}