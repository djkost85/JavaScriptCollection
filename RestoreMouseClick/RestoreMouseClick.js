(function () {
	var objectsToCheck = [
		window,
		document,
		document.body
	];

	var functionNames = [
		'oncontextmenu',
		'ondragstart',
		'onselectstart'
	];
	
	var preventDefaultRegex = /preventDefault/;

	for (var i = 0; i < objectsToCheck.length; i++) {
		var obj = objectsToCheck[i];

		for (var j = 0; j < functionNames.length; j++) {
			var functionName = functionNames[j];
			var func = obj[functionName];
			
			try {
				if (func) {
					var funcText = func.toString();

					if (preventDefaultRegex.test(funcText) === false) {	// if it doesn't seem to prevent the default action
						if (func() !== false) {		// and if it doesn't return false
							continue;	// then it is safe
						}
					}

					// otherwise kill it
					removeProperty(obj, functionName);
				}
			} catch (e) {
				removeProperty(obj, functionName);
				console.warn(e);
			}
		}
	}
	
	function removeProperty(obj, functionName) {
		obj[functionName] = null;
		console.log('Restore "' + obj.tagName + '.' + functionName + '"');
	}
})();