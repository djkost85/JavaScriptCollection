(function () {
    var links = [
        // "https://www.google.com/cse?cx=014395573825771924245:6cxgcwinhte&q#gsc.tab&gsc.q=%s",
        // "https://www.google.com/search?q=%s AND (4Shared OR MediaFire OR RapidShare OR Scribd OR DepositFiles OR Hotfile)",
        "http://thepiratebay.se/search/%s",
        "http://torrentz.eu/search?f=%s",
        "http://kickass.to/usearch/%s/"
    ];

    var query = window.getSelection().toString().trim();
    query = prompt('Download Search', query);

    if ((query != null) && (query = encodeURIComponent(query.trim()))) {
        for (var i = 0; i < links.length; i++) {
            var link = links[i];
            window.open(link.replace('%s', query));
        }
    }
})();
