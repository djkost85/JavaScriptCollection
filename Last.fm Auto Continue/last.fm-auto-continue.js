// ==UserScript== http://wiki.greasespot.net/Metadata_block
// @name            Last.fm Auto Continue (debug)
// @namespace       http://userscripts.org/users/masonwan
// @description     Automatically click "Resume" button in last.com
// @match           http://www.last.fm/listen/*
// @run-at          document-end
// @updateURL
// @version         0.1
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

var SCRIPT_NAME = 'Last.fm Auto Continue';
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

			var buttonElement = parent.querySelector('.confirmButton.dialogButton.dialogConfirm');

			if (buttonElement) {
				console.log(timeText + ': matched mutation:\n', mutation);

				setTimeout(function delayClick() {
					var buttonElement = document.querySelector('a.still_listening');
					console.log('buttonElement:', buttonElement);
					buttonElement.click();
					addLogs('Button clicked');
				}, 1000);

				break;
			}
		}
	});
});

observer.observe(document, { childList: true, subtree: true });
