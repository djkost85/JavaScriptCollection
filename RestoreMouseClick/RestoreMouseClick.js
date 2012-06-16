(function () {
	var functionNames = [
	'oncontextmenu',
	'ondragstart',
	'onselectstart'
	];

	for (var i = 0; i < functionNames.length; i++) {
		var functionName = functionNames[i];
		var func = document.body[functionName];

		if (func && func() === false) {
			document.body[functionName] = null;
			console.log('Restore "' + functionName + '"');
		}
	}
}).call();