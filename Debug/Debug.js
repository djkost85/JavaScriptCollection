(function() {
  var enumIs;

  window.log = function(msg) {
    return console.log(msg);
  };

  window.err = function(msg) {
    return console.error(msg);
  };

  window.warn = function(msg) {
    return console.warn(msg);
  };

  window.LogMode = {
    None: 0x0,
    String: 0x1,
    Function: 0x2,
    Null: 0x4,
    Warn: 0x8,
    All: 0xF
  };

  enumIs = function(testedMode, testingMode) {
    return (testedMode & testingMode) === testingMode;
  };

  window.loga = function(obj, mode) {
    var key;
    if (mode == null) mode = LogMode.String;
    for (key in obj) {
      if (obj[key]) {
        try {
          if (typeof obj[key] === 'function') {
            if (enumIs(mode, LogMode.Function)) {
              console.log(("" + key + " ->\t") + obj[key]);
            }
          } else if (enumIs(mode, LogMode.String)) {
            console.log(("" + key + ":\t") + obj[key]);
          }
        } catch (error) {
          if (enumIs(mode, LogMode.Warn)) {
            warn("" + key + " cannot be converted to string");
          }
        }
      } else if (enumIs(mode, LogMode.Null)) {
        console.log("" + key + " is null");
      }
    }
  };

  console.log('Debug scrip loaded at ' + (new Date()).toISOString());

  console.log(navigator.userAgent);

}).call(this);
