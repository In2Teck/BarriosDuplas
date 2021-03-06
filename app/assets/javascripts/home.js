$(document).on("ready", onReady);
var facebook_id;

var sub_der, sub_izq, simplemodal_container, img_transparent = {};

var just_invited = false;
var registro_inicial = false;
var show_twitter = true;

function onReady() {
  facebook_id = $("#ruby-values").data("facebook-id");
  $("#lista_carreras").on('click', muestraLista);
  checkStatus();
  var pause = 50; 
  $(window).resize(function() {
      setTimeout(function() {
          var width = $(window).width();
          
          if (width <= 900) {
            sub_der = {
              display: "inline-block",
              "vertical-align": "top",
              width: "200px",
              height: "206px"
            }
            sub_izq = {
              display: "inline-block",
              "vertical-align": "top",
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
              //opacity: 0.6,
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
              //opacity: 0.6,
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

function checkStatus() {
  if ($("#home-values").data("user").register_complete) {

    if (isTeamComplete()) {
      cambiaLayout();
    }
    else {
      if (!$("#home-values").data("twitter") && !$("#home-values").data("user").never_twitter && show_twitter && !registro_inicial && show_twitter) {
        capturaTwitter(false);
      }
      else if ($("#home-values").data("invites") && !registro_inicial) {
        muestraRequests();
      }
      else if ($("#home-values").data("team") && $("#home-values").data("team").notify_author && $("#home-values").data("team").first_user_id == $("#home-values").data("user").id) {
        muestraConfirmacion();
      }

      setProfile();

      //lógica para amiga
      checkAmiga();
      //lógica para equipo
      checkEquipo();
      // lógica para barrio
      checkBarrio(); 
    } 
    habilitaSecciones(); 
  }
  else {
    registro_inicial = true;
    resetCssProperty("perfil", "background", "url()");
    resetCssProperty("perfil", "background-color", "#2A2A2A");
    capturaPerfil();
  }
}

function isTeamComplete() {
  if ($("#home-values").data("team") && $("#home-values").data("team").name && $("#home-values").data("partner") && $("#home-values").data("user").hood) {
    return true;
  }
  return false;
}

function cambiaLayout() {
  var uno = $("#home-values").data("user");
  var dos = $("#home-values").data("partner");
  var equipo = $("#home-values").data("team");
  $("#contenedor_arriba_derecha").remove();
  $("#perfil").removeClass("s2x2");
  $("#perfil").removeClass("perfil");
  $("#perfil").addClass("s4x2");
  $("#perfil").html("<div class='equipo_div'><div id='lista_carreras' class='lista_carreras'>CARRERAS REGISTRADAS</div><div id='equipo_datos'><div class='equipo_titulo'></div></div></div><div id='perfil_uno' class='perfil s2x2'><div class='menu_text menu_font'><div class='status'></div></div></div><div id='perfil_dos' class='perfil_dos s2x2'><div class='menu_text menu_font'><div class='status'></div></div></div>");
  $(".perfil").css("background", "url('/assets/bg_gradient_perfil.png'), url('http://graph.facebook.com/"+ uno.facebook_id +"/picture?redirect=1&type=square&width=300&height=300')");
  resetCssProperty("perfil", "background-size", "101%, 100%");
  $("#perfil_uno .status").html(uno.first_name.toUpperCase() + " " + uno.last_name.toUpperCase() + "<p class='km_chico'>" + uno.kilometers + " KM <p class='barrio_chico'>" + (typeof uno.hood != 'undefined' ? uno.hood.name.toUpperCase() : ""  ) + "</p>");
  $(".perfil_dos").css("background", "url('/assets/bg_gradient_perfil.png'), url('http://graph.facebook.com/"+ dos.facebook_id +"/picture?redirect=1&type=square&width=300&height=300')");
  resetCssProperty("perfil_dos", "background-size", "101%, 100%");
  $("#perfil_dos .status").html(dos.first_name.toUpperCase() + " " + dos.last_name.toUpperCase() + "<p class='km_chico'>" + dos.kilometers + " KM <p class='barrio_chico'>" + (typeof dos.hood != 'undefined' ? dos.hood.name.toUpperCase() : ""  ) + "</p>");
  $("#equipo_datos .equipo_titulo").html("<p class='equipo_sub'>EQUIPO:</p> <p class='nombre_grande'>" + equipo.name.toUpperCase() + "</p><p class='km_grande'>" + equipo.kilometers + " KM</p>");
  $("#editar").css("display", "inline");
  $("#lista_carreras").on('click', muestraLista);
}

function habilitaSecciones(){

  // habilita retos
  $("#retos").on("click", muestraRetos);
  cambiaCursor($("#retos"), true);
  $(".retos").css("background", "url('/assets/bg_retos_color.jpg')");

  // habilita run_clubs
  $("#run_clubs").on("click", muestraRunClubs);
  cambiaCursor($("#run_clubs"), true);
  $(".run_clubs").css("background", "url('/assets/bg_club_color.jpg')");

  // habilita ranking
  $("#ranking").on("click", muestraRanking);
  cambiaCursor($("#ranking"), true);
  $(".ranking").css("background", "url('/assets/bg_ranking_home_color.jpg')");

}

function checkAmiga() {
  $("#amiga").off("click");
  
  if ($("#home-values").data("team") == null) {
    cambiaCursor($("#amiga"), true);
    $("#amiga").on("click", muestraInvitacion);
    $("#amiga .status").html("SELECCIONA </br> A TU COMPAÑERA")
  }
  else if ($("#home-values").data("invited") == null && $("#home-values").data("partner") == null) {
    cambiaCursor($("#amiga"), true);
    $("#amiga").on("click", muestraInvitacion);
    $("#amiga .status").text("SELECCIONA A TU COMPAÑERA")
    $("#amiga").css("background", "url(assets/bg_escoger.jpg)");
  }
  else if ($("#home-values").data("partner") == null) {
    cambiaCursor($("#amiga"), true);
    $("#amiga").on("click", muestraInvitacion);
    $("#amiga .status").html("ESPERANDO CONFIRMACIÓN <br/> DE TU COMPAÑERA");
    $("#amiga").css("background", "url('assets/bg_gradient_perfil.png'), url('http://graph.facebook.com/"+ $("#home-values").data("invited").invited_user_facebook_id +"/picture?redirect=1&width=400&height=200')");
    $("#amiga").css("background-size", "101%, 100%");
  }
  else if (!isTeamComplete()) {
    cambiaCursor($("#amiga"), false);
    $("#amiga .status").text($("#home-values").data("partner").first_name.toUpperCase() + " " + $("#home-values").data("partner").last_name.toUpperCase());
    $(".amiga").css("background", "url('assets/bg_gradient_perfil.png'), url('http://graph.facebook.com/"+ $("#home-values").data("partner").facebook_id +"/picture?redirect=1&width=400&height=200')");
    $(".amiga").css("background-size", "101%, 100%");
  }
  else {
    cambiaCursor($("#amiga"), false);
  }
}

function checkEquipo() {
  $("#equipo").off("click");
  var team = $("#home-values").data("team");
  if (team) {
    if (team.name) {
      cambiaCursor($("#equipo"), false);
      $("#equipo_text .status").text(team.name.toUpperCase());
      $(".equipo").css("background", "url('/assets/bg_equipo_color.jpg')");
    }
    else {
      cambiaCursor($("#equipo"), true);
      $("#equipo_text .status").html("NOMBRA <br/> TU EQUIPO");
      $("#equipo").on("click", capturaEquipo);
      $(".equipo").css("background", "url('/assets/bg_equipo_color.jpg')");
    }
  }
  else {
    cambiaCursor($("#equipo"), false);
    $("#equipo_text .status").html("NOMBRA <br/> TU EQUIPO");
  }
}

function checkBarrio() {
  $("#barrio").off("click");
  var barrio = $("#home-values").data("user").hood;
  if (barrio) {
    cambiaCursor($("#barrio"), false);
    $("#barrio_text .status").text(barrio.name.toUpperCase());
  }
  else {
    cambiaCursor($("#barrio"), true);
    $("#barrio_text .status").html("ELIGE <br/> TU BARRIO");
    $("#barrio").on("click", capturaBarrio);
  }
}

function muestraLista(){
  var html = "<div id='sub_izq' class='profile_izq responsive_bck'><div class='menu_text menu_font'><div id='status' class='status'></div></div></div><div id='sub_der' class='tus_carreras_der responsive_bck'><p class='carreras_font margin_top_carreras'>*La plataforma tarda máximo dos horas en actualizarse.<br/> Si después de este tiempo tu carrera no aparece, vuelve <br/> a compartirla o escríbenos a nikecorredoresmx@nike.com</p><div id='carreras_lista'></div></div>"; 
  modalDialogue(html, {closeClass: 'closeClass', overlayClose: false, modal: false, opacity: 75, escClose: false});
  $(".profile_izq").css("background", "url('/assets/bg_gradient_perfil.png'), url('http://graph.facebook.com/"+ facebook_id +"/picture?redirect=1&type=square&width=300&height=300')");
  resetCssProperty("profile_izq", "background-size", "101%, 100%");
  $("#status").html($("#home-values").data("user").first_name.toUpperCase() + " " + $("#home-values").data("user").last_name.toUpperCase() + "<p class='km_chico'>" + $("#home-values").data("user").kilometers + " KM</p>");
  if($("#home-values").data("runs").length == 0 ){
    $("#carreras_lista").html("<p class='menu_font_med margin_top_modal'>NO TIENES <br/>CARRERAS REGISTRADAS.</p>");
  }else{
    var html_carreras = "<ul class='ul_carreras'>";
    var all = $("#home-values").data("runs");
    for (var index = 0; index < all.length; index++) {
      
      html_carreras += "<li class='li_carreras'><p class='index_carreras'>"+ (index+1) +".</p> <img class='calendario_carreras' src='assets/tuscarreras_calendario.png'/><p class='fecha_carreras'>" + all[index].date + " </p><img class='kilometros_carreras' src='assets/tuscarreras_runner.png'/><p class='kilometros_carreras'>" + all[index].kilometers + "KM</p> </li>";
    }
    html_carreras += "</ul>";
    $("#carreras_lista").html(html_carreras);
    $("#carreras_lista").mCustomScrollbar();
  }
}

function setProfile() {
  $(".perfil").css("background", "url('/assets/bg_gradient_perfil.png'), url('http://graph.facebook.com/"+ facebook_id +"/picture?redirect=1&type=square&width=300&height=300')");
  resetCssProperty("perfil", "background-size", "101%, 100%");
  $("#perfil .status").html($("#home-values").data("user").first_name.toUpperCase() + " " + $("#home-values").data("user").last_name.toUpperCase() + "<p class='km_chico'>" + $("#home-values").data("user").kilometers + " KM</p>");
}

function capturaPerfil() {
  $.ajax({
    type: "GET",
    url: "/nombre_usuario",
    data_type: "html",
    success: function(data, textStatus, jqXHR) {
      var html = "<div id='sub_izq' class='profile_izq responsive_bck'><div class='menu_text menu_font'><div id='status' class='status'></div></div></div><div id='sub_der' class='profile_der responsive_bck'></div>"; 
      modalDialogue(html, {closeClass: 'dialogueClass', overlayClose: false, modal: false, opacity: 75, escClose: false});
      $(".profile_izq").css("background", "url('/assets/bg_gradient_perfil.png'), url('http://graph.facebook.com/"+ facebook_id +"/picture?redirect=1&type=square&width=300&height=300')");
      resetCssProperty("profile_izq", "background-size", "101%, 100%");
      $("#status").html($("#home-values").data("user").first_name.toUpperCase() + " " + $("#home-values").data("user").last_name.toUpperCase() + "<p class='km_chico'>" + $("#home-values").data("user").kilometers + " KM</p>");
      $("#sub_der").html(data); 
    },
    error: function() {
    } 
  });
}

function capturaTwitter(firstTime) {
  show_twitter = false;
  $.ajax({
    type: "GET",
    url: "/conecta_twitter?first_time=" + firstTime,
    data_type: "html",
    success: function(data, textStatus, jqXHR) {
      if (firstTime) {
        $(".profile_izq").css("background", "url('/assets/bg_gradient_perfil.png'), url('http://graph.facebook.com/"+ facebook_id +"/picture?redirect=1&type=square&width=300&height=300')");
        resetCssProperty("profile_izq", "background-size", "101%, 100%");
        $("#sub_der").html(data);
      }
      else {
        var html = "<div id='sub_izq' class='profile_izq responsive_bck'><div class='menu_text menu_font'><div id='status' class='status'></div></div></div><div id='sub_der' class='profile_der responsive_bck'></div>"; 
        modalDialogue(html, {closeClass: 'closeClass', overlayClose: true, modal: false, opacity: 75, onClose: function(dialog){$.modal.close();checkStatus();} });
        $("#sub_der").html(data);
        $("#cancelar-btn").removeClass("btn_cancelar");
        $("#cancelar-btn").addClass("btn_noconectar");
        $(".profile_izq").css("background", "url('/assets/bg_gradient_perfil.png'), url('http://graph.facebook.com/"+ facebook_id +"/picture?redirect=1&type=square&width=300&height=300')");
        resetCssProperty("profile_izq", "background-size", "101%, 100%");
        $("#status").html($("#home-values").data("user").first_name.toUpperCase() + " " + $("#home-values").data("user").last_name.toUpperCase() + "<p class='km_chico'>" + $("#home-values").data("user").kilometers + " KM</p>");        
      }
    },
    error: function() {
    } 
  });
}

function capturaEquipo(esEdicion) {
  esEdicion = typeof esEdicion !== 'undefined' && esEdicion == true ? esEdicion : false;
  var team = $("#home-values").data("team");
  if ((team != null && team.name == null) || esEdicion) {
    $.ajax({
      type: "GET",
      url: "/nombre_dupla",
      data_type: "html",
      success: function(data, textStatus, jqXHR) {
        console.log(esEdicion);
        if (!esEdicion) {
          var html = "<div id='sub_izq' class='equipo_izq responsive_bck'></div><div id='sub_der' class='equipo_der responsive_bck'></div>"; 
          modalDialogue(html);
        }
        else {
          $("#sub_der").addClass("equipo_der");
        }
        $("#sub_der").html(data); 
      },
      error: function() {
      } 
    });
  }
}

function capturaBarrio(esEdicion) {
  esEdicion = typeof esEdicion !== 'undefined' && esEdicion == true ? esEdicion : false;
  if ($("#home-values").data("user").hood == null || esEdicion) {
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
        if (!esEdicion) {
          var html = "<div id='sub_izq' class='barrio_izq responsive_bck'></div><div id='sub_der' class='barrio_der responsive_bck'></div>"; 
          modalDialogue(html, null);
        }
        else {
          $("#sub_der").addClass("barrio_der");
        }
        $("#sub_der").html(data);
        $("#hood-name-txt").autocomplete({source: hoods});
      },
      error: function() {
      } 
    });
  }
}

function muestraRequests() {
  $.ajax({
    type: "GET",
    url: "/invitaciones_pendientes",
    data_type: "html",
    success: function(data, textStatus, jqXHR) {
      var html = "<div id='sub_izq' class='profile_izq responsive_bck'><div class='menu_text menu_font'><div id='status' class='status'></div></div></div><div id='sub_der' class='barrio_der responsive_bck'></div>"; 
      modalInvites(html);
      $("#status").html($("#home-values").data("user").first_name.toUpperCase() + " " + $("#home-values").data("user").last_name.toUpperCase() + "<p class='km_chico'>" + $("#home-values").data("user").kilometers + " KM</p>");
      $(".profile_izq").css("background", "url('/assets/bg_gradient_perfil.png'), url('http://graph.facebook.com/"+ facebook_id +"/picture?redirect=1&type=square&width=300&height=300')");
      resetCssProperty("profile_izq", "background-size", "101%, 100%");
      $("#sub_der").html(data);
    },
    error: function() {
    } 
  });
}

function muestraConfirmacion() {
  var partner = $("#home-values").data("partner");
  var html = "<div id='sub_izq' class='profile_izq responsive_bck'></div><div id='sub_der' class='amiga_der responsive_bck'><div class='modal_input'><div class='img_modal_amiga'></div><div class='modal_text_no_margin' style='margin: 20px 0;'></div><div id='confirmacion_texto' class='modal_text_no_margin centered'></div></div></div>"; 
  modalDialogue(html);
  $(".profile_izq").css("background", "url('/assets/bg_gradient_perfil.png'), url('http://graph.facebook.com/"+ facebook_id +"/picture?redirect=1&type=square&width=300&height=300')");
  resetCssProperty("profile_izq", "background-size", "101%, 100%");
  $(".img_modal_amiga").css({background: "url('/assets/bg_gradient_perfil.png'), url('http://graph.facebook.com/"+  partner.facebook_id +"/picture?redirect=1&width=150&height=150')", "background-size": "101%, 100%", margin: "auto" });
  $("#sub_der .modal_text_no_margin").text(partner.first_name.toUpperCase() + " " + partner.last_name.toUpperCase());
  $("#sub_der #confirmacion_texto").html("ACEPTÓ TU INVITACIÓN A CORRER JUNTAS ESTE AÑO.<br/> DECIDAN CON QUÉ RETO QUIEREN EMPEZAR <br/> Y CORRAN HASTA LLEGAR AL PRIMER SITIO DEL RANKING.");
  $.ajax({
    type: "GET",
    url: "/teams/" + $("#home-values").data("team").id + "/notified",
    success: function(data, textStatus, jqXHR) {
    },
    error: function() {
    } 
  });
}

function muestraInvitacion() {
  if ($("#home-values").data("invited") == null) {
    invitar();  
  }
  else {
    $.ajax({
      type: "GET",
      url: "/invitar_amiga",
      data_type: "html",
      success: function(data, textStatus, jqXHR) {
        var html = "<div id='sub_izq' class='amiga_izq responsive_bck'></div><div id='sub_der' class='amiga_der responsive_bck'><div class='img_modal_amiga'></div></div>"; 
        modalDialogue(html);
        $("#sub_der").html(data);
        if (just_invited) {
          just_invited = false;
          $("#cancelar-btn").css("display", "none");
        }
        else {
          $("#invitacion_texto").css("display", "none");
        }

        $(".img_modal_amiga").css({background: "url('/assets/bg_gradient_perfil.png'), url('http://graph.facebook.com/"+ $("#home-values").data("invited").invited_user_facebook_id +"/picture?redirect=1&width=150&height=150')", "background-size": "101%, 100%", margin: "auto" });
        $("#amiga_invitada").text($("#home-values").data("invited").invited_user_name.toUpperCase().substr(0,18));
      },
      error: function() {
      } 
    });
  }
}

function muestraRanking() {
  window.location.href = "/home_ranking"; 
}

function muestraRunClubs() {
  window.location.href = "/run_clubs"; 
}

function muestraRetos() {
  //var html = "<div id='sub_izq' class='retos_izq responsive_bck'></div><div id='sub_der' class='retos_der responsive_bck centered'><p class='menu_font margin_top_modal_retos'>PRONTO CONOCERÁS <br/> LOS RETOS A VENCER <br/> PARA CONQUISTAR EL RANKING.</p><br/></div>"; 
  //modalDialogue(html);
  window.location.href = "/retos"; 
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
    $.ajax({
      type: "PUT",
      data: user,
      url: "/users/" + $("#home-values").data("user").id + ".json",
      success: function(data, textStatus, jqXHR) {
        capturaTwitter(true);
        // Pone background de perfil
        resetCssProperty("perfil", "background-color", "");
        resetCssProperty("perfil", "background", "url('/assets/bg_gradient_perfil.png'), url('http://graph.facebook.com/"+ facebook_id +"/picture?redirect=1&type=square&width=300&height=300')");
        resetCssProperty("perfil", "background-size", "101%, 100%");
        reloadInfo();
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
        reloadInfo();
      },
      error: function() {
      } 
    });
  }
}

function registrarBarrio() {
  var all = $("#hood-values").data("hoods");
  var barrioN = $("#hood-name-txt").val();
  var result = $.grep(all, function(n,i) {return n.name == barrioN;});

  if (result.length == 1) {
    var user = {
      "user": {
        "hood_id": result[0].id
      }
    };
    $.ajax({
      type: "PUT",
      data: user,
      url: "/users/" + $("#home-values").data("user").id + ".json",
      success: function(data, textStatus, jqXHR) {
        $.modal.close();
        reloadInfo();
        //poner el barrio en el contenedor
      },
      error: function() {
      } 
    });
  }
}

function reloadInfo() {
  $.ajax({
    type: "GET",
    url: "/home?reload=true",
    data_type: "html",
    success: function(data, textStatus, jqXHR) {
      $.each($(data).prop("attributes"), function() {
        $("#home-values").attr(this.name, this.value);
      });
      $.each($(data).data(), function(name, value) {
        $("#home-values").data(name, value);
      });
      if (just_invited) {
        muestraInvitacion();
      }
      checkStatus();
    },
    error: function() {
    } 
  });
}

function invitar() {
  var excluir = [];
  $.ajax({
    type: "GET",
    url: "/exclude_users",
    success: function(data, textStatus, jqXHR) {
      excluir = data;
      FB.api({
        method: 'fql.query',
        query: 'SELECT uid FROM user WHERE sex = "male" AND uid in (SELECT uid2 FROM friend WHERE uid1 = me())'
      }, function(response) {
        for (var index = 0; index < response.length; index++) {
          excluir.push(response[index].uid);
        }
        FB.ui({method: 'apprequests',
          message: 'Tu amiga ' + $("#home-values").data("user").first_name + ' ' + $("#home-values").data("user").last_name +' te ha seleccionado para que corran en Juntas Corremos de Nike',
          max_recipients: '1',
          exclude_ids: excluir
        }, guardarInvitacion);
      });
    },
    error: function() {
    } 
  });
}

function guardarInvitacion(invite_response) {
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
          if(textStatus == "success") {
            just_invited = true;
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
      reloadInfo();
    },
    error: function() {
    } 
  });
}

function aceptarInvitacion(value) {
  $.ajax({
    type: "GET",
    url: "/invites/" + value.id + "/accept",
    success: function(data, textStatus, jqXHR) {
      $.modal.close();
      reloadInfo();
    },
    error: function() {
    } 
  });
}

function cancelarInvitacion() {
  var invite_id = $("#home-values").data("invited").id;
  $.ajax({
    type: "GET",
    url: "/invites/" + invite_id + "/cancel",
    success: function(data, textStatus, jqXHR) {
      $.modal.close();
      reloadInfo();
    },
    error: function() {
    } 
  }); 
}

function cancelarTwitter(firstTime) {
  if (firstTime) {
    registro_inicial = false;
    checkStatus();
  }
  else {
    var user = {
      "user": {
        "never_twitter": true
      }
    };
    $.ajax({
      type: "PUT",
      data: user,
      url: "/users/" + $("#home-values").data("user").id + ".json",
      success: function(data, textStatus, jqXHR) {
      },
      error: function() {
      } 
    });
  }
  $.modal.close();
}

function muestraNombre(value, element) {
  if (value) {
    $($($(element).children()[0]).children()[0]).css("display", "block");
  }
  else {
    $($($(element).children()[0]).children()[0]).css("display", "none");
  }
}

function editarRegistro() {
  $.ajax({
    type: "GET",
    url: "/editar_registro",
    data_type: "html",
    success: function(data, textStatus, jqXHR) {
      var html = "<div id='sub_izq' class='profile_izq responsive_bck'><div class='menu_text menu_font'><div id='status' class='status'></div></div></div><div id='sub_der' class='responsive_bck'></div>";
      modalDialogue(html);
      $("#sub_der").html(data);

      $(".profile_izq").css("background", "url('/assets/bg_gradient_perfil.png'), url('http://graph.facebook.com/"+ facebook_id +"/picture?redirect=1&type=square&width=300&height=300')");
      resetCssProperty("profile_izq", "background-size", "101%, 100%");
      $("#sub_izq #status").html($("#home-values").data("user").first_name.toUpperCase() + " " + $("#home-values").data("user").last_name.toUpperCase() + "<p class='km_chico'>" + $("#home-values").data("user").kilometers + " KM</p>");

      if ($("#home-values").data("partner")) {
        $("#sub_der #amiga .status").html("TU COMPAÑERA ES: <br/> " + $("#home-values").data("partner").first_name.toUpperCase() + " " + $("#home-values").data("partner").last_name.toUpperCase());
        $("#sub_der .amiga").css("background", "url('assets/bg_gradient_perfil.png'), url('http://graph.facebook.com/"+ $("#home-values").data("partner").facebook_id +"/picture?redirect=1&width=400&height=200')");
        $("#sub_der .amiga").css("background-size", "101%, 100%");
      }

      if ($("#home-values").data("team") && $("#home-values").data("team").name) {
        $("#sub_der #equipo_text .boton_mod_der").html("<div class='cursor_pointer btn_cambiar_nombre' onclick='capturaEquipo(true)'></div>");
        $("#sub_der #equipo_text .status").html($("#home-values").data("team").name.toUpperCase());
        $(".equipo").css("background", "url('/assets/bg_equipo_color.jpg')");
      }
      
      if ($("#home-values").data("user").hood) {
        $("#sub_der #barrio_text .boton_mod_izq").html("<div class='cursor_pointer btn_cambiar_barrio' onclick='capturaBarrio(true)'></div>");
        $("#sub_der #barrio_text .status").html($("#home-values").data("user").hood.name.toUpperCase());
      }
      else {

      }

    },
    error: function() {
    } 
  });
}
