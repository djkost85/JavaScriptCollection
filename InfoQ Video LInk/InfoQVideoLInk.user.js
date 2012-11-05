// ==UserScript== http://wiki.greasespot.net/Metadata_block
// @name            InfoQ Video Link
// @namespace       http://userscripts.org/users/masonaxcte
// @description     Add the video link to summary section.
// @match           http://www.infoq.com/presentations/*
// @run-at          document-start
// @updateURL       
// @version         1.0
// ==/UserScript==

(function () {
    var objectElement = document.querySelector('#player');
    var domain = /\w+.\w+.\w+/.exec(objectElement.data);
    var paramElement = objectElement.childNodes[3];
    var filename = paramElement.value.match(/presentations\/[^\.]+.mp4/);
    var link = 'http://' + domain + '/' + filename;

    var summaryElement = document.querySelector('#summaryComponent');
    summaryElement.innerHTML = '<p>Video link: <a alt="" href="' + link + '">' + link + '</a></p>' + summaryElement.innerHTML;
})();