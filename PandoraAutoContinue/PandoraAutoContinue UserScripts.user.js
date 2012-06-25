// ==UserScript== http://wiki.greasespot.net/Metadata_block
// @name            Pandora Auto Continue
// @namespace       http://userscripts.org/users/masonaxcte
// @description     Automatically click "I'm listening" and reload button in Pandora.com
// @match           http://www.pandora.com/*
// @run-at          document-end
// @updateURL       https://github.com/masonaxcte/JavaScriptCollection/raw/master/PandoraAutoContinue/PandoraAutoContinue%20UserScripts.user.js
// @version         1.1
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

addLogs({time: new Date(), type: 'start'});
var timeStarted = new Date();

var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

var observer = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		for (var i = 0; i < mutation.addedNodes.length; i++) {
			var addedNode = mutation.addedNodes[i];
			var node = addedNode.querySelector('a.still_listening') ||	// still listening button
				addedNode.querySelector('a.toastItemReload');	// reload button

			if (node) {
				var elapsedSeconds = ((new Date()) - timeStarted) / 1000;

				if (node.className.contains('still_listening')) {
					console.log('listening');
					addLogs({ time: new Date(), type: 'listening', elapsedSeconds: elapsedSeconds });
				} else {
					console.log('reload');
					addLogs({ time: new Date(), type: 'reload', elapsedSeconds: elapsedSeconds });
				}
				
				node.click();
				return;
			}
		}
	});
});

observer.observe(document, { childList: true, subtree: true });