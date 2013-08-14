document.addEventListener("load", onLoad);
document.addEventListener("DOMContentLoaded", onReady);

function onLoad() {
	document.removeEventListener("load", onLoad);
	document.addEventListener('keydown', function (e) {
		var keyCode = e.keyCode;

		if (keyCode > 95) {
			keyCode -= 48;
		}

		if (keyCode < 48 || keyCode > 57) {
			console.log('Not pass: ' + e.keyCode);
		    return;
		}

		var pressedNum = keyCode - 48;

		if (pressedNum === 0) {
			pressedNum = 10;
		}

		openResults(pressedNum);
	});
}

function onReady() {
	document.removeEventListener("DOMContentLoaded", onReady);
}

function openResults(numberItems) {
	var anchorElements = document.querySelectorAll('#ires h3 a');

	for (var i = 0; i < numberItems; i++) {
		var anchorElement = anchorElements[i];
		console.log(anchorElement);
		middleClickOnElement(anchorElement);
	}
}

function middleClickOnElement(element) {
	var rightClickEvent = document.createEvent('MouseEvents');
	rightClickEvent.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 1, null);
	element.dispatchEvent(rightClickEvent);
}
