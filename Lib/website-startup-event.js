document.addEventListener("DOMContentLoaded", onReady);

function onReady() {
	console.log('Ready');
	document.removeEventListener("DOMContentLoaded", onReady);
}

window.addEventListener("load", onLoad);

function onLoad() {
	console.log('Load');
	window.removeEventListener("load", onLoad);
}
