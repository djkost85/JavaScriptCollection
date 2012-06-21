(function () {
	var MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

	var observer = new MutationObserver(function (mutations) {
		mutations.forEach(function (mutation) {
			for (var i = 0; i < mutation.addedNodes.length; i++) {
				var addedNode = mutation.addedNodes[i];			
				var node = addedNode.querySelector('a.still_listening')||	// still listening button
					addedNode.querySelector('a.toastItemReload');	// reload button

				if (node) {
					alert('successful');
					console.log(mutations);
					console.log('Node:', node);
					node.click();
				}
			}
		});
	});

	observer.observe(document, { childList: true, subtree: true });
})();