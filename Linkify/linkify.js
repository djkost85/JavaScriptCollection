(function() {
  var script, start;

  start = function() {
    return $(function() {
      var childrenNodes, jObj, match, newNode, newNodes, node, nodeQueue, splitList, startTime, timeLimit, url, urlRegex, _results;
      urlRegex = /([a-zA-Z-]{2,}:(?:\/\/)?)?(?:(\w+)(?::))?(?:(\w+)(?:@))?((?:\w+\.\w+)(?:\.\w+)*)((?::)\d+)?((?:\/[-\.\w%\(\)]*)*)([\?#&]\w+=?\S*)*/gi;
      startTime = Date.now();
      timeLimit = 3000;
      nodeQueue = [document.body];
      _results = [];
      while (node = nodeQueue.shift()) {
        if (node.nodeName === 'A' || $(node).is(":hidden")) continue;
        if (node.nodeType === Node.TEXT_NODE) {
          _results.push((function() {
            var _results2;
            _results2 = [];
            while (match = urlRegex.exec(node.nodeValue)) {
              if (Date.now() - startTime >= timeLimit) {
                throw 'Node processing timeout';
              }
              url = match[0];
              if (!match[1]) url = 'http://' + url;
              splitList = node.data.split(match[0]);
              newNodes = [];
              if (splitList[0].length > 0) {
                newNodes.push(document.createTextNode(splitList[0]));
              }
              newNodes.push(document.createElement('a'));
              if (splitList[1].length > 0) {
                newNodes.push(document.createTextNode(splitList[1]));
              }
              $(newNodes[1]).attr('href', url).text(match[0]);
              jObj = $(node.parentNode).empty();
              _results2.push((function() {
                var _i, _len, _results3;
                _results3 = [];
                for (_i = 0, _len = newNodes.length; _i < _len; _i++) {
                  newNode = newNodes[_i];
                  _results3.push(jObj.append(newNode));
                }
                return _results3;
              })());
            }
            return _results2;
          })());
        } else {
          childrenNodes = $(node).contents().toArray();
          _results.push(nodeQueue = nodeQueue.concat(childrenNodes));
        }
      }
      return _results;
    });
  };

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
