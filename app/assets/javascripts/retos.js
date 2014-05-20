$(document).on("ready", onReady);

var sub_der, sub_izq, simplemodal_container = {};

function onReady() {
  // Habilita social run
  cambiaCursor($("#social_run"), true);
  $("#social_run").on("click", muestraSocialRun);
  // Habilita wake up
  cambiaCursor($("#wake_up"), true);
  $("#wake_up").on("click", muestraWakeUp);
  cambiaCursor($("#city_truck"), true);
  $("#city_truck").on("click", muestraCityTruck);
  cambiaCursor($("#d10k"), true);
  $("#d10k").on("click", muestraD10K);
  cambiaCursor($("#run_music"), true);
  $("#run_music").on("click", muestraRunMusic);
  cambiaCursor($("#rewards_badge"), true);
  $("#rewards_badge").on("click", muestraRewardsBadge);

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

function muestraRunMusic(){
  var img =  $(".run_music").length > 0 ? '/assets/reto_music.png' : '/assets/reto_music_completed.png';
  var html = "<div id='sub_izq' class='retos_izq responsive_bck'><p class='menu_font margin_top_modal_music'>TU MÚSICA TE HARÁ LLEGAR <br/> MÁS LEJOS.</p><p class='sub_head_music' >LAS PRIMERAS 5 DUPLAS QUE SUMEN 60 KM<br/>ENTRE EL LUNES 31 DE MARZO Y<br/>EL SÁBADO 5 DE ABRIL GANARÁN<br/>UNA CUENTA PREMIUM SPOTIFY<br/>VÁLIDA POR 3 MESES.<br/>NO OLVIDES COMPARTIR TUS CARRERAS<br/>DE NIKE+ A TUS REDES.<br/>INFORMAREMOS A LAS DUPLAS GANADORAS<br/>POR MAIL EL LUNES 7 DE ABRIL.<br/>RECUERDA REVISAR EN TU CORREO <br/>NO DESEADO.</p></div><div id='sub_der' class='retos_der responsive_bck centered overflow_hidden'><img src='" +  img + "' class='modal_reto' /></div>"; 
  modalDialogue(html);
}

function muestraWakeUp(){
  var img =  $(".wake_up").length > 0 ? '/assets/reto4.png' : '/assets/reto4_completed.png';
  var html = "<div id='sub_izq' class='retos_izq responsive_bck'><p class='menu_font margin_top_modal_retos'>DESPERTAR TEMPRANO ES <br/> AVANZAR PRIMERO. <br/> ELIJAN UN DÍA Y CORRAN LAS <br/> DOS ANTES DE LAS 7 AM.</p></div><div id='sub_der' class='retos_der responsive_bck centered overflow_hidden'><img src='" +  img + "' class='modal_reto' /></div>"; 
  modalDialogue(html);
}

function muestraD10K(){
  var img =  $(".d10k").length > 0 ? '/assets/reto5.png' : '/assets/reto5_completed.png';
  var html = "<div id='sub_izq' class='retos_izq responsive_bck'><p class='menu_font margin_top_modal_retos'>¿CUÁNTOS ENTRENAMIENTOS <br/> DE 10K PUEDES HACER<br/> ESTA SEMANA?</p></div><div id='sub_der' class='retos_der responsive_bck centered overflow_hidden'><img src='" +  img + "' class='modal_reto' /></div>"; 
  modalDialogue(html);
}

function muestraCityTruck(){
  var img =  $(".city_truck").length > 0 ? '/assets/reto_truck.png' : '/assets/reto_truck_completed.png';
  var html = "<div id='sub_izq' class='retos_izq responsive_bck'><p class='menu_font margin_top_modal_retos'><br/><br/>ESTA ACTIVIDAD <br/>HA FINALIZADO.</p></div><div id='sub_der' class='retos_der responsive_bck centered overflow_hidden'><img src='" +  img + "' class='modal_reto' /></div>"; 
  modalDialogue(html);
}

function muestraRewardsBadge(){
  var img =  $(".rewards_badge").length > 0 ? '/assets/rewards_badge.png' : '/assets/rewards_badge_completed.png';
  var html = "<div id='sub_izq' class='retos_izq responsive_bck'><p class='sub_head_music' >ESTAMOS EN LA RECTA FINAL, DEMUESTREN QUE PUEDEN<br/>CONQUISTAR EL RANKING SUMANDO LOS ÚLTIMOS KILÓMETROS.<br/>CORRAN EN CONJUNTO EN LOS PRÓXIMOS 6 DÍAS,<br/>LAS 200 DUPLAS QUE REGISTREN MÁS KILÓMETROS EN ESTOS<br/>DÍAS SERÁN ACREEDORAS DE UN ARTÍCULO CONMEMORATIVO DE<br/>LA CAMPAÑA \"JUNTAS CORREMOS\".<br/><br/>DURACIÓN:<br/>MARTES 20 DE MAYO A LAS 00:01 AL DOMINGO<br/>25 DE MAYO A LAS 11:59PM. (6 DÍAS).<br/>SE ENVIARÁ UN MAIL A LAS GANADORAS DE ESTE RETO PARA<br/>QUE VAYAN A RECOGER SU PULSERA.</p><div class='pulsera'><img src='/assets/bagde_pulseras.png' /></div></div><div id='sub_der' class='retos_der responsive_bck centered overflow_hidden'><img src='" +  img + "' class='modal_reto' /></div>"; 
  modalDialogue(html);
}
