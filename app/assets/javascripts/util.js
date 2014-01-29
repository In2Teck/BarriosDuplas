$(document).on("ready", init);

function init(){

  $(".shares").mouseenter( function() {
    $( ".subsesion" ).show();
  } ).mouseleave(function(){
    $( ".subsesion" ).hide();
  });
}

function modalAlert(title, message, options){

  if (options == null) {
    options = {};    
  }
  options["closeClass"] = "closeClass";

  $("#modal-title")[0].innerHTML = title;
  $("#modal-content")[0].innerHTML = message;
  $("#modal-alert").css("height", "160px");
  $("#modal-alert").modal(options);
  $("#modal-alert").mCustomScrollbar();
  $(".simplemodal-wrap").css("overflow","");
}

function modalDialogue(html, options){
  
  if (options == null) {
    options = {};    
  }
  options["closeClass"] = "closeClass";

  $("#modal-content").remove();
  $("#modal-alert").append("<div id='modal-content'></div>");
  $("#modal-content").append(html);
  $("#modal-alert").modal(options);
  $("#modal-alert").mCustomScrollbar();
  $(".simplemodal-wrap").css("overflow","");
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
