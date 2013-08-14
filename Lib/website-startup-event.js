window.addEventListener("load", onLoad);
document.addEventListener("DOMContentLoaded", onReady);

function onLoad() {
	console.log('Load');
	window.removeEventListener("load", onLoad);
}

function onReady() {
	console.log('Ready');
	document.removeEventListener("DOMContentLoaded", onReady);
}
