$(document).on("ready", init);

function init(){

  $( ".subsesion" ).hide();
  $( ".editar" ).hide();

  $(".shares").mouseenter( function() {
    $( ".subsesion" ).show();
    $( ".editar" ).show();
  } ).mouseleave(function(){
    $( ".subsesion" ).hide();
    $( ".editar" ).hide();
  });

  $("#mission").on("click", muestraMission);
}

function muestraMission(){
  var html = "<div id='sub_izq' class='retos_izq responsive_bck'><p class='mission_header mission_margin'>¡SU MOVIMIENTO<br/> TIENE RECOMPENSA!</p><br/><p class='mission_font'>SUMEN LA MAYOR CANTIDAD DE KM<br/>Y SEAN PARTE DE LA PRIMERA MISIÓN<br/>DE #JUNTASCORREMOS.<br/>LAS PRIMERAS 200 DUPLAS EN EL<br/>RANKING SERÁN LAS GANADORAS.</p><br/><p class='mission_footer mission_margin_footer'>*EL CONTEO DE KMS SE CERRARÁ MIÉRCOLES 26.02.14 A LAS 11:59PM.<br/>LA MISIÓN SE LLEVARÁ A CABO EN LA CIUDAD DE MÉXICO.</p></div><div id='sub_der' class='retos_der responsive_bck centered overflow_hidden'><img src='/assets/mission.png' class='modal_reto' /></div>";
  modalDialogue(html);
}

function modalAlert(html, options){

 if (options == null) {
    options = {
      closeClass: 'closeClass',
      overlayClose: true,
      modal: false,
      opacity: 75 
    };
  }

  options["closeClass"] = "closeClass";

  $("#modal-content").remove();
  $("#modal-alert").append("<div id='modal-content'></div>");
  $("#modal-content").append(html);
  $("#modal-alert").modal(options);
  $(".simplemodal-wrap").css("overflow","hidden");
  $(".simplemodal-overlay").css("width","100%");
  $(".simplemodal-overlay").css("height","100%");
}

function modalDialogue(html, options){

  if (options == null) {
    options = {
      closeClass: 'closeClass',
      overlayClose: true,
      modal: false,
      opacity: 75 
    };
  } 

  $("#modal-content").remove();
  $("#modal-alert").append("<div id='modal-content'></div>");
  $("#modal-content").append(html);
  $("#modal-alert").modal(options);
  $(".simplemodal-wrap").css("overflow","hidden");
  $(".simplemodal-overlay").css("width","100%");
  $(".simplemodal-overlay").css("height","100%");
}

function modalRun(html, options){

  if (options == null) {
    options = {
      closeClass: 'closeClass',
      overlayClose: true,
      modal: false,
      opacity: 75 
    };
  } 

  $("#modal-content").remove();
  $("#modal-alert").append("<div id='modal-content'></div>");
  $("#modal-content").append(html);
  $("#modal-alert").modal(options);
  $(".simplemodal-wrap").css("overflow","hidden");
  $(".simplemodal-overlay").css("width","100%");
  $(".simplemodal-overlay").css("height","100%");
}

function modalRanking(html){

  options = {
    closeClass: 'closeClass',
    overlayClose: true,
    modal: false,
    opacity: 80
  };    

  $("#modal-content").remove();
  $("#modal-alert").append("<div id='modal-content'></div>");
  $("#modal-content").append(html);
  $("#modal-alert").modal(options);
}

function modalInvites(html, options){
  
  if (options == null) {
    options = {
      closeClass: 'closeClass',
      overlayClose: true,
      modal: false,
      opacity: 75 
    };
  }

  $("#modal-content").remove();
  $("#modal-alert").append("<div id='modal-content'></div>");
  $("#modal-content").append(html);
  $("#modal-alert").modal(options);
  $(".simplemodal-wrap").css("overflow","");
  $(".simplemodal-overlay").css("width","100%");
  $(".simplemodal-overlay").css("height","100%");
  setTimeout(function(){
    $(".invites-div").mCustomScrollbar();
  }, 5);
}

function resetCssProperty(css_class, property, value) {
  $("." + css_class).css(property, value);
}

function cambiaCursor(element, isClickable) {
  if (isClickable) {
    $(element).removeClass("cursor_default");
    $(element).addClass("cursor_pointer");
  }
  else {
   $(element).removeClass("cursor_pointer");
    $(element).addClass("cursor_default"); 
  }
}
