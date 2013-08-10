(function () {
	var GUID = '294A1387-0EF8-4084-9881-26FF1E6D93EA';
	var SCRIPT_NAME = 'LinkOpener';

	if (window[GUID]) {
		console.info(SCRIPT_NAME + ' has been launched');
		return;
	}

	window[GUID] = true;
	console.info(SCRIPT_NAME + ' is launched');

	var MARKED_BACKGROUND_COLOR = 'rgb(154, 205, 50)';
	var CTRL_KEYCODE = 17;
	var registeredElements = [];

	function mark(e) {
		if (e.marked === true) {
			return;
		}
		e.marked = true;
		e.oldStyle = e.style.backgroundColor;
		e.style.backgroundColor = MARKED_BACKGROUND_COLOR;
	}

	function unmark(e) {
		if (!e.marked) {
			return;
		}
		delete e.marked;
		e.style.backgroundColor = e.oldStyle;
		delete e.oldStyle;
	}

	function onKeyDown(e) {
		if (e.keyCode !== CTRL_KEYCODE) {
			return;
		}

		var anchorElements = document.querySelectorAll('a');
		for (var i = 0, len = anchorElements.length; i < len; i++) {
			var anchorElement = anchorElements[i];
			anchorElement.addEventListener('mousemove', onMouseMove);
			registeredElements.push(anchorElement);
		}

		window.removeEventListener('keydown', onKeyDown);
		window.addEventListener('keyup', onKeyUp);
	}

	function onKeyUp(e) {
		if (e.keyCode !== CTRL_KEYCODE) {
			return;
		}

		for (var i = 0, len = registeredElements.length; i < len; i++) {
			var registeredElement = registeredElements[i];
			registeredElement.removeEventListener('mousemove', onMouseMove);
			unmark(registeredElement);
		}
		registeredElements.length = 0;

		window.addEventListener('keydown', onKeyDown);
		window.removeEventListener('keyup', onKeyUp);
	}

	function rightClickOnElement(element) {
		var rightClickEvent = document.createEvent('MouseEvents');
		rightClickEvent.initMouseEvent('click', true, true, window, 0, 0, 0, 0, 0, true, false, false, false, 0, null);
		element.dispatchEvent(rightClickEvent);
	}

	function onMouseMove(e) {
		if (!e.ctrlKey) {
			return;
		}

		var element = e.currentTarget;
		if (element.tagName !== 'A' || element.marked) {
			return;
		}

		mark(element);
		rightClickOnElement(element);
	}

	window.addEventListener('keydown', onKeyDown);
}).call(this);
