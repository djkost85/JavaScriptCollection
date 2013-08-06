# The Ctrl key. The constant is DOM_VK_CONTROL
(->
	SCRIPT_NAME = 'LinkOpener'
	GUID = '294A1387-0EF8-4084-9881-26FF1E6D93EA'

	if window[GUID]
		console.log SCRIPT_NAME + ' has been launched.'
		return

	window[GUID] = SCRIPT_NAME
	console.log SCRIPT_NAME + ' is launched'

	SELECTED_BORDER_STYLE = '2px dashed orange'
	CTRL_KEYCODE = 17
	elementsToOpen = []

	mark = (e) ->
		if e.marked
			return
		e.marked = true
		e.styleBorderOld = e.style.border
		e.style.border = SELECTED_BORDER_STYLE
	unmark = (e) ->
		unless e.marked
			return
		delete e.marked
		e.style.border = e.styleBorderOld
		delete e.styleBorderOld
	onKeyUp = (e) ->
		if e.keyCode is CTRL_KEYCODE
			elementsToOpen.forEach (element) ->
				unmark element
			elementsToOpen.length = 0
			console.log 'unmark all'
			console.log elementsToOpen
	onMouseMove = (e) ->
		unless e.ctrlKey
			return

		element = e.currentTarget
		if element.tagName is 'A'
			unless element.marked
				mark element
				elementsToOpen.push element

				rightClickEvent = document.createEvent('MouseEvents')
				rightClickEvent.initMouseEvent 'click', true, true, window, 0, 0, 0, 0, 0, true, false, false, false, 0, null
				element.dispatchEvent rightClickEvent

				console.log elementsToOpen

	window.addEventListener 'keyup', onKeyUp

	anchorNodeList = document.querySelectorAll('a')
	for anchorNode in anchorNodeList
		anchorNode.addEventListener 'mousemove', onMouseMove

	return
).call @