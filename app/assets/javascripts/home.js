$(document).on("ready", onReady);
var facebook_id;

var sub_der, sub_izq, simplemodal_container, img_transparent = {};

function onReady() {
  facebook_id = $("#ruby-values").data("facebook-id");
  if ($("#home-values").data("user").register_complete) {
    appendProfilePic();

    if(!$("#home-values").data("team")){
      $("#amiga").addClass("cursor_pointer");
      $("#amiga").on("click", interaccionAmiga);
    }

    $("#equipo").on("click", capturaEquipo);
    $("#barrio").on("click", capturaBarrio);
    $("#ranking").on("click", muestraRanking);
    $("#run_clubs").on("click", muestraRunClubs);
    $("#retos").on("click", muestraRetos);

  }
  else {
    resetCssProperty("perfil", "background", "url()");
    resetCssProperty("perfil", "background-color", "#2A2A2A");
    capturaPerfil();
  }
  var pause = 50; 
  $(window).resize(function() {
      setTimeout(function() {
          var width = $(window).width();
          
          if (width <= 900) {
            sub_der = {
              display: "inline-block",
              width: "200px",
              height: "206px"
            }
            sub_izq = {
              display: "inline-block",
              width: "200px",
              height: "206px" 
            }
            simplemodal_container = {
              height: "412px",
              width: "400px",
              margin: "200px auto auto",
              padding: 0
            }
            img_transparent = {
              opacity: 0.6,
              width: "200px",
              height: "206px",
              display: "block",
              margin: "1px auto auto auto"
            }
            if( width <= 480 ) {
              simplemodal_container = {
                height: "412px",
                width: "200px",
                padding: 0,
                margin: "40px auto auto auto"
              }
            }
          } else {
            sub_der = {
              display: "inline-block",
              width: "400px",
              height: "412px"
            }
            sub_izq = {
              display: "inline-block",
              width: "400px",
              height: "412px"
            }
            simplemodal_container = {
              height: "412px",
              width:"800px",
              padding: 0,
              margin: 0
            }
            img_transparent = {
              opacity: 0.6,
              width: "400px",
              height: "410px",
              display: "block",
              margin: "1px auto auto auto"
            }
          }

          $("#simplemodal-container").css(simplemodal_container);
          $("#sub_der").css(sub_der);
          $("#sub_izq").css(sub_izq);
          $(".img_transparent_modal").css(img_transparent);

      }, pause);
  });

  $(window).resize();
}

function appendProfilePic(){
  $("#perfil").append("<img src='http://graph.facebook.com/"+ facebook_id +"/picture?redirect=1&type=square&width=300&height=300' class='img_transparent'/></div>");
  $("#perfil").append("<div id='profile_name'><h2>" + $("#home-values").data("user")["first_name"] + " " + $("#home-values").data("user")["last_name"] + "</h2></div>");
}

function capturaPerfil() {
  $.ajax({
    type: "GET",
    url: "/nombre_usuario",
    data_type: "html",
    success: function(data, textStatus, jqXHR) {
      var html = "<div id='sub_izq' class='profile_izq responsive_bck'><img src='http://graph.facebook.com/"+ facebook_id +"/picture?redirect=1&type=square&width=300&height=300' class='img_transparent_modal'/></div><div id='sub_der' class='profile_der responsive_bck'></div>"; 
      modalDialogue(html, {closeClass: 'dialogueClass', overlayClose: false, modal: false, opacity: 75, escClose: false});
      $("#sub_der").html(data); 
    },
    error: function() {
    } 
  });
}

function capturaEquipo() {
  var team = $("#home-values").data("team");
  if (team != "" && team.name == null) {
    $.ajax({
      type: "GET",
      url: "/nombre_dupla",
      data_type: "html",
      success: function(data, textStatus, jqXHR) {
        var html = "<div id='sub_izq' class='equipo_izq responsive_bck'></div><div id='sub_der' class='equipo_der responsive_bck'></div>"; 
        modalDialogue(html);
        $("#sub_der").html(data); 
      },
      error: function() {
      } 
    });
  }
}

function capturaBarrio() {
  if ($("#home-values").data("user").hood == null) {
    $.ajax({
      type: "GET",
      url: "/seleccion_barrio",
      data_type: "html",
      success: function(data, textStatus, jqXHR) {
        var hoods = [];
        var all = $(data + "#hood-values").data("hoods");
        for (var index = 0; index < all.length; index++) {
          hoods.push(all[index].name);
        }
        var html = "<div id='sub_izq' class='barrio_izq responsive_bck'></div><div id='sub_der' class='barrio_der responsive_bck'></div>"; 
        modalDialogue(html, null);
        $("#sub_der").html(data);
        $("#hood-name-txt").autocomplete({source: hoods});
      },
      error: function() {
      } 
    });
  }
}

function interaccionAmiga() {
  //var html = "<div id='sub_izq' class='amiga_izq responsive_bck'></div><div id='sub_der' class='amiga_der responsive_bck'></div>"; 
  //modalDialogue(html);
  invitar();
}

function muestraRanking() {
  //window.location.href = "/home_ranking"; 
}

function muestraRunClubs() {
  var html = "<div id='sub_izq' class='run_club_izq responsive_bck'></div><div id='sub_der' class='run_club_der responsive_bck'></div>"; 
  modalDialogue(html);
}

function muestraRetos() {
  var html = "<div id='sub_izq' class='retos_izq responsive_bck'></div><div id='sub_der' class='retos_der responsive_bck'></div>"; 
  modalDialogue(html);
}

function registrarNombre() {
  var firstN = $("#first-name-txt").val();
  var lastN = $("#last-name-txt").val();
  if (firstN != "" && lastN != "") {
    var user = {
      "user": {
        "first_name": firstN,
        "last_name": lastN,
        "register_complete": true
      }
    };
    user.register_complete = true;
    $.ajax({
      type: "PUT",
      data: user,
      url: "/users/" + $("#home-values").data("user").id + ".json",
      success: function(data, textStatus, jqXHR) {
        $.modal.close();
        // Pone background de perfil
        resetCssProperty("perfil", "background-color", "");
        resetCssProperty("perfil", "background", "url('/assets/bg_gradient_perfil.png')");
        appendProfilePic();
      },
      error: function() {
      } 
    });
  }
  else {
    //no han llenado los valores
  }
}

function registrarEquipo() {
  var equipoN = $("#team-name-txt").val();
  if (equipoN != "") {
    var team = {
      "team": {
        "name": equipoN
      }
    };
     $.ajax({
      type: "PUT",
      data: team,
      url: "/teams/" + $("#home-values").data("team").id + ".json",
      success: function(data, textStatus, jqXHR) {
        $.modal.close();
        //poner el nombre del equipo sobre el contenedor
      },
      error: function() {
      } 
    });
  }
}

function registrarBarrio() {
  var barrioN = $("#barrio-name-txt").val();
  if (barrioN != "") {
    var user = {
      "team": {
        "name": equipoN
      }
    };
     $.ajax({
      type: "PUT",
      data: user,
      url: "/users/" + $("#home-values").data("user").id + ".json",
      success: function(data, textStatus, jqXHR) {
        $.modal.close();
        //poner el barrio en el contenedor
      },
      error: function() {
      } 
    });
  }
}
