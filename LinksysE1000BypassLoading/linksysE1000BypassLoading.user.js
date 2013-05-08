// ==UserScript== http://wiki.greasespot.net/Metadata_block
// @name            Linksys E1000 Auto Loading Bypass
// @namespace       http://userscripts.org/users/masonaxcte
// @description     Auto click the annoying buttons in the loading pages.
// @match           http://192.168.1.1/*
// @run-at          document-end
// @updateURL       
// @version         1.1
// ==/UserScript==

(function () {
	var id = setInterval(onTimeout, 500);
	console.log('id = ' + id);

	function onTimeout() {
		var iframeElement = document.querySelector('#loadstatus');
		var buttonElement, buttonElements;
		var i;
		
		buttonElement = document.querySelector('input[value="Continue"]');
		
		if (buttonElement != null) {
			buttonElement.click();
		}

		buttonElement = document.querySelector('input[name=btaction]');

		if (buttonElement != null) {
			buttonElement.click();
		};

		if (iframeElement != null) {
			buttonElement = iframeElement.contentDocument.querySelector('.wpsbutton');

			if (buttonElement != null) {
				buttonElement.click();
			};
		};
	}
})();