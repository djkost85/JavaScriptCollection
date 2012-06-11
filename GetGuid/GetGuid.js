(function() {
	function generateGUID () {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var rand = Math.random() * 16 | 0;
			var num = c === 'y' ? (rand & 0x3 | 0x8) : rand;

			return num.toString(16).toUpperCase();
		});
	}

	while (true) {
		var guid = generateGUID();
		
		console.log(guid);
		var response = prompt('Random GUID', guid);

		if (response === null)
			break;
	}
}).call(this);
