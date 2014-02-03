$(document).on("ready", init);

function init(){

  $(".shares").mouseenter( function() {
    $( ".subsesion" ).show();
  } ).mouseleave(function(){
    $( ".subsesion" ).hide();
  });
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

function modalInvites(title, message, usersHash, options){
  
  if (options == null) {
    options = {};    
  }
  options["closeClass"] = "dialogueClass";
  options["minHeight"] = 300;
  options["minWidth"] = 400;

  $("#modal-title")[0].innerHTML = title;
  $("#modal-content")[0].innerHTML = message;
  $("#modal-content").append("<br/><br/>");
  $.each(usersHash, function(value, key){
    // ADDING USER REQUESTS
    $("#modal-content").append("<div id='"+value+"'>"+key+"</div>");
    $("#"+value).append("<a href='#' onclick='acceptRequest("+value+")'>aceptar invitación</a>");
  });
  $("#modal-alert").css("height", "300px");
  $("#modal-alert").modal(options);
  $("#modal-alert").mCustomScrollbar();
  $(".simplemodal-wrap").css("overflow","");
}

function resetCssProperty(css_class, property, value) {
  $("." + css_class).css(property, value);
}
