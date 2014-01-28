var diego;

$(document).on("ready", onReady);

function onReady() {
  if ($("#home-values").data("invites")) {
  	$.ajax({
	    type: "GET",
	    url: "/invitaciones_pendientes",
	    data_type: "html",
	    success: function(data, textStatus, jqXHR) {
	    	$("#home-values").html(data); 
	    },
	    error: function() {
	    } 
	  }); 
  }
}

function invitar() {
	$.ajax({
    type: "GET",
    url: "/invites/invited_user",
    success: function(data, textStatus, jqXHR) {
      FB.ui({method: 'apprequests',
		    message: 'Corramos juntas por los barrios del DF',
		    max_recipients: '1',
		    exclude_ids: data
		  }, guardarInvitacion);
    },
    error: function() {
    } 
  });
}

function guardarInvitacion(invite_response) {
	//diego = invite_response;
	if (invite_response.request != undefined) {
		FB.api('/' + invite_response.to[0], function(user_response) {
  		var invite = {
  			'invite': {
  				'invited_user_facebook_id': invite_response.to[0],
  				'invited_user_name': user_response.name,
  				'request_facebook_id': invite_response.request 
  			}
  		};
  		$.ajax({
		    type: "POST",
		    url: "/invites.json",
		    data: invite,
		    success: function(data, textStatus, jqXHR) {
		      console.log(data);
		      if(textStatus == "success") {
		      	crearEquipo(data.user_id);
		      }
		    },
		    error: function() {
		    } 
		  });
		});
	}
}

function crearEquipo(user_id) {
	var team = {
		'team': {
			'first_user_id': user_id
		}
	};
	$.ajax({
  	type: "POST",
  	data: team,
    url: "/teams.json",
    success: function(data, textStatus, jqXHR) {
      console.log(data);
    },
    error: function() {
    } 
  });
}

function aceptarInvitacion(value) {
	console.log(value.id);
	$.ajax({
  	type: "GET",
    url: "/invites/" + value.id + "/accept",
    success: function(data, textStatus, jqXHR) {
    	diego = data;
      console.log(textStatus);
    },
    error: function() {
    } 
  });
}