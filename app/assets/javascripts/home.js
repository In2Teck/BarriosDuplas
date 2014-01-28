$(document).on("ready", onReady);
var facebook_id;

var sub_der, sub_izq, simplemodal_container, img_transparent, profile_izq, profile_der = {};

function onReady() {
  facebook_id = $("#ruby-values").data("facebook-id");
  $("#perfil").on("click", capturaPerfil);
  $("#equipo").on("click", capturaEquipo);
  $("#barrio").on("click", capturaBarrio);
  $("#ranking").on("click", muestraRanking);
  $("#run_clubs").on("click", muestraRunClubs);
  $("#retos").on("click", muestraRetos);
  $("#amiga").on("click", interaccionAmiga);

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
              opacity: 0.5,
              width: "200px",
              height: "206px",
              display: "block",
              margin: "1px auto auto auto"
            }
            profile_izq = {
              margin: "0 -2px 0 0",
              background: "url('/assets/bg_gradient_perfil.png')",
              "background-size": "200px 206px"
            }
            profile_der = {
              background: "url('/assets/bg_modal_perfil.png')",
              margin: "0 0 0 -2px",
              "background-size": "200px 206px"
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
              opacity: 0.5,
              width: "400px",
              height: "410px",
              display: "block",
              margin: "1px auto auto auto"
            }
            profile_izq = {
              margin: "0 -2px 0 0",
              background: "url('/assets/bg_gradient_perfil.png')",
              "background-size": "400px 412px"
            }
            profile_der = {
              background: "url('/assets/bg_modal_perfil.png')",
              margin: "0 0 0 -2px",
              "background-size": "400px 412px"
            }
          }

          $("#simplemodal-container").css(simplemodal_container);
          $("#sub_der").css(sub_der);
          $("#sub_izq").css(sub_izq);
          $(".profile_der").css(profile_der);
          $(".profile_izq").css(profile_izq);
          $(".img_transparent").css(img_transparent);

      }, pause);
  });

  $(window).resize();
}

function capturaPerfil(){
  var html = "<div id='sub_izq' class='profile_izq'> <img src='http://graph.facebook.com/"+ facebook_id +"/picture?redirect=1&type=square&width=300&height=300' class='img_transparent'/> </div> <div id='sub_der' class='profile_der'></div>"; 
  modalDialogue(html, null);
}

function capturaEquipo(){
  var html = "<div id='sub_izq' class='equipo_izq'> </div><div id='sub_der' class='equipo_der'></div>"; 
  modalDialogue(html, null);
}

function capturaBarrio(){
  var html = "<div id='sub_izq' class='barrio_izq'> </div><div id='sub_der' class='barrio_der'></div>"; 
  modalDialogue(html, null);
}

function interaccionAmiga(){
  var html = "<div id='sub_izq' class='amiga_izq'> </div><div id='sub_der' class='amiga_der'></div>"; 
  modalDialogue(html, null);
}

function muestraRanking(){

}

function muestraRunClubs(){
  var html = "<div id='sub_izq' class='run_club_izq'> </div><div id='sub_der' class='run_club_der'></div>"; 
  modalDialogue(html, null);
}

function muestraRetos(){
  var html = "<div id='sub_izq' class='retos_izq'> </div><div id='sub_der' class='retos_der'></div>"; 
  modalDialogue(html, null);
}
