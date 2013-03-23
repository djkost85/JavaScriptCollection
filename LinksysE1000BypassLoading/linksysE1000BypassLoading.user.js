// ==UserScript== http://wiki.greasespot.net/Metadata_block
// @name            Linksys E1000 Auto Loading Bypass
// @namespace       http://userscripts.org/users/masonaxcte
// @description     Auto click the annoying buttons in the loading pages.
// @match           http://192.168.1.1/*
// @run-at          document-end
// @updateURL       
// @version         1.0
// ==/UserScript==

(function () {
	var id = setInterval(onTimeout, 500);

	function onTimeout() {
		var iframeElement = document.querySelector('#loadstatus');

		if (iframeElement == null) {
			return;
		};

		var buttonElement = iframeElement.contentDocument.querySelector('.wpsbutton');

		if (buttonElement != null) {
			buttonElement.click();
		};
	}
})();