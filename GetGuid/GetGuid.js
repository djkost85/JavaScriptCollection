(function() {

  prompt('Random GUID', 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var num, rand;
    rand = Math.random() * 16 | 0;
    num = c === 'y' ? rand & 0x3 | 0x8 : rand;
    return num.toString(16).toUpperCase();
  }));

}).call(this);
