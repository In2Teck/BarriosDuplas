if (referrerIsFacebookApp()) {
  console.log("hola");
  redirectToServer();
}

function referrerIsFacebookApp() {
  var isInIFrame = (window.location != window.parent.location) ? true : false;
  if (document.URL) {
    return isInIFrame;
  }
  return false;
}

function redirectToServer() {
  var querystring = location.search;
  top.location = 'http://localhost:3000/';
}

$(document).on("ready", onReady);

function onReady() {
  if (isIECompatible()) {
    loadFB();  
  }
  else {
   // window.location = '/ie8.html';
  }
}

function isIECompatible() {
  var compatible = true;
  var browser = (function() {
    var rv = -1; // Return value assumes failure.
    if (navigator.appName == 'Microsoft Internet Explorer') {
      var ua = navigator.userAgent;
      var re  = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
      if (re.exec(ua) != null)
        rv = parseFloat( RegExp.$1 );
   }
   return rv;
  })();

  if (browser > -1) {
    if (browser < 9) {
      compatible = false;
    }
  }
  return compatible
}

function loadFB() {
  window.fbAsyncInit = function() {
    // init the FB JS SDK
    FB.init({
      appId      : '564232870327408', // App ID from the App Dashboard
      status     : true, // check the login status upon init?
      cookie     : true, // set sessions cookies to allow your server to access the session?
      xfbml      : true  // parse XFBML tags on this page?
    });

   // FB.Canvas.setAutoGrow(true);
    /*FB.Canvas.setSize({height:1000});
    setTimeout(function(){
        FB.Canvas.setAutoGrow(true);
    }, 100)*/
  
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        console.log("conectado")
      }
      else {
        console.log("error");
        //$(document).trigger('loginReq');
      } 
    });
  };

  // Load the SDK's source Asynchronously
  // Note that the debug version is being actively developed and might 
  // contain some type checks that are overly strict. 
  // Please report such bugs using the bugs tool.
  (function(d, debug){
     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = "//connect.facebook.net/es_LA/all" + (debug ? "/debug" : "") + ".js";
     ref.parentNode.insertBefore(js, ref);
   }(document, /*debug*/ false));
}
