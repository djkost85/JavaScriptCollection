var allElements = document.querySelectorAll('*');
allElements[allElements.length] = document;
var removingEvents = [
	'onmousedown',
	'onmouseover',
	'onclick',
	'ondragstart',
	'onselectstart'
];

var removingPatterns = [
	/\s*return false;\s*/,
	/\.fucus\(\)/
];

for (var i = 0; i < allElements.length; i++) {
	var element = allElements[i];

	for (var j = 0; j < removingEvents.length; j++) {
		var removingEvent = removingEvents[j];

		for (var k = 0; k < removingPatterns.length; k++) {
			var removingPattern = removingPatterns[k];

			if (element[removingEvent] != null) {
				if (element[removingEvent].toString().match(removingPattern) !== null) {
					console.log(element);

					//var oldElement = element;
					//var newElement = oldElement.cloneNode(true);
					//oldElement.parentElement.replaceChild(newElement, oldElement);

					//console.log('New node', newElement);
					element.addEventListener(removingEvent.replace('on', ''), function () { return true; });
					console.log(element[removingEvent]);

					break;
				}
			}
		}
	}
}
