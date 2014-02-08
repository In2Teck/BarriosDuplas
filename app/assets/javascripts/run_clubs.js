$(document).on("ready", onReady);

var simplemodal, runs_container, closeImg, text = {};
var closeImg_hover, closeImg_no_hover = "";

function onReady(){
  cambiaCursor($("#gdl"), true);
  $("#gdl").on("click", muestraGdl);

  cambiaCursor($("#df"), true);
  $("#df").on("click", muestraDf);

  cambiaCursor($("#mty"), true);
  $("#mty").on("click", muestraMty);

  cambiaCursor($("#puebla"), true);
  $("#puebla").on("click", muestraPuebla);
  
  var pause = 50; 
  $(window).resize(function() {
      setTimeout(function() {
          var width = $(window).width();
          
          if (width <= 900) {
            simplemodal = { height: "242px", width: "250px", margin: "auto" };  
            runs_container = { width: "242px", height: "250px", padding: "1%" };
            closeImg = {background:"url('/assets/boton_cerrar.png') no-repeat", width: "40px", height: "41px", "z-index": 3200, position: "absolute", "top": "0px", "right": "-31px", cursor: "pointer", "background-position": "-5px -2px"};
            closeImg_hover = "-5px -70px";
            closeImg_no_hover = "-5px -2px";
            text = { "font-family":"'FuturaStd-MediumCondensed',Sans-Serif", "font-size": "13px", "line-height": "1 !important", color: "white", margin: "0px 0 20px"};

          } else {
            simplemodal = { height: "472px", width: "488px", margin: 0 };  
            runs_container = { width: "472px", height: "488px", padding: "8%" };
            closeImg = {background:"url('/assets/boton_cerrar.png') no-repeat", width: "49px", height: "50px", "z-index": 3200, position: "absolute", "top": "0px", "right": "-32px", cursor: "pointer", "background-position": "0% 0%"};
            closeImg_hover = "0px -68px";
            closeImg_no_hover = "0px 0px";
            text = { "font-family":"'FuturaStd-MediumCondensed',Sans-Serif", "font-size": "18px", "line-height": "1.2 !important", color: "white", margin: "0px 0 20px"};
          }
          $("#simplemodal-container").css(simplemodal);
          $("#runs_container").css(runs_container);
          $("#simplemodal-container a.modalCloseImg").css(closeImg);
          $("#simplemodal-container a.modalCloseImg").hover(function(){
            $("#simplemodal-container a.modalCloseImg").css("background-position", closeImg_hover);
          }, function(){
            $("#simplemodal-container a.modalCloseImg").css("background-position", closeImg_no_hover);
          });
          $(".text").css(text);

      }, pause);

  });

  $(window).resize();
}

function muestraGdl(){
  var html = "<div id='runs_container' class='df_pop'><p class='text'>"+
    "<u>LOMAS DE PROVIDENCIA</u> <br/>"+
    "Días: Miércoles<br/>"+
    "Horario: 19:00 - 21:00 hrs<br/>"+
    "Punto de Reunión: Tienda Jog & Run, Ruben Darío<br/>"+
    "1011, 44647. Guadalajara.<br/><br/>"+
    "<u>GALERÍAS</u><br/>"+
    "Días: Sábado<br/>"+
    "Horario: 8:00 - 10:00 hrs<br/>"+
    "Punto de Reunión: Tienda Nike, Plaza Galerias<br/>"+
    "Rafael Sanzio, Camichines Vallarta, Zapopan, JAL.<br/><br/>"+
   "</p></div>"; 
  modalRun(html);
}

function muestraDf(){
    var html = "<div id='runs_container' class='df_pop'><p class='text'>"+
    "<u>SOPE</u> <br/>"+
    "Días: Miércoles<br/>"+
    "Horario: 19:30 hrs - 21:00 hrs<br/>"+
    "Punto de Reunión: Pista el Sope S/N Segunda sección<br/>"+
    "del Bosque de Chapultepec (A un costado de la <br/>"+
    "fuente las Ninfas), Del. Miguel Hidalgo.<br/><br/>"+
    "<u>VIVEROS DE COYOACÁN</u><br/>"+
    "Días: Sábado<br/>"+
    "Horario: 08:00 - 10:00 hrs<br/>"+
    "Punto de Reunión: Calle Guillermo Pérez<br/>"+
    "Valenzuela, Puerta 5.<br/><br/>"+
    "<u>REFORMA 222</u><br/>"+
    "Días: Domingos<br/>"+
    "Horario: 08:00 - 10:00 hrs<br/>"+
    "Punto de Reunión: Tienda Nike, Plaza Reforma 222,<br/>"+
    "Cuauhtémoc, 06600.<br/>"+
   "</p></div>"; 
  modalRun(html);
}

function muestraMty(){
  var html = "<div id='runs_container' class='df_pop'><p class='text'>"+
    "<u>PARQUE FUNDIDORA</u> <br/>"+
    "Días: Martes<br/>"+
    "Horario: 19:00 - 21:00 hrs<br/>"+
    "Punto de Reunión: Avenida Fundidora y Adolfo<br/>"+
    "Prieto S/N, Obrera, 64010. Nuevo León.<br/><br/>"+
    "<u>SAN PEDRO</u><br/>"+
    "Días: Jueves<br/>"+
    "Horario:	19:00 - 21:00 hrs<br/>"+
    "Punto de Reunión: Tienda Nike, Paseo San Pedro José<br/>"+
    "Vasconcelos, Del Valle, San Pedro Garza.<br/><br/>"+
   "</p></div>"; 
  modalRun(html);
}

function muestraPuebla(){
  var html = "<div id='runs_container' class='df_pop'><p class='text'>"+
    "<u>PARQUE DEL ARTE</u> <br/>"+
    "Días: Martes<br/>"+
    "Horario:	19:00 - 21:00 hrs<br/>"+
    "Punto de Reunión: Cumulo de Virgo S/N, viniendo<br/>"+
    "de calle 11 a la Av. Atlixcoyoatl Segunda sección<br/>"+
    "del parque Metropolitano.<br/><br/>"+
    "<u>PARQUE DEL ARTE</u> <br/>"+
    "Días: Jueves<br/>"+
    "Horario:	19:00 - 21:00 hrs<br/>"+
    "Punto de Reunión: Cumulo de Virgo S/N, viniendo<br/>"+
    "de calle 11 a la Av. Atlixcoyoatl Segunda sección<br/>"+
    "del parque Metropolitano.<br/><br/>"+
   "</p></div>"; 
  modalRun(html);
}
