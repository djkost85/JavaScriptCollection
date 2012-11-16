// ==UserScript== http://wiki.greasespot.net/Metadata_block
// @name            MirrorCreator Auto Redirect
// @namespace       http://userscripts.org/users/masonaxcte
// @description     Automatically go to the download page.
// @match           http://www.mirrorcreator.com/redirect/*
// @run-at          document-end
// @updateURL       
// @version         1.0
// ==/UserScript==

(function () {
    var anchorElement = document.querySelector('#redirectlink a');
    anchorElement.target = '_self';
    anchorElement.click();
})();