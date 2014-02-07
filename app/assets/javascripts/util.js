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
