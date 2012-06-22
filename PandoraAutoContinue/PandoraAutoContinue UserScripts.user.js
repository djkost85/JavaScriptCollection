// ==UserScript== http://wiki.greasespot.net/Metadata_block
// @name            Pandora Auto Continue
// @namespace		http://userscripts.org/users/masonaxcte
// @description     Automatically click "I'm listening" and reload button in Pandora.com
// @match           http://www.pandora.com/*
// @run-at			document-end
// @updateURL       https://github.com/masonaxcte/JavaScriptCollection/raw/master/PandoraAutoContinue/PandoraAutoContinue%20UserScripts.user.js
// @version         1.0
// ==/UserScript==

var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		for (var i = 0; i < mutation.addedNodes.length; i++) {
			var addedNode = mutation.addedNodes[i];			
			var node = addedNode.querySelector('a.still_listening')||	// still listening button
				addedNode.querySelector('a.toastItemReload');	// reload button

			if (node) {
				node.click();
			}
		}
	});
});

observer.observe(document, { childList: true, subtree: true });