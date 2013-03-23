(function () {

	var id = "C4365D9F-F7E8-4D17-84E4-E351FD1B640A";
	var styleMap = {
		"fontFamily": "Calibri",
		"maxWidth": "61.80339887498948%",
		"margin": "0px auto"
	};
	var bodyElement = document.querySelector('body');

	if (window[id]) {
		for (var key in styleMap) {
			bodyElement.style[key] = bodyElement.dataset[key];
		}
	} else {
		var oldStyle = getComputedStyle(bodyElement);

		for (var key in styleMap) {
			bodyElement.dataset[key] = oldStyle[key];
			bodyElement.style[key] = styleMap[key];
		}
	}

	window[id] = !Boolean(window[id]);

})();