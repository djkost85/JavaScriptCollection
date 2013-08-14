function rightClickOnElement(element) {
	var rightClickEvent = document.createEvent('MouseEvents');
	rightClickEvent.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, true, false, false, false, 0, null);
	element.dispatchEvent(rightClickEvent);
}

function middleClickOnElement(element) {
	var rightClickEvent = document.createEvent('MouseEvents');
	rightClickEvent.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 1, null);
	element.dispatchEvent(rightClickEvent);
}
