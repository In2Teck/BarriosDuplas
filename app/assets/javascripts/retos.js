$(document).on("ready", onReady);

var sub_der, sub_izq, simplemodal_container = {};

function onReady() {
  // Habilita social run
  cambiaCursor($("#social_run"), true);
  $("#social_run").on("click", muestraSocialRun);

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
            if( width <= 480 ) {
              simplemodal_container = {
                height: "412px",
                width: "200px",
                padding: 0,
                margin: "40px auto auto auto"
              }
            }
          }else{
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
          }
          $("#simplemodal-container").css(simplemodal_container);
          $("#sub_der").css(sub_der);
          $("#sub_izq").css(sub_izq);
      }, pause);
  });
  $(window).resize();
}

function muestraSocialRun(){
  var img =  $(".social_run").length > 0 ? '/assets/reto1.png' : '/assets/reto1_completed.png';
  var html = "<div id='sub_izq' class='retos_izq responsive_bck'><p class='menu_font margin_top_modal_retos'>VALE MÁS UNA CARRERA <br/> ENTRE AMIGAS QUE UN <br/> CAFÉ POR LA TARDE. <br/> CORRAN JUNTAS 6KM <br/> ENTRE 6 Y 8 PM.</p></div><div id='sub_der' class='retos_der responsive_bck centered overflow_hidden'><img src='" +  img + "' class='modal_reto' /></div>"; 
  modalDialogue(html);
}
