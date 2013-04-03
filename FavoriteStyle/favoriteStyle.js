(function () {

	var id = "C4365D9F-F7E8-4D17-84E4-E351FD1B640A";
	var style = "* {font-family: Calibri !important;} body {max-width: 61.80339887498948% !important; margin: 0 auto !important}";
	var styleElement = null;
	var elementId = "2F569819-CF80-44D3-87D7-406A02334818";

	if (window[id]) {
		styleElement = document.getElementById(elementId);
		document.body.removeChild(styleElement);
	} else {
		styleElement = document.createElement('style');
		styleElement.id = elementId;
		styleElement.innerHTML = style;

		document.body.appendChild(styleElement);
	}

	window[id] = !Boolean(window[id]);
})();
