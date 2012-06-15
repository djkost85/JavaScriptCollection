(function () {
	var scriptName = 'TriggerLink';
	var guid = 'AD738EDC-8364-4782-999F-A24F75B52477';
	var data = {};

	function linksToText() {
		var anchorsNodeList = document.querySelectorAll('a');

		for (var i = 0; i < anchorsNodeList.length; i++) {
			var anchorElement = anchorsNodeList[i];

			var spanElement = document.createElement('span');

			// Copy all the content.
			spanElement.innerHTML = anchorElement.innerHTML;

			// Copy all the attributes.
			for (var j = 0; j < anchorElement.attributes.length; j++) {
				var oldAttr = anchorElement.attributes[j];
				var newAttr = document.createAttribute(oldAttr.name);
				newAttr.value = oldAttr.value;
				
				spanElement.attributes.setNamedItem(newAttr);
			}
			
			// Add one more class as identifier.
			spanElement.classList.add(scriptName);

			anchorElement.parentElement.replaceChild(spanElement, anchorElement);
		}
	}

	function textToLinks() {
		var spanNodeList = document.querySelectorAll('span.' + scriptName);

		for (var i = 0; i < spanNodeList.length; i++) {
			var spanElement = spanNodeList[i];

			var anchorElement = document.createElement('a');

			// Restore the content.
			anchorElement.innerHTML = spanElement.innerHTML;

			// Remove the identifier class.
			spanElement.classList.remove(scriptName);

			// Restore all the attributes.
			for (var j = 0; j < spanElement.attributes.length; j++) {
				var oldAttr = spanElement.attributes[j];
				var newAttr = document.createAttribute(oldAttr.name);
				newAttr.value = oldAttr.value;

				anchorElement.attributes.setNamedItem(newAttr);
			}

			spanElement.parentElement.replaceChild(anchorElement, spanElement);
		}
	}

	if (data = window[guid]) {	// if the script has been launched before
		if (data.isText) {
			textToLinks();
		} else {
			linksToText();
		}

		data.isText = !data.isText;
	} else {
		linksToText();

		data = window[guid] = {
			scriptName: scriptName,
			isText: true
		};
	}
}).call();