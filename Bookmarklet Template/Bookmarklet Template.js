(function() {
  var script, start;

  start = function() {};

  if (!(typeof jQuery !== "undefined" && jQuery !== null)) {
    script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = "http://code.jquery.com/jquery-latest.min.js";
    document.head.appendChild(script);
  }

  if (!(typeof jQuery !== "undefined" && jQuery !== null)) {
    script.onload = start;
  } else {
    start();
  }

}).call(this);
