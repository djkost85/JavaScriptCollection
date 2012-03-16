(function() {
  var attributesToSearch, element, elementTypes, filter, i, list, node, nodeList, patterns, rate, scriptName, sort, _, _i, _len,
    __indexOf = Array.prototype.indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  scriptName = "FindNextSearchBox";

  elementTypes = ['text', 'search'];

  attributesToSearch = ['id', 'name', 'title', 'value', 'class', 'placeholder'];

  patterns = [/search/i, /keyword/i, /query/i, /lookup/i, /^q$/i, /^s$/i];

  rate = function(e) {
    var attr, i, max, _i, _len, _ref;
    max = patterns.length;
    for (_i = 0, _len = attributesToSearch.length; _i < _len; _i++) {
      attr = attributesToSearch[_i];
      for (i = 0, _ref = max - 1; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
        if (patterns[i].test(e[attr])) {
          if ((max = i) === 0) {
            return patterns.length;
          } else {
            break;
          }
        }
      }
    }
    return patterns.length - max;
  };

  sort = function(a, b) {
    var aRating, bRating;
    aRating = a.dataset.rating;
    bRating = b.dataset.rating;
    if (aRating > bRating) {
      return 1;
    } else if (aRating < bRating) {
      return -1;
    }
    if (a.offsetTop < b.offsetTop) {
      return 1;
    } else if (a.offsetTop > b.offsetTop) {
      return -1;
    }
    if (a.offsetLeft < b.offsetLeft) {
      return 1;
    } else if (a.offsetLeft > b.offsetLeft) {
      return -1;
    }
    return 0;
  };

  filter = function(element, index, array) {
    var rating, _ref;
    if (!(_ref = element.type, __indexOf.call(elementTypes, _ref) >= 0) || element.disabled || element.clientWidth === 0 || element.clientHeight === 0) {
      return false;
    }
    if ((rating = rate(element)) <= 0) return false;
    element.dataset.rating = rate(element);
    return true;
  };

  if (window[scriptName] != null) {
    _ = window[scriptName];
    if (++_.index >= _.list.length) _.index = 0;
  } else {
    _ = window[scriptName] = {
      elementTypes: elementTypes,
      attributesToSearch: attributesToSearch,
      patterns: patterns,
      list: [],
      index: 0
    };
    nodeList = document.querySelectorAll('input');
    list = [];
    i = 0;
    for (_i = 0, _len = nodeList.length; _i < _len; _i++) {
      node = nodeList[_i];
      list[i++] = node;
    }
    _.list = list = list.filter(filter);
    list.sort(sort);
  }

  console.log("" + scriptName + ":", _);

  if (_.list.length > 0) {
    document.body.focus();
    (element = _.list[_.index]).focus();
    element.select();
    console.log("Element (" + (_.index + 1) + "/" + _.list.length + ") selected:", element);
  } else {
    console.log('No item found');
  }

}).call(this);
