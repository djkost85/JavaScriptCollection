links = [
	"http://www.demonoid.me/files/?sort=S&query=%s"
	"http://www.kat.ph/usearch/%s/"
	"https://www.google.com/cse?cx=014395573825771924245:6cxgcwinhte&q#gsc.tab&gsc.q=%s"
	"https://www.google.com/search?q=mediafire|rapidshare|4shared|fileserve|hotfile|filesonic|depositfiles|zshare %s"
]

query = window.getSelection().toString().trim()
query = prompt('Download Search', query)

if query? and query = encodeURIComponent(query.trim())
	for link in links
		window.open(link.replace('%s', query))