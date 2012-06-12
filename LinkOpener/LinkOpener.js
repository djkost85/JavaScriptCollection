(function() {
	var scriptName = 'LinkOpener';
	window[guid] = scriptName;

	var guid = '294A1387-0EF8-4084-9881-26FF1E6D93EA';

	if (window[guid]) {
		console.log(scriptName + ' has been launched.');
		return;
	}

	console.log(scriptName + ' is launched');

	var styleBorderSelected = '1px dashed orange';
	var linksTable = {};
	var linksCount = 0;

	function applyStyle(e) {
		e.styleBorderOld = e.style.border;
		e.style.border = styleBorderSelected;
	}

	function restoreStyle(e) {
		e.style.border = e.styleBorderOld;
		delete e.styleBorderOld;
	}

	function openLinks(urls) {
		urls.forEach(function(url){
			window.open(url, '_blank');
		});
	}

	function onKeyDown(e) {
		if (e.keyCode === 17) {	// The Ctrl key. The constant is DOM_VK_CONTROL
			console.log('Open links');

			var linksToOpen = [];

			for (var url in linksTable) {
				var element = linksTable[url];
				delete element.marked;
				restoreStyle(element);

				linksToOpen.push(url);
			}

			linksTable = {};
			linksCount = 0;

			openLinks(linksToOpen);
		}
	}

	function onMouseOverOrOut(e) {
		var element = e.target;

		if (element.tagName === 'A') {
			var isTriggered = false;

			if (e.shiftKey && !element.marked) {
				if (!linksTable[element.href]) {
					console.log('Mark ' + element);
				
					element.marked = true;
					applyStyle(element);

					linksTable[element.href] = element;
					++linksCount;
					isTriggered = true;
				}
			} else if (e.altKey && element.marked === true) {
				console.log('Unmark ' + element);

				delete element.marked;
				restoreStyle(element);

				delete linksTable[element.href];
				--linksCount;
				isTriggered = true;
			};

			if (isTriggered === true) {
				console.log(linksCount);
			}
		}
	}

	window.addEventListener('keydown', onKeyDown);
	window.addEventListener('mouseover', onMouseOverOrOut);
	window.addEventListener('mouseout', onMouseOverOrOut);
}).call(this);
