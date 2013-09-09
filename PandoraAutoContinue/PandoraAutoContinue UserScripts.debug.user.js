// ==UserScript== http://wiki.greasespot.net/Metadata_block
// @name            Pandora Auto Continue (debug)
// @namespace       http://userscripts.org/users/masonwan
// @description     Automatically click "I'm listening" and reload button in Pandora.com
// @match           http://www.pandora.com/*
// @run-at          document-end
// @updateURL       https://github.com/masonwan/JavaScriptCollection/raw/master/PandoraAutoContinue/PandoraAutoContinue%20UserScripts.debug.user.js
// @version         2.0
// ==/UserScript==

var SCRIPT_NAME = 'PandoraAutoContinue';

function addLogs(log) {
	log.time = new Date();
	logs.push(log);

	if (logs.length > 100) {
		logs.pop();
	}

	saveLogs();
}

function saveLogs() {
	var logObject = {};

	try {
		logObject = JSON.stringify(logs);
	} catch (e) {
		console.error('Error on stringifying logs');
	}

	localStorage.setItem('logs', logObject);
}

function loadLogs() {
	var logObject = localStorage.getItem('logs');

	if (logObject !== null) {
		try {
			logs = JSON.parse(logObject);
		} catch (e) {
			console.error('Error on stringifying logs');
		}
	}
}

function printLogs() {
	var logObject = {};

	try {
		logObject = JSON.stringify(logs);
	} catch (e) {
		console.error('Error on stringifying logs');
	}

	console.log(logObject.replace(/{/g, '\n\t{'));
}

if (!window[SCRIPT_NAME]) {
	window[SCRIPT_NAME] = {
		logs: []
	};
}

var logs = window[SCRIPT_NAME].logs;

loadLogs();

var observer = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		for (var i = 0; i < mutation.addedNodes.length; i++) {
			var timeText = (new Date()).toUTCString();
			var addedNode = mutation.addedNodes[i];
			var parent = addedNode.parentElement || addedNode.parentNode;

			if (!parent) {
				console.log(timeText + ': mutation did not match');
				continue;
			}

			var buttonElement = parent.querySelector('a.still_listening');

			if (buttonElement) {
				console.log(timeText + ': matched mutation:\n', mutation);

				buttonElement.click();
				addLogs({ mutation: mutation });

				return;
			}
		}
	});
});

observer.observe(document, { childList: true, subtree: true });
