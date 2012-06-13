(function() {
	var links = [
		"http://beta.demonoid.me/files/?sort=S&query=%s",
		"http://www.kat.ph/usearch/%s/",
		"https://www.google.com/cse?cx=014395573825771924245:6cxgcwinhte&q#gsc.tab&gsc.q=%s",
		"https://www.google.com/search?q=mediafire|rapidshare|4shared|fileserve|hotfile|filesonic|depositfiles|zshare %s"
	];

	var query = window.getSelection().toString().trim();
	query = prompt('Download Search', query);

	if ((query != null) && (query = encodeURIComponent(query.trim()))) {
		for (i = 0, len = links.length; i < len; i++) {
			link = links[i];
			window.open(link.replace('%s', query));
		}
	}
}).call(this);
