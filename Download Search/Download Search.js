(function() {
	var links = [
		"http://www.demonoid.ph/files/?query=%s",
		"https://kat.ph/search/%s",
		"https://www.google.com/cse?cx=014395573825771924245:6cxgcwinhte&q#gsc.tab&gsc.q=%s",
		"https://www.google.com/search?q=FilesTube|4Shared|MediaFire|RapidShare|Box.net %s"
	];

	var query = window.getSelection().toString().trim();
	query = prompt('Download Search', query);

	if ((query != null) && (query = encodeURIComponent(query.trim()))) {
		for (i = 0; i < links.length; i++) {
			link = links[i];
			window.open(link.replace('%s', query));
		}
	}
})();