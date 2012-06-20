(function () {
	function searching() {
		console.log('Listening at ' + (new Date()).toLocaleString());

		var elements = document.querySelectorAll("a.still_listening");

		for (var i = 0; i < elements.length; i++) {
			elements[i].click();
		}

		setTimeout(searching, 10000);
	};

	searching();
})();