// ==UserScript== http://wiki.greasespot.net/Metadata_block
// @name            Pandora Auto Continue
// @namespace       http://userscripts.org/users/masonaxcte
// @description     Automatically click "I'm listening" and reload button in Pandora.com
// @match           http://www.pandora.com/*
// @run-at          document-end
// @updateURL       https://github.com/masonaxcte/JavaScriptCollection/raw/master/PandoraAutoContinue/PandoraAutoContinue%20UserScripts.user.js
// @version         1.3
// ==/UserScript==

console.log('Pandora Auto Continue');

var logs = [];
loadLogs();

function addLogs(log) {
	logs.push(log);

	if (logs.length > 100) {
		logs.pop();
	}

	saveLogs();
}

function saveLogs() {
	var obj = {};

	try {
		obj = JSON.stringify(logs);
	} catch (e) {
		console.error('Error on stringifying logs');
	}

	localStorage.setItem('logs', obj);

	console.log(obj.replace(/{/g, '\n\t{'));
}

function loadLogs() {
	var obj = localStorage.getItem('logs');

	if (obj !== null) {
		try {
			logs = JSON.parse(obj);
		} catch (e) { }
	}
}

addLogs({ time: new Date(), type: 'start' });
var timeStarted = new Date();

var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		for (var i = 0; i < mutation.addedNodes.length; i++) {
			var addedNode = mutation.addedNodes[i];
			var node = addedNode.parentNode.querySelector('a.toastItemReload, a.still_listening');

			if (node) {
				console.log('Matched mutation:\n', mutation);

				node.click();

				var elapsedSeconds = ((new Date()) - timeStarted) / 1000;
				addLogs({ time: new Date(), type: 'click', elapsedSeconds: elapsedSeconds });

				return;
			}
		}
	});
});

observer.observe(document, { childList: true, subtree: true });