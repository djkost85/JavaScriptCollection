(function() {
  var text;

  while ((text = prompt("Enter the text")) !== null) {
    if (text === '')
      break;

    text = text.toLowerCase();

    var code = '';
    var literal = '';

    for (var i = 0, len = text.length; i < len; i++) {
      c = text[i];
      num = c.charCodeAt() - 96;
      code += num;
      literal += num + ', ';
    }

    if ((prompt("\""+ text + "\" = " + literal, code) === null)) {
      break;
    }
  }

}).call(this);
