$(document).on("ready", onReady);

function onReady(){

  $(".participante").css("background", "url('/assets/bg_gradient_perfil.png'), url('http://graph.facebook.com/"+ $("#home-ranking-values").data("user").facebook_id +"/picture?redirect=1&type=square&width=300&height=300')");
  resetCssProperty("perfil", "background-size", "100%");
  $(".participante_amiga").css("background", "url('/assets/bg_gradient_perfil.png'), url('http://graph.facebook.com/"+ $("#home-ranking-values").data("partner").facebook_id +"/picture?redirect=1&type=square&width=300&height=300')");
  resetCssProperty("perfil", "background-size", "100%");

  $("#ranking_lista").mCustomScrollbar();
}
