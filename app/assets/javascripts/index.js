$(document).on("ready", onReady);

var simplemodal, solo_mujeres, btn_descargar, lead_text, closeImg = {};
var closeImg_hover, closeImg_no_hover = "";

function onReady(){
  if (getParameterByName("solo_mujeres")) {

    var html = "<div id='solo_mujeres_container'><p class='lead_text'>ESTE DESAFÍO ES SÓLO PARA MUJERES. <br/> PERO AÚN PUEDES PONERTE A PRUEBA <br/> CON LOS RETOS DE NIKE+.</p><a href='https://itunes.apple.com/mx/app/nike+-running/id387771637?mt=8'' class='btn-descargar' target='_blank'></a></div>"; 
    modalAlert(html, null);

  } 

  var pause = 50; 
  $(window).resize(function() {
      setTimeout(function() {
          var width = $(window).width();
          
          if (width <= 900) {
            simplemodal = { height: "242px", width: "250px", margin: "auto" };  
            solo_mujeres = { width: "242px", height: "250px", background: "url('/assets/bg_popup_home.png')", "padding-top": "55%", "text-align": "center",  "background-size": "242px 250px" };
            btn_descargar = { "background-image": "url('/assets/boton_descargar.png')", width: "80px", height: "46px", "letter-spacing": "82px", "background-repeat": "no-repeat", padding: "4px", display: "inline-block", "background-size": "100%"};
            closeImg = {background:"url('/assets/boton_cerrar.png') no-repeat", width: "40px", height: "41px", "z-index": 3200, position: "absolute", "top": "0px", "right": "-31px", cursor: "pointer", "background-position": "-5px -2px"};
            closeImg_hover = "-5px -70px";
            closeImg_no_hover = "-5px -2px";
            lead_text = { "font-family":"'FuturaStd-MediumCondensed',Sans-Serif", "font-size": "15px", "line-height": "1 !important", color: "white", margin: "0px 0 20px"};
          
          } else {
            simplemodal = { height: "472px", width: "488px", margin: 0 };  
            solo_mujeres = { width: "472px", height: "488px", background: "url('/assets/bg_popup_home.png')", "padding-top": "65%", "text-align": "center", "background-size": "472px 488px"};
            btn_descargar = { "background-image": "url('/assets/boton_descargar.png')", width: "110px", height: "69px", "letter-spacing": "82px", "background-repeat": "no-repeat", padding: "4px", display: "inline-block", "background-size": "100%"};
            closeImg = {background:"url('/assets/boton_cerrar.png') no-repeat", width: "49px", height: "50px", "z-index": 3200, position: "absolute", "top": "0px", "right": "-32px", cursor: "pointer", "background-position": "0% 0%"};
            closeImg_hover = "0px -68px";
            closeImg_no_hover = "0px 0px";
            lead_text = { "font-family":"'FuturaStd-MediumCondensed',Sans-Serif", "font-size": "20px", "line-height": "1.2 !important", color: "white", margin: "0px 0 20px"};
          }
          
          $("#simplemodal-container").css(simplemodal);
          $("#solo_mujeres_container").css(solo_mujeres);
          $(".btn-descargar").css(btn_descargar);
          $("#simplemodal-container a.modalCloseImg").css(closeImg);
          $("#simplemodal-container a.modalCloseImg").hover(function(){
            $("#simplemodal-container a.modalCloseImg").css("background-position", closeImg_hover);
          }, function(){
            $("#simplemodal-container a.modalCloseImg").css("background-position", closeImg_no_hover);
          });
          $(".lead_text").css(lead_text);
          }, pause);
      });
  
  $(window).resize();
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
