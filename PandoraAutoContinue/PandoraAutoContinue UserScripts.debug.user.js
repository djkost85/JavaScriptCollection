// ==UserScript== http://wiki.greasespot.net/Metadata_block
// @name            Pandora Auto Continue (debug)
// @namespace       http://userscripts.org/users/masonwan
// @description     Automatically click "I'm listening" and reload button in Pandora.com
// @match           http://www.pandora.com/*
// @run-at          document-end
// @updateURL
// @version         2.1
// ==/UserScript==

function addLogs(log) {
	loadLogs();

	var date = new Date();
	logs.push(date.toISOString() + ':' + log);

	saveLogs();
}

function loadLogs() {
	if (localStorage.logs) {
		try {
			logs = JSON.parse(localStorage.logs);
			console.log('Load logs:', logs);
		} catch (ex) {
			console.error('Error on parsing logs:', ex);
		}
	} else {
		localStorage.logs = '[]';
		logs = [];
	}
}

function saveLogs() {
	try {
		localStorage.logs = JSON.stringify(logs);
	} catch (ex) {
		console.error('Error on stringify logs:', ex);
	}
}

var SCRIPT_NAME = 'PandoraAutoContinue';
var logs = [];
addLogs('Script starts');

var observer = new MutationObserver(function (mutations) {
	mutations.forEach(function (mutation) {
		for (var i = 0; i < mutation.addedNodes.length; i++) {
			var timeText = (new Date()).toISOString();
			var addedNode = mutation.addedNodes[i];
			var parent = addedNode.parentElement || addedNode.parentNode;

			if (!parent) {
				console.log(timeText + ': mutation did not match');
				continue;
			}

			var buttonElement = parent.querySelector('a.still_listening');

			if (buttonElement) {
				console.log(timeText + ': matched mutation:\n', mutation);

				setTimeout(function delayClick() {
					buttonElement.click();
					addlogs('Button clicked');
				}, 1000);

				addLogs({ mutation: mutation });

				return;
			}
		}
	});
});

observer.observe(document, { childList: true, subtree: true });
