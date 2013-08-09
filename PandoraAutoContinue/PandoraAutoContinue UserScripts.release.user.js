// ==UserScript== http://wiki.greasespot.net/Metadata_block
// @name            Pandora Auto Continue
// @namespace       http://userscripts.org/users/masonwan
// @description     Automatically click "I'm listening" and reload button in Pandora.com
// @match           http://www.pandora.com/*
// @run-at          document-end
// @updateURL       https://github.com/masonwan/JavaScriptCollection/raw/master/PandoraAutoContinue/PandoraAutoContinue%20UserScripts.release.user.js
// @version         1.4
// ==/UserScript==

var observer = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		for (var i = 0; i < mutation.addedNodes.length; i++) {
			var addedNode = mutation.addedNodes[i];
			var node = addedNode.parentNode.querySelector('a.toastItemReload, a.still_listening');

			if (node) {
				node.click();
				return;
			}
		}
	});
});

observer.observe(document, { childList: true, subtree: true });