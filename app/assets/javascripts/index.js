$(document).on("ready", onReady);

function onReady(){
  // TODO: habilitar
  if (!getParameterByName("solo_mujeres")) {

    var html = "<div id='solo_mujeres_container'><p class='lead_text'>ESTE DESAFÍO ES SÓLO PARA MUJERES. <br/> PERO AÚN PUEDES PONERTE A PRUEBA <br/> CON LOS RETOS DE NIKE+.</p><a href='https://itunes.apple.com/mx/app/nike+-running/id387771637?mt=8'' class='btn-descargar' target='_blank'></a></div>"; 
    modalAlert(html, null);

  } 
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
