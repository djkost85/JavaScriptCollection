(function() {
  var c, code, literal, num, text, _i, _len;

  while ((text = prompt("Enter the text")) != null) {
    code = '';
    literal = '';
    for (_i = 0, _len = text.length; _i < _len; _i++) {
      c = text[_i];
      num = c.charCodeAt() - 96;
      code += num;
      literal += num + ', ';
    }
    if (!(prompt("" + text + " = " + literal, code) != null)) break;
  }

}).call(this);
