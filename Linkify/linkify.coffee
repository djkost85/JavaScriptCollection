start = -> 
	$(->
		urlRegex = ///
			([a-zA-Z-]{2,}:(?://)?)? # Scheme
			(?:(\w+)(?::))? # Username
			(?:(\w+)(?:@))? # Password
			((?:\w+\.\w+)(?:\.\w+)*) # Domain
			((?::)\d+)? # Port
			((?:/[-\.\w%\(\)]*)*) # Paths
			([\?#&]\w+=?\S*)* # Parameters
		///gi

		startTime = Date.now()
		timeLimit = 3000
		nodeQueue = [document.body]

		while node = nodeQueue.shift()
			if node.nodeName == 'A' || $(node).is(":hidden")
				continue;

			if node.nodeType is Node.TEXT_NODE
				while match = urlRegex.exec(node.nodeValue)
					if Date.now() - startTime >= timeLimit
						throw 'Node processing timeout'

					url = match[0]
					if not match[1]
						url = 'http://' + url
					splitList = node.data.split(match[0])

					newNodes = []
					if splitList[0].length > 0
						newNodes.push(document.createTextNode(splitList[0]))
					newNodes.push(document.createElement('a'))
					if splitList[1].length > 0
						newNodes.push(document.createTextNode(splitList[1]))

					$(newNodes[1]).attr('href', url).text(match[0])

					jObj = $(node.parentNode).empty()
					for newNode in newNodes
						jObj.append(newNode)
			else
				childrenNodes = $(node).contents().toArray()
				nodeQueue = nodeQueue.concat(childrenNodes)
	)

if not jQuery?
	script = document.createElement('script')
	script.type = 'text/javascript'
	script.src = "http://code.jquery.com/jquery-latest.min.js"
	document.head.appendChild(script)

if not jQuery?
	script.onload = start
else
	start()