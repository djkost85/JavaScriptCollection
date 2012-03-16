start = ->
	# Entry point
	
if not jQuery?
	script = document.createElement('script')
	script.type = 'text/javascript'
	script.src = "http://code.jquery.com/jquery-latest.min.js"
	document.head.appendChild(script)

if not jQuery?
	script.onload = start
else
	start()