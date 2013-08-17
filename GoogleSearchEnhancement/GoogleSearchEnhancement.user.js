// ==UserScript== http://wiki.greasespot.net/Metadata_block
// @name            Google Search Enhancement
// @namespace       http://userscripts.org/users/masonwan
// @description     Open Google Search results in the same time with keyboard shortcut
// @match           https://www.google.com/*
// @run-at          document-start
// @updateURL
// @version         1.0
// ==/UserScript==

(function () {
	document.addEventListener('keydown', function (e) {
		if (!e.ctrlKey && !e.altKey) {
			return;
		}

		var keyCode = e.keyCode;

		if (keyCode > 95) {
			keyCode -= 48;
		}

		if (keyCode < 48 || keyCode > 57) {
			return;
		}

		var pressedNum = keyCode - 48;

		if (pressedNum === 0) {
			pressedNum = 10;
		}

		openResults(pressedNum);

		e.preventDefault();
		e.stopPropagation();
		e.stopImmediatePropagation();
	});

	function openResults(numberItems) {
		var anchorElements = document.querySelectorAll('#ires h3.r a');

		for (var i = Math.min(anchorElements.length, numberItems) - 1; i >= 0; i--) {
			var anchorElement = anchorElements[i];
			middleClickOnElement(anchorElement);
			anchorElement.style.backgroundColor = 'PaleGreen';
		}
	}

	function middleClickOnElement(element) {
		var rightClickEvent = document.createEvent('MouseEvents');
		rightClickEvent.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 1, null);
		element.dispatchEvent(rightClickEvent);
	}
}).call();
